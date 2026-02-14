export enum Genre {
  Noir = "Film Noir",
  SciFi = "Sci-Fi",
  Horror = "Horror",
  Comedy = "Comedy",
  Western = "Western",
  Drama = "Drama",
  Action = "Action",
  Romance = "Romance",
  Mystery = "Mystery",
  Documentary = "Documentary",
  War = "War"
}

export interface Person {
  id: string;
  name: string;
  role: 'Actor' | 'Director';
  image: string;
  fameScore: number; // 0-100, for sorting
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: number; // in minutes
  plot: string;
  genres: Genre[];
  rating: number; // 0-10 IMDb style
  poster: string;
  backdrop: string;
  directors: Person[];
  cast: Person[];
  isColor: boolean;
  isTalkie: boolean;
}

export interface FilterState {
  genres: Genre[];
  decades: number[]; // e.g. [1930, 1940]
  type: 'all' | 'talkie' | 'silent';
  color: 'all' | 'color' | 'bw';
  sortBy: 'rating' | 'year_desc' | 'year_asc';
  searchQuery: string;
}

export type ViewState = 
  | { name: 'home' }
  | { name: 'browse', filterOverride?: Partial<FilterState> }
  | { name: 'movie', movieId: string }
  | { name: 'person', personId: string };