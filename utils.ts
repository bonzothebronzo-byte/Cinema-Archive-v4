import { Person } from './types';

// Replace with your legitimate TMDb API Key
// If left as an empty string, the app will automatically fall back to Wikipedia
const TMDB_API_KEY = '7a916822d6cc9e3fc64d0682521235dc'; 

const IMAGE_CACHE: Record<string, string> = {};
const BASIC_CACHE: Record<string, { poster: string | null; rating: number | null }> = {};

export const openExternalVideoSearch = (title: string, year: number) => {
  const query = encodeURIComponent(`${title} ${year} full movie`);
  // tbs=dur:l filters for long videos (>20min)
  window.open(`https://www.google.com/search?q=${query}&tbm=vid&tbs=dur:l`, '_blank');
};

export interface MovieMetadata {
  plot: string;
  runtime: number;
  rating: number;
  genres: string[];
  directors: Person[];
  cast: Person[];
  backdrop?: string;
  poster?: string;
}

// Mapping to ensure TMDb genres display as our app's defined Genres where possible
const TMDB_TO_LOCAL_GENRE: Record<string, string> = {
  "Science Fiction": "Sci-Fi",
  "Action": "Action",
  "Adventure": "Action", // Merging Adventure into Action for this simple taxonomy
  "Crime": "Mystery", // Crime films often fit our Mystery/Noir bucket
  "Drama": "Drama",
  "Thriller": "Mystery", // Map Thriller to Mystery since we removed Thriller category
  "Horror": "Horror",
  "Romance": "Romance",
  "Western": "Western",
  "Comedy": "Comedy",
  "War": "War",
  "Documentary": "Documentary",
  "Mystery": "Mystery",
  "Family": "Comedy",
  "Fantasy": "Sci-Fi", // Rough mapping for this era of B-movies
  "History": "Drama",
  "Music": "Drama",
  "TV Movie": "Drama"
};

/**
 * Fetches full metadata for a movie from TMDb.
 */
export async function getMovieMetadata(title: string, year: number): Promise<MovieMetadata | null> {
  if (!TMDB_API_KEY) return null;

  try {
    // 1. Search for ID
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    if (!searchData.results || searchData.results.length === 0) return null;
    
    const tmdbId = searchData.results[0].id;

    // 2. Get Details with Credits
    const detailsUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
    const detailsRes = await fetch(detailsUrl);
    const details = await detailsRes.json();

    // Helper to map TMDb person to our Person interface
    const mapPerson = (p: any, role: 'Actor' | 'Director'): Person => ({
      id: `tmdb-${p.id}`, // specific prefix to identify dynamic people
      name: p.name,
      role,
      image: p.profile_path ? `https://image.tmdb.org/t/p/w200${p.profile_path}` : '',
      fameScore: Math.round(p.popularity || 0)
    });

    const directors = details.credits.crew
      .filter((c: any) => c.job === 'Director')
      .slice(0, 2)
      .map((d: any) => mapPerson(d, 'Director'));

    const cast = details.credits.cast
      .slice(0, 10)
      .map((c: any) => mapPerson(c, 'Actor'));

    return {
      plot: details.overview,
      runtime: details.runtime || 0,
      rating: details.vote_average || 0,
      // Map the genre names to our local system if possible
      genres: details.genres.map((g: any) => TMDB_TO_LOCAL_GENRE[g.name] || g.name),
      directors,
      cast,
      backdrop: details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : undefined,
      poster: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : undefined
    };

  } catch (e) {
    console.warn('Metadata fetch failed', e);
    return null;
  }
}

/**
 * Fetches person details by TMDb ID (used when clicking on a real actor not in our mock DB)
 */
export async function getPersonMetadata(id: string): Promise<Person | null> {
  if (!id.startsWith('tmdb-')) return null;
  if (!TMDB_API_KEY) return null;

  const tmdbId = id.replace('tmdb-', '');
  try {
    const url = `https://api.themoviedb.org/3/person/${tmdbId}?api_key=${TMDB_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    return {
      id: id,
      name: data.name,
      role: data.known_for_department === 'Directing' ? 'Director' : 'Actor',
      image: data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : '',
      fameScore: data.popularity
    };
  } catch(e) {
    console.warn('Person metadata fetch failed', e);
    return null;
  }
}

/**
 * Fetches all movie titles a person has been credited in.
 * Returns a Set of normalized titles for easy matching.
 */
export async function getPersonCredits(id: string): Promise<Set<string>> {
  if (!id.startsWith('tmdb-')) return new Set();
  if (!TMDB_API_KEY) return new Set();

  const tmdbId = id.replace('tmdb-', '');
  try {
    const url = `https://api.themoviedb.org/3/person/${tmdbId}/movie_credits?api_key=${TMDB_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return new Set();
    const data = await res.json();
    
    const titles = new Set<string>();
    
    // Combine cast and crew (directing)
    const cast = data.cast || [];
    const crew = data.crew || [];

    cast.forEach((c: any) => titles.add(normalizeTitle(c.title)));
    crew.forEach((c: any) => {
        if (c.job === 'Director') titles.add(normalizeTitle(c.title));
    });
    
    return titles;
  } catch(e) {
    console.warn('Person credits fetch failed', e);
    return new Set();
  }
}

// Helper to normalize titles for loose matching (case insensitive, remove punctuation)
export const normalizeTitle = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Fetches basic data (poster and rating) for a movie card.
 */
export async function getMovieBasicData(title: string, year: number, id: string): Promise<{ poster: string | null; rating: number | null }> {
  if (BASIC_CACHE[id]) return BASIC_CACHE[id];

  let poster: string | null = null;
  let rating: number | null = null;

  // 1. Try TMDb
  if (TMDB_API_KEY) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
           const result = data.results[0];
           if (result.poster_path) {
             poster = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
           }
           rating = result.vote_average;
        }
      }
    } catch (e) {
      console.warn('TMDb basic fetch failed', e);
    }
  }

  // 2. Fallback for Poster
  if (!poster) {
     poster = await getWikipediaMovieImage(title, year, `wiki_${id}`);
  }

  const result = { poster, rating };
  BASIC_CACHE[id] = result;
  
  // Populate legacy cache to be safe
  if (poster) IMAGE_CACHE[`movie_${id}`] = poster;

  return result;
}

/**
 * Fetches an image URL for a movie, prioritizing TMDb and falling back to Wikipedia.
 */
export async function getMovieImage(title: string, year: number, id: string): Promise<string | null> {
  const data = await getMovieBasicData(title, year, id);
  return data.poster;
}

/**
 * Fetches an image URL for a person, prioritizing TMDb and falling back to Wikipedia.
 */
export async function getPersonImage(name: string, role: string, id: string): Promise<string | null> {
  const cacheKey = `person_${id}`;
  if (IMAGE_CACHE[cacheKey]) return IMAGE_CACHE[cacheKey];

  // 1. Try TMDb
  if (TMDB_API_KEY) {
    try {
      const url = `https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(name)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // Filter for known_for_department if strictly needed, but name usually suffices for top result
        if (data.results && data.results.length > 0 && data.results[0].profile_path) {
          const imageUrl = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;
          IMAGE_CACHE[cacheKey] = imageUrl;
          return imageUrl;
        }
      }
    } catch (e) {
      console.warn('TMDb fetch failed', e);
    }
  }

  // 2. Fallback to Wikipedia
  return getWikipediaPersonImage(name, role, cacheKey);
}

// --- Internal Wikipedia Fallbacks ---

async function getWikipediaMovieImage(title: string, year: number, cacheKey: string): Promise<string | null> {
  const query = `${title} ${year} film`;
  return fetchWikipedia(query, cacheKey);
}

async function getWikipediaPersonImage(name: string, role: string, cacheKey: string): Promise<string | null> {
  const query = `${name} ${role.toLowerCase()}`;
  return fetchWikipedia(query, cacheKey);
}

async function fetchWikipedia(query: string, cacheKey: string): Promise<string | null> {
  try {
    const endpoint = 'https://en.wikipedia.org/w/api.php';
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      origin: '*',
      generator: 'search',
      gsrnamespace: '0',
      gsrlimit: '1',
      gsrsearch: query,
      prop: 'pageimages',
      pithumbsize: '600'
    });

    const response = await fetch(`${endpoint}?${params.toString()}`);
    const data = await response.json();
    
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0) {
        const page = pages[0] as any;
        if (page.thumbnail && page.thumbnail.source) {
          const url = page.thumbnail.source;
          IMAGE_CACHE[cacheKey] = url;
          return url;
        }
      }
    }
  } catch (error) {
    console.warn(`Wikipedia fetch failed for: ${query}`, error);
  }
  return null;
}