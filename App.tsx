import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { MOVIES, PEOPLE, getAllGenres } from './data';
import { ViewState, FilterState, Movie, Person, Genre } from './types';
import { MovieCard } from './components/MovieCard';
import { PersonCard } from './components/PersonCard';
import { FilterPanel } from './components/FilterPanel';
import { MovieDetails } from './components/MovieDetails';
import { PersonDetails } from './components/PersonDetails';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const UserGroupIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const DEFAULT_FILTERS: FilterState = {
  genres: [],
  decades: [],
  type: 'all',
  color: 'all',
  sortBy: 'rating',
  searchQuery: ''
};

export default function App() {
  const [view, setView] = useState<ViewState>({ name: 'home' });
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [peopleSearchMode, setPeopleSearchMode] = useState(false);
  const [realRatings, setRealRatings] = useState<Record<string, number>>({});

  // Reset filters when switching to people mode
  useEffect(() => {
    if (peopleSearchMode) {
      setFilters(prev => ({ ...prev, searchQuery: '' })); // clear text search context for movies
    }
  }, [peopleSearchMode]);

  // Callback to capture real ratings from MovieCard fetches
  const handleRatingLoad = useCallback((id: string, rating: number) => {
    setRealRatings(prev => {
        if (prev[id] === rating) return prev;
        return { ...prev, [id]: rating };
    });
  }, []);

  // Filtering Logic
  const filteredMovies = useMemo(() => {
    let result = MOVIES;

    // Search Query (Title)
    if (filters.searchQuery && !peopleSearchMode) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(q));
    }

    // Genre
    if (filters.genres.length > 0) {
      result = result.filter(m => filters.genres.every(g => m.genres.includes(g)));
    }

    // Decade
    if (filters.decades.length > 0) {
      result = result.filter(m => {
        const decade = Math.floor(m.year / 10) * 10;
        return filters.decades.includes(decade);
      });
    }

    // Talkie/Silent
    if (filters.type === 'talkie') result = result.filter(m => m.isTalkie);
    if (filters.type === 'silent') result = result.filter(m => !m.isTalkie);

    // Color/BW
    if (filters.color === 'color') result = result.filter(m => m.isColor);
    if (filters.color === 'bw') result = result.filter(m => !m.isColor);

    // Sort
    // We utilize [...result] to create a shallow copy before sorting to avoid mutating the original MOVIES array
    return [...result].sort((a, b) => {
      // Use real rating if available, otherwise fallback to static rating
      const ratingA = realRatings[a.id] ?? a.rating;
      const ratingB = realRatings[b.id] ?? b.rating;

      switch (filters.sortBy) {
        case 'rating': return ratingB - ratingA;
        case 'year_desc': return b.year - a.year;
        case 'year_asc': return a.year - b.year;
        default: return 0;
      }
    });
  }, [filters, peopleSearchMode, realRatings]);

  const filteredPeople = useMemo(() => {
    if (!peopleSearchMode) return [];
    let result = PEOPLE;
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    return result.sort((a, b) => b.fameScore - a.fameScore);
  }, [filters.searchQuery, peopleSearchMode]);

  // Handlers
  const handleMovieClick = (id: string) => {
    setView({ name: 'movie', movieId: id });
    window.scrollTo(0,0);
  };

  const handlePersonClick = (id: string) => {
    setView({ name: 'person', personId: id });
    setPeopleSearchMode(false); // Exit search mode if entering details
    window.scrollTo(0,0);
  };

  const handleGenreClick = (genreName: string) => {
    // Attempt to match with Enum
    const genreEnum = Object.values(Genre).find(g => g.toLowerCase() === genreName.toLowerCase());
    
    let targetGenre = genreEnum;
    // Simple mapping for common TMDb differences vs our Enums if needed
    if (!targetGenre) {
        if (genreName === 'Science Fiction') targetGenre = Genre.SciFi;
        // Add other mappings as they are discovered
    }

    if (targetGenre) {
        setFilters({ ...DEFAULT_FILTERS, genres: [targetGenre] });
    } else {
        // Fallback to text search if strictly not a known genre category
        setFilters({ ...DEFAULT_FILTERS, searchQuery: genreName });
    }
    setView({ name: 'browse' });
    window.scrollTo(0, 0);
  };

  // --- Views ---

  const renderHome = () => {
    const genresToSample = [Genre.Noir, Genre.SciFi, Genre.Horror, Genre.Comedy, Genre.Western, Genre.Documentary];

    return (
      <div className="flex flex-col gap-12 pb-20 pt-24">
        {/* Rows */}
        {genresToSample.map(genre => {
          // Slice up to 6 items to match the max grid columns (XL)
          const moviesInGenre = MOVIES.filter(m => m.genres.includes(genre)).slice(0, 6);
          if (moviesInGenre.length === 0) return null;

          return (
            <div key={genre} className="px-6 md:px-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{genre}</h2>
                <button 
                  onClick={() => {
                    setFilters({ ...DEFAULT_FILTERS, genres: [genre] });
                    setView({ name: 'browse' });
                  }}
                  className="text-sm font-semibold uppercase tracking-wider text-cine-accent hover:text-white transition-colors"
                >
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {moviesInGenre.map((m, idx) => {
                  // Logic to hide items that don't fit in the current breakpoint row
                  let visibilityClass = "block"; 
                  if (idx === 2) visibilityClass = "hidden sm:block";
                  if (idx === 3) visibilityClass = "hidden md:block";
                  if (idx === 4) visibilityClass = "hidden lg:block";
                  if (idx === 5) visibilityClass = "hidden xl:block";

                  return (
                    <div key={m.id} className={visibilityClass}>
                      <MovieCard 
                        movie={m} 
                        onClick={handleMovieClick} 
                        onDataLoaded={handleRatingLoad}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderBrowse = () => (
    <div className="flex flex-col md:flex-row min-h-screen pt-24 px-6 md:px-12 gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-28">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
      </aside>

      {/* Grid */}
      <main className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {peopleSearchMode ? 'People Directory' : `Library (${filteredMovies.length})`}
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPeopleSearchMode(!peopleSearchMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${peopleSearchMode ? 'bg-cine-accent text-black border-cine-accent' : 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'}`}
            >
              <UserGroupIcon />
              <span>{peopleSearchMode ? 'Browsing People' : 'Search People'}</span>
            </button>
          </div>
        </div>

        {peopleSearchMode ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filteredPeople.map(p => (
              <PersonCard key={p.id} person={p} onClick={handlePersonClick} variant="card" />
            ))}
            {filteredPeople.length === 0 && <p className="text-gray-500 col-span-full">No people found.</p>}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
            {filteredMovies.map(m => (
              <MovieCard 
                key={m.id} 
                movie={m} 
                onClick={handleMovieClick}
                onDataLoaded={handleRatingLoad} 
              />
            ))}
            {filteredMovies.length === 0 && <p className="text-gray-500 col-span-full text-lg">No movies match your filters.</p>}
          </div>
        )}
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-cine-900 text-gray-100 font-sans selection:bg-cine-accent selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cine-900/95 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-6 md:px-12 shadow-2xl">
        <div className="flex items-center gap-8">
          <button onClick={() => setView({ name: 'home' })} className="text-2xl font-black tracking-tighter text-white group">
            CINEMA<span className="text-cine-accent group-hover:text-white transition-colors">ARCHIVE</span>
          </button>
          <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-400">
             <button onClick={() => setView({ name: 'home' })} className={`transition-colors hover:text-white ${view.name === 'home' ? 'text-white' : ''}`}>Home</button>
             <button onClick={() => { setView({ name: 'browse' }); setPeopleSearchMode(false); }} className={`transition-colors hover:text-white ${view.name === 'browse' && !peopleSearchMode ? 'text-white' : ''}`}>Movies</button>
             <button onClick={() => { setView({ name: 'browse' }); setPeopleSearchMode(true); }} className={`transition-colors hover:text-white ${peopleSearchMode ? 'text-white' : ''}`}>People</button>
          </div>
        </div>

        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search titles..." 
            value={filters.searchQuery}
            onChange={(e) => {
              setFilters(p => ({ ...p, searchQuery: e.target.value }));
              if (view.name !== 'browse') setView({ name: 'browse' });
            }}
            className="bg-cine-800 text-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cine-accent/50 w-40 md:w-64 transition-all group-hover:bg-cine-700"
          />
          <div className="absolute left-3 top-2 text-gray-500 group-hover:text-gray-300">
            <SearchIcon />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mt-0">
        {view.name === 'home' && renderHome()}
        {view.name === 'browse' && renderBrowse()}
        {view.name === 'movie' && (
          <MovieDetails 
            movieId={view.movieId} 
            onBack={() => setView({ name: 'browse' })} 
            onPersonClick={handlePersonClick}
            onGenreClick={handleGenreClick}
          />
        )}
        {view.name === 'person' && (
          <PersonDetails 
            personId={view.personId} 
            onBack={() => setView({ name: 'browse' })} 
            onMovieClick={handleMovieClick}
          />
        )}
      </div>
    </div>
  );
}