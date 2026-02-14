import React from 'react';
import { FilterState, Genre } from '../types';
import { getAllGenres, getAllDecades } from '../data';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, className = '' }) => {
  const allGenres = getAllGenres();
  const allDecades = getAllDecades();

  const toggleGenre = (g: Genre) => {
    setFilters(prev => {
      if (prev.genres.includes(g)) {
        return { ...prev, genres: prev.genres.filter(gen => gen !== g) };
      }
      return { ...prev, genres: [...prev.genres, g] };
    });
  };

  const toggleDecade = (d: number) => {
    setFilters(prev => {
      if (prev.decades.includes(d)) {
        return { ...prev, decades: prev.decades.filter(dec => dec !== d) };
      }
      return { ...prev, decades: [...prev.decades, d] };
    });
  };

  return (
    <div className={`flex flex-col gap-6 rounded-xl bg-cine-800/50 p-4 backdrop-blur-md border border-white/5 ${className}`}>
      {/* Sort */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase text-gray-400">Sort By</h3>
        <select 
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
          className="w-full rounded bg-cine-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cine-accent"
        >
          <option value="rating">Highest Rated</option>
          <option value="year_desc">Newest First</option>
          <option value="year_asc">Oldest First</option>
        </select>
      </div>

      {/* Tech Specs */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase text-gray-400">Format</h3>
        <div className="flex flex-col gap-2">
          <div className="flex rounded bg-cine-900 p-1">
            <button 
              onClick={() => setFilters(p => ({...p, type: 'all'}))}
              className={`flex-1 rounded py-1 text-xs ${filters.type === 'all' ? 'bg-cine-700 text-white' : 'text-gray-400'}`}
            >All</button>
            <button 
              onClick={() => setFilters(p => ({...p, type: 'talkie'}))}
              className={`flex-1 rounded py-1 text-xs ${filters.type === 'talkie' ? 'bg-cine-700 text-white' : 'text-gray-400'}`}
            >Talkies</button>
            <button 
              onClick={() => setFilters(p => ({...p, type: 'silent'}))}
              className={`flex-1 rounded py-1 text-xs ${filters.type === 'silent' ? 'bg-cine-700 text-white' : 'text-gray-400'}`}
            >Silent</button>
          </div>
          <div className="flex rounded bg-cine-900 p-1">
            <button 
              onClick={() => setFilters(p => ({...p, color: 'all'}))}
              className={`flex-1 rounded py-1 text-xs ${filters.color === 'all' ? 'bg-cine-700 text-white' : 'text-gray-400'}`}
            >All</button>
            <button 
              onClick={() => setFilters(p => ({...p, color: 'color'}))}
              className={`flex-1 rounded py-1 text-xs ${filters.color === 'color' ? 'bg-cine-700 text-white' : 'text-gray-400'}`}
            >Color</button>
            <button 
              onClick={() => setFilters(p => ({...p, color: 'bw'}))}
              className={`flex-1 rounded py-1 text-xs ${filters.color === 'bw' ? 'bg-cine-700 text-white' : 'text-gray-400'}`}
            >B&W</button>
          </div>
        </div>
      </div>

      {/* Genres */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase text-gray-400">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {allGenres.map(g => (
            <button
              key={g}
              onClick={() => toggleGenre(g)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                filters.genres.includes(g) 
                  ? 'bg-cine-accent text-black font-bold' 
                  : 'bg-cine-900 text-gray-300 hover:bg-cine-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Decades */}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase text-gray-400">Decades</h3>
        <div className="flex flex-wrap gap-2">
          {allDecades.map(d => (
            <button
              key={d}
              onClick={() => toggleDecade(d)}
              className={`rounded px-2 py-1 text-xs font-mono transition-colors ${
                filters.decades.includes(d) 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-cine-900 text-gray-400 hover:bg-cine-700'
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};