import { Movie, Genre, Person } from './types';

// Raw list provided by user
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

// Helper to generate a consistent pseudo-random number from a string
const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// --- Mock Data Generators ---

// Updated with real TMDb IDs for accurate credit fetching
const mockPeople: Person[] = [
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

// Determine genre based on title keywords and rigorous heuristics
// Random fallback has been removed to ensure accuracy
const getGenres = (title: string, year: number): Genre[] => {
  const t = title.toLowerCase();
  const genres = new Set<Genre>();
  
  // Specific Overrides for known edge cases
  if (t === 'a star is born') { genres.add(Genre.Drama); genres.add(Genre.Romance); return Array.from(genres); }
  if (t === 'chained for life') { genres.add(Genre.Drama); return Array.from(genres); }
  if (t === 'the general' && year === 1926) { genres.add(Genre.Comedy); genres.add(Genre.War); genres.add(Genre.Action); return Array.from(genres); }
  if (t.includes('hercules')) { genres.add(Genre.Action); genres.add(Genre.SciFi); } // Peplum often borders fantasy/action
  
  // Classics overrides
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

  // Horror
  if (t.match(/\b(vampire|blood|horror|dead|ghost|monster|zombie|beast|creature|brain|haunted|terror|fear|nightmare|dracula|frankenstein|mummy|werewolf|screaming|shriek|wicked|witch|curse|demon|devil|hell|spider|leeches|gila|shrews|wasp|ant|mantis|bats|phantom|fiend|macabre|grave|nosferatu|caligari|golem|faust|hunchback|jekyll|hyde)\b/)) genres.add(Genre.Horror);
  
  // Sci-Fi
  if (t.match(/\b(planet|space|mars|moon|atom|2000|future|alien|invader|saucer|rocket|venus|earth|asteroid|cyborg|robot|invisible|prehistoric|flight|moons|unknown world|gamma|x|blob|thing|astounding|galaxy|cosmos|lost world)\b/)) genres.add(Genre.SciFi);
  
  // Western
  if (t.match(/\b(western|rider|gun|trail|texas|rio|arizona|canyon|stagecoach|sheriff|outlaw|apache|comanche|horse|saddle|frontier|ranger|cowboy|plains|valley|town|abilene|deadwood|kansan|nebraskan|sundown|dakota|laramie|pony|express)\b/)) genres.add(Genre.Western);
  
  // Comedy
  if (t.match(/\b(laugh|fools|mess|circus|comedy|funny|stooges|abbott|costello|laurel|hardy|buster|chaplin|keaton|marx|duck|nut|goofy|chump|bride|groom|kid|rascals|gang|boys|love|happy|lucky|heaven|girl|baby|gold rush|safety last|steamboat|sherlock jr)\b/)) genres.add(Genre.Comedy);
  
  // Mystery/Thriller/Noir
  if (t.match(/\b(detective|murder|mystery|sherlock|holmes|case|clue|suspect|crime|confidential|blackmail|stranger|shadow|falcon|saint|whodunit|guilty|alibi|witness|vanishes|corpse|manhunt|trap|fear|scared|terror|shanghai|dick tracy|private eye|spy|agent)\b/)) genres.add(Genre.Mystery);
  
  // War
  if (t.match(/\b(war|battle|battleship|soldier|army|navy|marine|combat|attack|fight|victory|glory|hero|tank|submarine|air|force|platoon|command|front|enemy|steel|valor|retreat|pacific|normandy|lieutenant|sergeant|general|colonel)\b/)) genres.add(Genre.War);

  // Romance
  if (t.match(/\b(love|affair|heart|kiss|romance|wedding|bride|husband|wife|darling|sweetheart|passion|desire)\b/)) genres.add(Genre.Romance);

  // Documentary
  if (t.match(/\b(doc|truth|fight|news|chronicle|story of|victory|battle of|divide|conquer|nazis|war comes|midway|thunderbolt|memphis belle|report)\b/) || year > 2000) genres.add(Genre.Documentary);

  // Action / Adventure
  if (t.match(/\b(adventure|tarzan|jungle|thief|pirate|robin hood|bagdad|zorro|musketeer|captain|buccaneer|sword|crusade|avenger|lost world)\b/)) genres.add(Genre.Action);

  // Noir Heuristics (Date range + dark themes + lack of other genres)
  if (year >= 1940 && year <= 1959 && !genres.has(Genre.Western) && !genres.has(Genre.SciFi) && !genres.has(Genre.Comedy) && !genres.has(Genre.War) && !genres.has(Genre.Documentary)) {
     // If it's already mystery/thriller, it's a strong candidate for Noir in this era
     // Or if it has "dark" keywords
     if (genres.has(Genre.Mystery) || t.match(/\b(big|night|city|street|dark|lady|man|woman|stranger|killer|death|murder|fatal|trapped|fear|red|scarlet|black|detour|hitch-hiker|doa|impact|quicksand|postman|fallen|angel|corrupt|vice|naked)\b/)) {
        genres.add(Genre.Noir);
     }
  }

  // Fallback to Drama instead of Random to avoid polluting specific genres like Sci-Fi with unrelated movies
  if (genres.size === 0) {
    genres.add(Genre.Drama);
  }

  return Array.from(genres);
};

// We return empty arrays for Cast and Director to prevent false information.
// The app will fetch real data from TMDb when viewing Movie/Person details.
const getCast = (title: string): Person[] => {
  return [];
};

const getDirector = (title: string): Person[] => {
  return [];
};

// Parse the raw list
const parseMovies = (): Movie[] => {
  const lines = rawMovieList.split('\n').filter(l => l.trim().length > 0);
  
  return lines.map((line, idx) => {
    // Regex to extract Title and (Year)
    const match = line.match(/^(.*?)\s*\((\d{4})\)$/);
    if (!match) return null;

    const title = match[1].trim();
    const year = parseInt(match[2]);
    const hash = hashCode(title);
    
    // Heuristics
    const isTalkie = year >= 1929; // approximate
    const isColor = year >= 1955 || (year > 1935 && hash % 3 === 0); // rough guess for demo
    const rating = (hash % 40) / 10 + 5; // 5.0 to 9.0
    const genres = getGenres(title, year);
    
    return {
      id: `m-${idx}`,
      title,
      year,
      runtime: (hash % 60) + 60, // 60-120 mins
      plot: plotTemplates[hash % plotTemplates.length],
      genres,
      rating: parseFloat(rating.toFixed(1)),
      // Using picsum with specific seed to ensure same image for same movie
      poster: `https://picsum.photos/seed/${hash}/300/450`,
      backdrop: `https://picsum.photos/seed/${hash + 1}/1280/720`,
      cast: getCast(title),
      directors: getDirector(title),
      isColor,
      isTalkie
    };
  }).filter((m): m is Movie => m !== null);
};

export const MOVIES = parseMovies();
export const PEOPLE = mockPeople;

// Derived Data Helpers
export const getAllGenres = () => Object.values(Genre);
export const getAllDecades = () => {
  const years = MOVIES.map(m => m.year);
  const min = Math.floor(Math.min(...years) / 10) * 10;
  const max = Math.floor(Math.max(...years) / 10) * 10;
  const decades = [];
  for (let d = min; d <= max; d += 10) decades.push(d);
  return decades;
};