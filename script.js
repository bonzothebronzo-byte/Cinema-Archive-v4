/**
 * Cinema Archive - Vanilla JS Implementation
 * Combines logic from data.ts, types.ts, utils.ts, and React components.
 */

// --- CONSTANTS & CONFIG ---

const TMDB_API_KEY = '7a916822d6cc9e3fc64d0682521235dc';

const Genre = {
  Noir: "Film Noir",
  SciFi: "Sci-Fi",
  Horror: "Horror",
  Comedy: "Comedy",
  Western: "Western",
  Drama: "Drama",
  Action: "Action",
  Romance: "Romance",
  Mystery: "Mystery",
  Documentary: "Documentary",
  War: "War"
};

const TMDB_TO_LOCAL_GENRE = {
  "Science Fiction": "Sci-Fi",
  "Action": "Action",
  "Adventure": "Action",
  "Crime": "Mystery",
  "Drama": "Drama",
  "Thriller": "Mystery",
  "Horror": "Horror",
  "Romance": "Romance",
  "Western": "Western",
  "Comedy": "Comedy",
  "War": "War",
  "Documentary": "Documentary",
  "Mystery": "Mystery",
  "Family": "Comedy",
  "Fantasy": "Sci-Fi",
  "History": "Drama",
  "Music": "Drama",
  "TV Movie": "Drama"
};

// --- DATA ---

const rawMovieList = `
A Bucket of Blood (1959)
A Farewell to Arms (1932)
A Star Is Born (1937)
Abraham Lincoln (1930)
Adventures of Captain Marvel (1941)
Africa Screams (1949)
Algiers (1938)
All Quiet on the Western Front (1930)
And Then There Were None (1945)
Angel and the Badman (1947)
Angel on My Shoulder (1946)
Animal Crackers (1930)
Anna Christie (1930)
Another Fine Mess (1930)
At War with the Army (1950)
Atom Age Vampire (1960)
Atoll K (1951)
Attack of the Giant Leeches (1959)
Beat the Devil (1953)
Beau Hunks (1931)
Becky Sharp (1935)
Blackmail (1929)
The Black Pirate (1926)
Black Raven (1943)
The Black Watch (1929)
Blonde Crazy (1931)
Blood on the Sun (1945)
Bloody Pit of Horror (1965)
Blue Steel (1934)
Bluebeard (1944)
Born Reckless (1930)
Bowery at Midnight (1942)
Brats (1930)
Bride of the Monster (1955)
Candy (1968)
Captain Kidd (1945)
Carnival of Souls (1962)
Carnival Story (1954)
Charade (1963)
Charlie Chan's Secret (1936)
Cimarron (1931)
The Chase (1946)
City Lights (1931)
City Streets (1931)
The Corpse Vanishes (1942)
Creature from the Haunted Sea (1961)
Cyrano de Bergerac (1950)
Dance, Fools, Dance (1931)
Daughter of the Dragon (1931)
Death Rides a Horse (1967)
Dementia 13 (1963)
Detour (1945)
The Divorcee (1930)
Doomed to Die (1940)
Doomsday Machine (1972)
Dr. Jekyll and Mr. Hyde (1931)
Dracula (1931)
Dragon Princess (1976)
Dressed to Kill (1946)
Father's Little Dividend (1951)
Fear and Desire (1953)
First Spaceship on Venus (1960)
The Fighting Lady (1944)
Free and Easy (1930)
Go for Broke! (1951)
Gulliver's Travels (1939)
Happy Go Lovely (1951)
He Walked By Night (1948)
Hell's Angels (1930)
Hi De Ho (1947)
His Girl Friday (1940)
Hog Wild (1930)
Hoppity Goes To Town (1941)
Horror Express (1972)
Horrors of Spider Island (1960)
The Hound of the Baskervilles (1939)
House on Haunted Hill (1959)
The Hurricane Express (1932)
I Cover the Waterfront (1933)
Indestructible Man (1956)
Invisible Ghost (1941)
Jesse James Meets Frankenstein's Daughter (1966)
Jungle Book (1942)
Kansas City Confidential (1952)
Kept Husbands (1931)
King of Jazz (1930)
King of the Zombies (1941)
Ladies' Man (1931)
Lady Frankenstein (1971)
The Lady Refuses (1931)
The Lady Vanishes (1938)
The Last Man on Earth (1964)
The Last Time I Saw Paris (1954)
Last Woman On Earth (1960)
Let There Be Light (1946)
Little Caesar (1931)
Little Lord Fauntleroy (1936)
The Little Princess (1939)
The Little Shop of Horrors (1960)
Louisiana Story (1948)
Love Affair (1939)
The Lucky Texan (1934)
M (1931)
Mad Monkey Kung Fu (1979)
Madam Satan (1930)
Malice in the Palace (1949)
Man of the World (1931)
Manos: The Hands of Fate (1966)
Mata Hari (1931)
Meet John Doe (1941)
The Memphis Belle: A Story of a Flying Fortress (1944)
Millie (1931)
Monkey Business (1931)
Morocco (1930)
The Most Dangerous Game (1932)
Murder at the Baskervilles (1937)
Murder! (1930)
The Mysterious Dr. Fu Manchu (1929)
'Neath the Arizona Skys (1934)
Night Nurse (1931)
Night Owls (1930)
Of Human Bondage (1934)
One Good Turn (1931)
The Outlaw (1943)
The Painted Desert (1931)
Pardon Us (1931)
The Phantom Planet (1961)
Plan 9 From Outer Space (1959)
Possessed (1931)
Pot o' Gold (1941)
Prelude to War (1942)
Prisoners of the Lost Universe (1983)
The Public Enemy (1931)
Rain (1932)
The Red House (1947)
Reign of Terror (1949)
The Return of Dr. Fu Manchu (1930)
Road to Bali (1953)
The Road to Singapore (1931)
Robin Hood (1922)
Rock, Rock, Rock! (1956)
Roman Holiday (1953)
The Sadist (1963)
Santa Claus Conquers the Martians (1964)
Santa Fe Trail (1940)
Scarlet Street (1945)
Scrooge (1935)
Second Chorus (1940)
Sherlock Holmes and the Secret Weapon (1942)
Silent Night, Bloody Night (1972)
The Sleeping Cardinal (1931)
The Snows of Kilimanjaro (1952)
Soup to Nuts (1930)
The Southerner (1945)
The Star Packer (1934)
The Stranger (1946)
Suddenly (1954)
Susan Lenox (Her Fall and Rise) (1931)
The 39 Steps (1935)
The Amazing Adventure (1936)
The Amazing Mr. X (1948)
The Ape (1940)
The Ape Man (1943)
The Battle of Midway (1942)
The Bigamist (1953)
The Big Combo (1955)
The Big Trail (1930)
The Bishop Murder Case (1929)
The Blue Angel (1930)
The Brain That Wouldn't Die (1962)
The Cheat (1931)
The City of the Dead (1960)
The Day the Earth Stood Still (1951)
The Deadly Companions (1961)
The Devil Bat (1940)
The Eagle Has Landed (1976)
The Fatal Hour (1940)
The Ghost Train (1941)
The Giant Gila Monster (1959)
The Gorilla (1939)
The Great Flamarion (1945)
The Great Rupert (1950)
The Hitch-Hiker (1953)
The Inspector General (1949)
The Killer Shrews (1959)
The Terror (1963)
The Thief of Bagdad (1924)
The Trap (1946)
The Wasp Woman (1959)
The Woman in Green (1945)
Till the Clouds Roll By (1946)
Topper Returns (1941)
Triumph of the Will (1935)
Tunisian Victory (1944)
Under Western Stars (1938)
Up the River (1930)
Vengeance Valley (1951)
Voyage to the Prehistoric Planet (1965)
White Zombie (1932)
Whoopee! (1930) 
Why We Fight: Divide and Conquer (1944)
Why We Fight: The Battle of China (1944)
Why We Fight: The Nazis Strike (1943)
Why We Fight: War Comes to America (1945)
Zeitgeist: Final Edition (2007)
Abilene Town (1946)
The Adventures of Smilin' Jack (1943)
The Amazing Transparent Man (1960)
Assignment Outer Space (1960)
Bad Man of Deadwood (1941)
The Beachcomber (1938)
Behave Yourself (1951)
Bela Lugosi Meets A Brooklyn Gorilla (1952)
Black Dragons (1942)
Bride of the Gorilla (1951)
Brideless Groom (1947)
Burn 'Em Up Barnes (1934)
Chained For Life (1952)
Corregidor (1943)
Crash of the Moons (1954)
Daniel Boone (1936)
Dead Men Walk (1943)
Eegah (1962)
Eternally Yours (1939)
The Fast and the Furious (1955)
Fear in the Night (1947)
Go Down, Death! (1944)
The Great Alaskan Mystery (1944)
Hercules (1958)
Hercules and the Tyrants of Babylon (1964)
Hercules Unchained (1959)
Hercules Against the Moon Men (1964)
Jail Bait (1954)
The Lost City (1935)
The Lost Jungle (1934)
Manfish (1956)
The Middleton Family at the New York World’s Fair (1939)
Mr. Robinson Crusoe (1932)
The New Adventures of Tarzan (1935)
Nightmare Castle (1965)
One Body Too Many (1944)
Our Gang Follies of 1938 (1937)
Unknown World (1951)
Nosferatu (1922)
The Cabinet of Dr. Caligari (1920)
The Phantom of the Opera (1925)
The Hunchback of Notre Dame (1923)
Dr. Jekyll and Mr. Hyde (1920)
The Golem: How He Came into the World (1920)
Faust (1926)
The General (1926)
Sherlock Jr. (1924)
Steamboat Bill, Jr. (1928)
The Gold Rush (1925)
The Kid (1921)
Safety Last! (1923)
Metropolis (1927)
The Lost World (1925)
A Trip to the Moon (1902)
Sunrise: A Song of Two Humans (1927)
The Passion of Joan of Arc (1928)
Battleship Potemkin (1925)
Intolerance (1916)
The Birth of a Nation (1915)
Broken Blossoms (1919)
The Last Laugh (1924)
Greed (1924)
The Lodger: A Story of the London Fog (1927)
The Ring (1927)
Man with a Movie Camera (1929)
`;

const mockPeople = [
  { id: 'tmdb-3101', name: 'Bela Lugosi', role: 'Actor', fameScore: 95, image: 'https://picsum.photos/seed/bela/200/200' },
  { id: 'tmdb-3326', name: 'Boris Karloff', role: 'Actor', fameScore: 92, image: 'https://picsum.photos/seed/boris/200/200' },
  { id: 'tmdb-399', name: 'Cary Grant', role: 'Actor', fameScore: 98, image: 'https://picsum.photos/seed/cary/200/200' },
  { id: 'tmdb-1771', name: 'Humphrey Bogart', role: 'Actor', fameScore: 99, image: 'https://picsum.photos/seed/bogey/200/200' },
  { id: 'tmdb-2636', name: 'Alfred Hitchcock', role: 'Director', fameScore: 100, image: 'https://picsum.photos/seed/hitch/200/200' },
  { id: 'tmdb-55', name: 'Fritz Lang', role: 'Director', fameScore: 90, image: 'https://picsum.photos/seed/fritz/200/200' },
  { id: 'tmdb-6691', name: 'John Wayne', role: 'Actor', fameScore: 94, image: 'https://picsum.photos/seed/duke/200/200' },
  { id: 'tmdb-3044', name: 'Vincent Price', role: 'Actor', fameScore: 88, image: 'https://picsum.photos/seed/vincent/200/200' },
  { id: 'tmdb-40', name: 'Orson Welles', role: 'Director', fameScore: 97, image: 'https://picsum.photos/seed/orson/200/200' },
  { id: 'tmdb-4227', name: 'Audrey Hepburn', role: 'Actor', fameScore: 96, image: 'https://picsum.photos/seed/audrey/200/200' },
  { id: 'tmdb-1546', name: 'Barbara Stanwyck', role: 'Actor', fameScore: 85, image: 'https://picsum.photos/seed/barbara/200/200' },
  { id: 'tmdb-16851', name: 'Roger Corman', role: 'Director', fameScore: 80, image: 'https://picsum.photos/seed/roger/200/200' },
  { id: 'tmdb-29775', name: 'Ed Wood', role: 'Director', fameScore: 75, image: 'https://picsum.photos/seed/edwood/200/200' },
  { id: 'tmdb-16601', name: 'George A. Romero', role: 'Director', fameScore: 89, image: 'https://picsum.photos/seed/romero/200/200' },
  { id: 'tmdb-1898', name: 'Buster Keaton', role: 'Actor', fameScore: 93, image: 'https://picsum.photos/seed/buster/200/200' },
];

const plotTemplates = [
  "A tale of love and betrayal set against the backdrop of a changing world.",
  "In a future where humanity struggles to survive, one hero emerges.",
  "A classic mystery where nothing is as it seems and everyone is a suspect.",
  "An action-packed adventure across dangerous territories.",
  "A chilling horror story that will keep you on the edge of your seat.",
  "A hilarious comedy of errors involving mistaken identities.",
  "A gritty western about justice, revenge, and the law of the gun.",
  "A documentary exposing the hidden truths of our society.",
  "An eerie sci-fi journey into the unknown depths of space.",
  "A gripping courtroom drama that challenges the very nature of truth."
];

// --- HELPERS ---

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const normalizeTitle = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

const getGenres = (title, year) => {
  const t = title.toLowerCase();
  const genres = new Set();
  
  if (t === 'a star is born') { genres.add(Genre.Drama); genres.add(Genre.Romance); return Array.from(genres); }
  if (t === 'chained for life') { genres.add(Genre.Drama); return Array.from(genres); }
  if (t === 'the general' && year === 1926) { genres.add(Genre.Comedy); genres.add(Genre.War); genres.add(Genre.Action); return Array.from(genres); }
  if (t.includes('hercules')) { genres.add(Genre.Action); genres.add(Genre.SciFi); }
  
  if (t.includes('metropolis')) { genres.add(Genre.SciFi); genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('trip to the moon')) { genres.add(Genre.SciFi); genres.add(Genre.Action); return Array.from(genres); }
  if (t.includes('man with a movie camera')) { genres.add(Genre.Documentary); return Array.from(genres); }
  if (t.includes('passion of joan of arc')) { genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('battleship potemkin')) { genres.add(Genre.War); genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('sunrise')) { genres.add(Genre.Romance); genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('lodger')) { genres.add(Genre.Mystery); return Array.from(genres); }
  if (t.includes('last laugh')) { genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('birth of a nation')) { genres.add(Genre.War); genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('intolerance')) { genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('lost world')) { genres.add(Genre.Action); genres.add(Genre.SciFi); return Array.from(genres); }
  if (t.includes('broken blossoms')) { genres.add(Genre.Drama); genres.add(Genre.Romance); return Array.from(genres); }
  if (t.includes('greed')) { genres.add(Genre.Drama); return Array.from(genres); }
  if (t.includes('the ring')) { genres.add(Genre.Drama); genres.add(Genre.Romance); return Array.from(genres); }

  if (t.match(/\b(vampire|blood|horror|dead|ghost|monster|zombie|beast|creature|brain|haunted|terror|fear|nightmare|dracula|frankenstein|mummy|werewolf|screaming|shriek|wicked|witch|curse|demon|devil|hell|spider|leeches|gila|shrews|wasp|ant|mantis|bats|phantom|fiend|macabre|grave|nosferatu|caligari|golem|faust|hunchback|jekyll|hyde)\b/)) genres.add(Genre.Horror);
  if (t.match(/\b(planet|space|mars|moon|atom|2000|future|alien|invader|saucer|rocket|venus|earth|asteroid|cyborg|robot|invisible|prehistoric|flight|moons|unknown world|gamma|x|blob|thing|astounding|galaxy|cosmos|lost world)\b/)) genres.add(Genre.SciFi);
  if (t.match(/\b(western|rider|gun|trail|texas|rio|arizona|canyon|stagecoach|sheriff|outlaw|apache|comanche|horse|saddle|frontier|ranger|cowboy|plains|valley|town|abilene|deadwood|kansan|nebraskan|sundown|dakota|laramie|pony|express)\b/)) genres.add(Genre.Western);
  if (t.match(/\b(laugh|fools|mess|circus|comedy|funny|stooges|abbott|costello|laurel|hardy|buster|chaplin|keaton|marx|duck|nut|goofy|chump|bride|groom|kid|rascals|gang|boys|love|happy|lucky|heaven|girl|baby|gold rush|safety last|steamboat|sherlock jr)\b/)) genres.add(Genre.Comedy);
  if (t.match(/\b(detective|murder|mystery|sherlock|holmes|case|clue|suspect|crime|confidential|blackmail|stranger|shadow|falcon|saint|whodunit|guilty|alibi|witness|vanishes|corpse|manhunt|trap|fear|scared|terror|shanghai|dick tracy|private eye|spy|agent)\b/)) genres.add(Genre.Mystery);
  if (t.match(/\b(war|battle|battleship|soldier|army|navy|marine|combat|attack|fight|victory|glory|hero|tank|submarine|air|force|platoon|command|front|enemy|steel|valor|retreat|pacific|normandy|lieutenant|sergeant|general|colonel)\b/)) genres.add(Genre.War);
  if (t.match(/\b(love|affair|heart|kiss|romance|wedding|bride|husband|wife|darling|sweetheart|passion|desire)\b/)) genres.add(Genre.Romance);
  if (t.match(/\b(doc|truth|fight|news|chronicle|story of|victory|battle of|divide|conquer|nazis|war comes|midway|thunderbolt|memphis belle|report)\b/) || year > 2000) genres.add(Genre.Documentary);
  if (t.match(/\b(adventure|tarzan|jungle|thief|pirate|robin hood|bagdad|zorro|musketeer|captain|buccaneer|sword|crusade|avenger|lost world)\b/)) genres.add(Genre.Action);

  if (year >= 1940 && year <= 1959 && !genres.has(Genre.Western) && !genres.has(Genre.SciFi) && !genres.has(Genre.Comedy) && !genres.has(Genre.War) && !genres.has(Genre.Documentary)) {
     if (genres.has(Genre.Mystery) || t.match(/\b(big|night|city|street|dark|lady|man|woman|stranger|killer|death|murder|fatal|trapped|fear|red|scarlet|black|detour|hitch-hiker|doa|impact|quicksand|postman|fallen|angel|corrupt|vice|naked)\b/)) {
        genres.add(Genre.Noir);
     }
  }

  if (genres.size === 0) genres.add(Genre.Drama);
  return Array.from(genres);
};

const parseMovies = () => {
  const lines = rawMovieList.split('\n').filter(l => l.trim().length > 0);
  return lines.map((line, idx) => {
    const match = line.match(/^(.*?)\s*\((\d{4})\)$/);
    if (!match) return null;
    const title = match[1].trim();
    const year = parseInt(match[2]);
    const hash = hashCode(title);
    const isTalkie = year >= 1929;
    const isColor = year >= 1955 || (year > 1935 && hash % 3 === 0);
    const rating = (hash % 40) / 10 + 5;
    const genres = getGenres(title, year);
    return {
      id: `m-${idx}`,
      title,
      year,
      runtime: (hash % 60) + 60,
      plot: plotTemplates[hash % plotTemplates.length],
      genres,
      rating: parseFloat(rating.toFixed(1)),
      poster: `https://picsum.photos/seed/${hash}/300/450`,
      backdrop: `https://picsum.photos/seed/${hash + 1}/1280/720`,
      cast: [],
      directors: [],
      isColor,
      isTalkie
    };
  }).filter(m => m !== null);
};

const MOVIES = parseMovies();
const PEOPLE = mockPeople;

const getAllGenres = () => Object.values(Genre);
const getAllDecades = () => {
  const years = MOVIES.map(m => m.year);
  const min = Math.floor(Math.min(...years) / 10) * 10;
  const max = Math.floor(Math.max(...years) / 10) * 10;
  const decades = [];
  for (let d = min; d <= max; d += 10) decades.push(d);
  return decades;
};

// --- STATE MANAGEMENT ---

const state = {
  view: 'home', // 'home', 'browse', 'movie', 'person'
  currentId: null,
  filters: {
    genres: [],
    decades: [],
    type: 'all',
    color: 'all',
    sortBy: 'rating',
    searchQuery: ''
  },
  peopleSearchMode: false,
  realRatings: {}, // { id: rating }
  imageCache: {},
  basicCache: {}
};

// --- UTILS & API ---

const openExternalVideoSearch = (title, year) => {
  const query = encodeURIComponent(`${title} ${year} full movie`);
  window.open(`https://www.google.com/search?q=${query}&tbm=vid&tbs=dur:l`, '_blank');
};

async function fetchWikipedia(query, cacheKey) {
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
      if (pages.length > 0 && pages[0].thumbnail) {
        state.imageCache[cacheKey] = pages[0].thumbnail.source;
        return pages[0].thumbnail.source;
      }
    }
  } catch (error) {
    console.warn('Wiki fetch error:', error);
  }
  return null;
}

async function getMovieBasicData(title, year, id) {
  if (state.basicCache[id]) return state.basicCache[id];

  let poster = null;
  let rating = null;

  if (TMDB_API_KEY) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
           const result = data.results[0];
           if (result.poster_path) poster = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
           rating = result.vote_average;
        }
      }
    } catch (e) { console.warn(e); }
  }

  if (!poster) poster = await fetchWikipedia(`${title} ${year} film`, `wiki_${id}`);

  const result = { poster, rating };
  state.basicCache[id] = result;
  if (rating) state.realRatings[id] = rating;
  return result;
}

async function getMovieMetadata(title, year) {
  if (!TMDB_API_KEY) return null;
  try {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) return null;
    
    const tmdbId = searchData.results[0].id;
    const detailsUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
    const detailsRes = await fetch(detailsUrl);
    const details = await detailsRes.json();

    const mapPerson = (p, role) => ({
      id: `tmdb-${p.id}`,
      name: p.name,
      role,
      image: p.profile_path ? `https://image.tmdb.org/t/p/w200${p.profile_path}` : '',
      fameScore: Math.round(p.popularity || 0)
    });

    return {
      plot: details.overview,
      runtime: details.runtime || 0,
      rating: details.vote_average || 0,
      genres: details.genres.map(g => TMDB_TO_LOCAL_GENRE[g.name] || g.name),
      directors: details.credits.crew.filter(c => c.job === 'Director').slice(0, 2).map(d => mapPerson(d, 'Director')),
      cast: details.credits.cast.slice(0, 10).map(c => mapPerson(c, 'Actor')),
      backdrop: details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : undefined,
      poster: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : undefined
    };
  } catch (e) { return null; }
}

async function getPersonMetadata(id) {
  if (!id.startsWith('tmdb-') || !TMDB_API_KEY) return null;
  const tmdbId = id.replace('tmdb-', '');
  try {
    const res = await fetch(`https://api.themoviedb.org/3/person/${tmdbId}?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    return {
      id,
      name: data.name,
      role: data.known_for_department === 'Directing' ? 'Director' : 'Actor',
      image: data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : '',
      fameScore: data.popularity
    };
  } catch(e) { return null; }
}

async function getPersonCredits(id) {
  if (!id.startsWith('tmdb-') || !TMDB_API_KEY) return new Set();
  const tmdbId = id.replace('tmdb-', '');
  try {
    const res = await fetch(`https://api.themoviedb.org/3/person/${tmdbId}/movie_credits?api_key=${TMDB_API_KEY}`);
    const data = await res.json();
    const titles = new Set();
    (data.cast || []).forEach(c => titles.add(normalizeTitle(c.title)));
    (data.crew || []).filter(c => c.job === 'Director').forEach(c => titles.add(normalizeTitle(c.title)));
    return titles;
  } catch(e) { return new Set(); }
}

async function getPersonImage(name, role, id) {
  const key = `person_${id}`;
  if (state.imageCache[key]) return state.imageCache[key];
  if (TMDB_API_KEY) {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.results && data.results.length > 0 && data.results[0].profile_path) {
        const url = `https://image.tmdb.org/t/p/w500${data.results[0].profile_path}`;
        state.imageCache[key] = url;
        return url;
      }
    } catch(e) {}
  }
  return await fetchWikipedia(`${name} ${role.toLowerCase()}`, key);
}


// --- HTML GENERATORS ---

function Icons(type) {
  if (type === 'search') return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`;
  if (type === 'home') return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`;
  if (type === 'users') return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
  if (type === 'back') return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>`;
  if (type === 'play') return `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>`;
  if (type === 'star') return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
  return '';
}

function MovieCardHTML(movie) {
  const rating = state.realRatings[movie.id] ?? movie.rating;
  return `
    <div onclick="navigateTo('movie', '${movie.id}')" class="group relative flex flex-col cursor-pointer" data-movie-id="${movie.id}">
      <div class="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-cine-800 shadow-md transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:ring-2 group-hover:ring-cine-accent/70">
        <img src="${movie.poster}" alt="${movie.title}" id="poster-${movie.id}" class="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" loading="lazy" />
        <div class="absolute top-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-cine-accent backdrop-blur-md shadow-sm" id="rating-${movie.id}">
          ★ ${rating.toFixed(1)}
        </div>
      </div>
      <div class="mt-3 flex flex-col gap-0.5">
        <h3 class="text-sm font-semibold text-gray-200 leading-tight truncate group-hover:text-white transition-colors" title="${movie.title}">${movie.title}</h3>
        <span class="text-xs text-gray-500 font-medium">${movie.year}</span>
      </div>
    </div>
  `;
}

function PersonCardHTML(person, variant = 'circle') {
  if (variant === 'circle') {
    return `
      <div onclick="navigateTo('person', '${person.id}')" class="flex flex-col items-center gap-2 cursor-pointer group person-trigger" data-person-id="${person.id}">
        <div class="h-20 w-20 overflow-hidden rounded-full border-2 border-transparent transition-colors group-hover:border-cine-accent relative bg-cine-800">
           <img src="${person.image}" alt="${person.name}" id="pimg-${person.id}" class="h-full w-full object-cover" />
        </div>
        <div class="text-center">
          <p class="text-xs font-medium text-white group-hover:text-cine-accent">${person.name}</p>
          <p class="text-[10px] text-gray-400">${person.role}</p>
        </div>
      </div>
    `;
  }
  return `
    <div onclick="navigateTo('person', '${person.id}')" class="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-cine-800 transition hover:bg-cine-700 w-32 md:w-40" data-person-id="${person.id}">
      <div class="aspect-square w-full overflow-hidden bg-cine-900">
        <img src="${person.image}" alt="${person.name}" id="pimg-${person.id}" class="h-full w-full object-cover" />
      </div>
      <div class="p-3 text-center">
        <h3 class="text-sm font-bold text-white truncate">${person.name}</h3>
        <p className="text-xs text-cine-accent">${person.role}</p>
        <p className="text-[10px] text-gray-500 mt-1">Fame: ${person.fameScore}</p>
      </div>
    </div>
  `;
}

// --- VIEWS ---

function renderHeader() {
  const isBrowse = state.view === 'browse';
  return `
  <nav class="fixed top-0 left-0 right-0 z-50 bg-cine-900/95 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-6 md:px-12 shadow-2xl">
    <div class="flex items-center gap-8">
      <button onclick="navigateTo('home')" class="text-2xl font-black tracking-tighter text-white group">
        CINEMA<span class="text-cine-accent group-hover:text-white transition-colors">ARCHIVE</span>
      </button>
      <div class="hidden md:flex gap-6 text-sm font-semibold text-gray-400">
         <button onclick="navigateTo('home')" class="transition-colors hover:text-white ${state.view === 'home' ? 'text-white' : ''}">Home</button>
         <button onclick="setMode(false)" class="transition-colors hover:text-white ${isBrowse && !state.peopleSearchMode ? 'text-white' : ''}">Movies</button>
         <button onclick="setMode(true)" class="transition-colors hover:text-white ${state.peopleSearchMode ? 'text-white' : ''}">People</button>
      </div>
    </div>
    <div class="relative group">
      <input type="text" placeholder="Search titles..." 
        value="${state.filters.searchQuery}" 
        oninput="handleSearch(this.value)"
        class="bg-cine-800 text-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cine-accent/50 w-40 md:w-64 transition-all group-hover:bg-cine-700"
      />
      <div class="absolute left-3 top-2 text-gray-500 group-hover:text-gray-300">${Icons('search')}</div>
    </div>
  </nav>`;
}

function renderHome() {
  const genresToSample = [Genre.Noir, Genre.SciFi, Genre.Horror, Genre.Comedy, Genre.Western, Genre.Documentary];
  let html = `<div class="flex flex-col gap-12 pb-20 pt-24">`;
  
  genresToSample.forEach(genre => {
    const movies = MOVIES.filter(m => m.genres.includes(genre)).slice(0, 6);
    if (movies.length === 0) return;
    
    html += `
    <div class="px-6 md:px-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white tracking-tight">${genre}</h2>
        <button onclick="filterByGenre('${genre}')" class="text-sm font-semibold uppercase tracking-wider text-cine-accent hover:text-white transition-colors">View All</button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        ${movies.map((m, idx) => {
            let cls = "block";
            if(idx===2) cls="hidden sm:block";
            if(idx===3) cls="hidden md:block";
            if(idx===4) cls="hidden lg:block";
            if(idx===5) cls="hidden xl:block";
            return `<div class="${cls}">${MovieCardHTML(m)}</div>`;
        }).join('')}
      </div>
    </div>`;
  });
  
  html += `</div>`;
  return html;
}

function renderFilterPanel() {
  const f = state.filters;
  const genres = getAllGenres();
  const decades = getAllDecades();
  
  return `
    <div class="flex flex-col gap-6 rounded-xl bg-cine-800/50 p-4 backdrop-blur-md border border-white/5">
      <div>
        <h3 class="mb-2 text-sm font-bold uppercase text-gray-400">Sort By</h3>
        <select onchange="updateFilter('sortBy', this.value)" class="w-full rounded bg-cine-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cine-accent">
          <option value="rating" ${f.sortBy==='rating'?'selected':''}>Highest Rated</option>
          <option value="year_desc" ${f.sortBy==='year_desc'?'selected':''}>Newest First</option>
          <option value="year_asc" ${f.sortBy==='year_asc'?'selected':''}>Oldest First</option>
        </select>
      </div>
      <div>
        <h3 class="mb-2 text-sm font-bold uppercase text-gray-400">Format</h3>
        <div class="flex flex-col gap-2">
           <div class="flex rounded bg-cine-900 p-1">
             <button onclick="updateFilter('type','all')" class="flex-1 rounded py-1 text-xs ${f.type==='all'?'bg-cine-700 text-white':'text-gray-400'}">All</button>
             <button onclick="updateFilter('type','talkie')" class="flex-1 rounded py-1 text-xs ${f.type==='talkie'?'bg-cine-700 text-white':'text-gray-400'}">Talkies</button>
             <button onclick="updateFilter('type','silent')" class="flex-1 rounded py-1 text-xs ${f.type==='silent'?'bg-cine-700 text-white':'text-gray-400'}">Silent</button>
           </div>
           <div class="flex rounded bg-cine-900 p-1">
             <button onclick="updateFilter('color','all')" class="flex-1 rounded py-1 text-xs ${f.color==='all'?'bg-cine-700 text-white':'text-gray-400'}">All</button>
             <button onclick="updateFilter('color','color')" class="flex-1 rounded py-1 text-xs ${f.color==='color'?'bg-cine-700 text-white':'text-gray-400'}">Color</button>
             <button onclick="updateFilter('color','bw')" class="flex-1 rounded py-1 text-xs ${f.color==='bw'?'bg-cine-700 text-white':'text-gray-400'}">B&W</button>
           </div>
        </div>
      </div>
      <div>
        <h3 class="mb-2 text-sm font-bold uppercase text-gray-400">Genres</h3>
        <div class="flex flex-wrap gap-2">
          ${genres.map(g => `
            <button onclick="toggleGenre('${g}')" class="rounded-full px-3 py-1 text-xs transition-colors ${f.genres.includes(g) ? 'bg-cine-accent text-black font-bold' : 'bg-cine-900 text-gray-300 hover:bg-cine-700'}">
              ${g}
            </button>
          `).join('')}
        </div>
      </div>
      <div>
        <h3 class="mb-2 text-sm font-bold uppercase text-gray-400">Decades</h3>
        <div class="flex flex-wrap gap-2">
          ${decades.map(d => `
            <button onclick="toggleDecade(${d})" class="rounded px-2 py-1 text-xs font-mono transition-colors ${f.decades.includes(d) ? 'bg-blue-600 text-white' : 'bg-cine-900 text-gray-400 hover:bg-cine-700'}">
              ${d}s
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderBrowse() {
  const filtered = getFilteredMovies();
  const people = getFilteredPeople();
  const isPeople = state.peopleSearchMode;
  
  return `
    <div class="flex flex-col md:flex-row min-h-screen pt-24 px-6 md:px-12 gap-8">
      <aside class="w-full md:w-64 flex-shrink-0">
        <div class="sticky top-28">
           ${renderFilterPanel()}
        </div>
      </aside>
      <main class="flex-1">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-white tracking-tight">${isPeople ? 'People Directory' : `Library (${filtered.length})`}</h2>
          <button onclick="setMode(!state.peopleSearchMode)" class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${isPeople ? 'bg-cine-accent text-black border-cine-accent' : 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'}">
            ${Icons('users')}
            <span>${isPeople ? 'Browsing People' : 'Search People'}</span>
          </button>
        </div>
        ${isPeople ? `
           <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
             ${people.map(p => PersonCardHTML(p, 'card')).join('')}
             ${people.length === 0 ? '<p class="text-gray-500 col-span-full">No people found.</p>' : ''}
           </div>
        ` : `
           <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
             ${filtered.map(m => MovieCardHTML(m)).join('')}
             ${filtered.length === 0 ? '<p class="text-gray-500 col-span-full text-lg">No movies match your filters.</p>' : ''}
           </div>
        `}
      </main>
    </div>
  `;
}

async function renderMovieDetails() {
  const movie = MOVIES.find(m => m.id === state.currentId);
  if (!movie) return '<div>Not Found</div>';
  
  // Placeholder rendering while fetching
  const meta = await getMovieMetadata(movie.title, movie.year);
  const data = meta || {
      plot: movie.plot,
      runtime: movie.runtime,
      rating: movie.rating,
      genres: movie.genres,
      directors: movie.directors,
      cast: movie.cast,
      backdrop: movie.backdrop,
      poster: movie.poster
  };

  const ratingVal = meta ? meta.rating.toFixed(1) : movie.rating.toFixed(1);
  const displayPoster = meta && meta.poster ? meta.poster : movie.poster;

  document.getElementById('root').innerHTML = `
    ${renderHeader()}
    <div class="min-h-screen relative bg-cine-900">
        <div class="absolute top-0 left-0 w-full h-[70vh] overflow-hidden z-0">
            <img src="${data.backdrop || movie.backdrop}" class="w-full h-full object-cover opacity-20" />
            <div class="absolute inset-0 bg-gradient-to-b from-cine-900/10 via-cine-900/60 to-cine-900"></div>
        </div>
      <div class="relative z-10 pt-24 px-6 md:px-20 pb-20">
        <button onclick="navigateTo('browse')" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
           ${Icons('back')} Back to Library
        </button>
        <div class="flex flex-col md:flex-row gap-12">
          <div class="w-full md:w-1/3 max-w-[350px] flex-shrink-0 mx-auto md:mx-0">
            <div class="rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-[2/3] bg-cine-800">
              <img src="${displayPoster}" class="w-full h-full object-cover" />
            </div>
            <button onclick="openExternalVideoSearch('${movie.title.replace(/'/g, "\\'")}', ${movie.year})" class="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg shadow-red-900/20 transform hover:scale-[1.02] active:scale-[0.98]">
              ${Icons('play')} Search Video
            </button>
          </div>
          <div class="flex-1">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">${movie.title}</h1>
            <div class="flex flex-wrap items-center gap-4 text-gray-300 mb-8 text-sm md:text-base font-medium">
              <span class="text-gray-100 bg-white/10 px-2 py-0.5 rounded">${movie.year}</span>
              <span>•</span>
              <span>${data.runtime} min</span>
              <span>•</span>
              <span class="text-cine-accent font-bold flex items-center gap-1">${Icons('star')} ${ratingVal}</span>
              <span>•</span>
              <span>${movie.isColor ? 'Color' : 'B&W'}</span>
              <span>•</span>
              <span>${movie.isTalkie ? 'Sound' : 'Silent'}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-10">
              ${data.genres.map(g => `<button onclick="filterByGenre('${g}')" class="px-4 py-1.5 bg-cine-800 rounded-full text-xs font-semibold text-gray-300 border border-white/10 hover:border-cine-accent hover:text-white transition-colors cursor-pointer">${g}</button>`).join('')}
            </div>
            <h3 class="text-lg font-bold text-white mb-2 uppercase tracking-wide text-cine-accent/80">Synopsis</h3>
            <p class="text-lg text-gray-300 leading-relaxed mb-10 max-w-4xl font-light">${data.plot || "No synopsis available."}</p>
            <div class="mb-10">
              <h3 class="text-lg font-bold text-white mb-4 uppercase tracking-wide text-cine-accent/80">Directors</h3>
              <div class="flex gap-6 overflow-x-auto pb-4">
                ${data.directors.map(d => PersonCardHTML(d)).join('')}
              </div>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white mb-4 uppercase tracking-wide text-cine-accent/80">Cast</h3>
              <div class="flex flex-wrap gap-6">
                ${data.cast.map(c => PersonCardHTML(c)).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    
    // Post-render async image loads for people in credits
    data.directors.forEach(p => triggerPersonImageLoad(p));
    data.cast.forEach(p => triggerPersonImageLoad(p));
}

async function renderPersonDetails() {
  const personId = state.currentId;
  let person = PEOPLE.find(p => p.id === personId);
  let credits = new Set();

  document.getElementById('root').innerHTML = `
    ${renderHeader()}
    <div class="min-h-screen pt-24 text-center text-gray-500">Loading Profile...</div>
  `;

  if (personId.startsWith('tmdb-')) {
     credits = await getPersonCredits(personId);
     const meta = await getPersonMetadata(personId);
     if (meta) person = meta;
  }
  
  if (!person) {
    document.getElementById('root').innerHTML = `
      ${renderHeader()}
      <div class="min-h-screen pt-24 text-center text-gray-500">Person Not Found</div>
    `;
    return;
  }

  // Filter movies
  const filmography = MOVIES.filter(m => {
     if (credits.size > 0 && credits.has(normalizeTitle(m.title))) return true;
     return m.cast.some(c => c.id === person.id || c.name === person.name) ||
            m.directors.some(d => d.id === person.id || d.name === person.name);
  }).sort((a,b) => b.year - a.year);

  // Update Image cache
  getPersonImage(person.name, person.role, person.id).then(url => {
     const el = document.getElementById('main-person-img');
     if(el && url) el.src = url;
  });

  document.getElementById('root').innerHTML = `
    ${renderHeader()}
    <div class="min-h-screen pt-24 px-6 md:px-20 pb-20">
       <button onclick="navigateTo('browse')" class="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
         ${Icons('back')} Back to Library
       </button>
       <div class="flex flex-col items-center md:items-start md:flex-row gap-10 mb-16 bg-cine-800/30 p-8 rounded-2xl border border-white/5">
          <div class="h-48 w-48 rounded-full overflow-hidden border-4 border-cine-accent shadow-2xl flex-shrink-0 bg-cine-900">
             <img src="${person.image}" id="main-person-img" class="h-full w-full object-cover"/>
          </div>
          <div>
            <h1 class="text-5xl font-bold text-white mt-4 tracking-tight">${person.name}</h1>
            <p class="text-2xl text-cine-accent mt-2 font-medium">${person.role}</p>
            <p class="text-gray-400 mt-4 max-w-xl text-lg leading-relaxed">
              Found in <span class="text-white font-bold">${filmography.length}</span> films in this library. 
              <br/>
              Fame Score: <span class="text-white font-bold">${Math.round(person.fameScore)}</span>
            </p>
          </div>
       </div>
       <h2 class="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Library Appearances</h2>
       ${filmography.length > 0 ? `
           <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
              ${filmography.map(m => MovieCardHTML(m)).join('')}
           </div>
       ` : `<div class="text-gray-500 italic">No other films in this library feature this person.</div>`}
    </div>
  `;
  
  // Load posters
  filmography.forEach(m => triggerMovieDataLoad(m));
}


// --- MAIN APP LOGIC ---

function getFilteredMovies() {
  let result = MOVIES;
  const f = state.filters;

  if (f.searchQuery && !state.peopleSearchMode) {
    const q = f.searchQuery.toLowerCase();
    result = result.filter(m => m.title.toLowerCase().includes(q));
  }
  if (f.genres.length > 0) {
    result = result.filter(m => f.genres.every(g => m.genres.includes(g)));
  }
  if (f.decades.length > 0) {
    result = result.filter(m => f.decades.includes(Math.floor(m.year / 10) * 10));
  }
  if (f.type === 'talkie') result = result.filter(m => m.isTalkie);
  if (f.type === 'silent') result = result.filter(m => !m.isTalkie);
  if (f.color === 'color') result = result.filter(m => m.isColor);
  if (f.color === 'bw') result = result.filter(m => !m.isColor);

  return [...result].sort((a, b) => {
    const rA = state.realRatings[a.id] ?? a.rating;
    const rB = state.realRatings[b.id] ?? b.rating;
    if (f.sortBy === 'rating') return rB - rA;
    if (f.sortBy === 'year_desc') return b.year - a.year;
    if (f.sortBy === 'year_asc') return a.year - b.year;
    return 0;
  });
}

function getFilteredPeople() {
  if (!state.peopleSearchMode) return [];
  let result = PEOPLE;
  if (state.filters.searchQuery) {
    const q = state.filters.searchQuery.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q));
  }
  return result.sort((a, b) => b.fameScore - a.fameScore);
}

// --- ASYNC LOADERS ---
function triggerMovieDataLoad(movie) {
    getMovieBasicData(movie.title, movie.year, movie.id).then(data => {
        const img = document.getElementById(`poster-${movie.id}`);
        const rate = document.getElementById(`rating-${movie.id}`);
        if(img && data.poster) img.src = data.poster;
        if(rate && data.rating) rate.innerText = `★ ${data.rating.toFixed(1)}`;
    });
}

function triggerPersonImageLoad(person) {
    getPersonImage(person.name, person.role, person.id).then(url => {
        const img = document.getElementById(`pimg-${person.id}`);
        if(img && url) img.src = url;
    });
}

// --- ACTIONS & NAVIGATION ---

window.navigateTo = function(view, id = null) {
  state.view = view;
  state.currentId = id;
  window.scrollTo(0,0);
  renderApp();
};

window.setMode = function(isPeople) {
  state.peopleSearchMode = isPeople;
  state.filters.searchQuery = '';
  navigateTo('browse');
};

window.handleSearch = function(val) {
  state.filters.searchQuery = val;
  if (state.view !== 'browse') {
     state.view = 'browse';
  }
  renderApp();
  // Restore focus
  const input = document.querySelector('input[type="text"]');
  if(input) {
      input.focus();
      // Move cursor to end
      const len = input.value.length;
      input.setSelectionRange(len, len);
  }
};

window.updateFilter = function(key, val) {
  state.filters[key] = val;
  renderApp();
};

window.toggleGenre = function(g) {
  const idx = state.filters.genres.indexOf(g);
  if (idx >= 0) state.filters.genres.splice(idx, 1);
  else state.filters.genres.push(g);
  renderApp();
};

window.toggleDecade = function(d) {
  const idx = state.filters.decades.indexOf(d);
  if (idx >= 0) state.filters.decades.splice(idx, 1);
  else state.filters.decades.push(d);
  renderApp();
};

window.filterByGenre = function(g) {
    const local = Object.values(Genre).find(lg => lg.toLowerCase() === g.toLowerCase());
    state.filters = {
        genres: local ? [local] : [],
        decades: [],
        type: 'all',
        color: 'all',
        sortBy: 'rating',
        searchQuery: local ? '' : g
    };
    navigateTo('browse');
};

window.openExternalVideoSearch = openExternalVideoSearch;

function renderApp() {
  const root = document.getElementById('root');
  
  if (state.view === 'movie') {
     renderMovieDetails(); // Async render handles itself
     return;
  }
  
  if (state.view === 'person') {
     renderPersonDetails(); // Async render handles itself
     return;
  }

  let content = renderHeader();
  if (state.view === 'home') content += renderHome();
  else if (state.view === 'browse') content += renderBrowse();
  
  root.innerHTML = content;
  
  // Post-render triggers
  if (state.view === 'home') {
     MOVIES.forEach(m => triggerMovieDataLoad(m));
  } else if (state.view === 'browse') {
     if (!state.peopleSearchMode) {
         getFilteredMovies().forEach(m => triggerMovieDataLoad(m));
     } else {
         getFilteredPeople().forEach(p => triggerPersonImageLoad(p));
     }
  }
}

// Init
renderApp();
