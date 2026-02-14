import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { getMovieBasicData } from '../utils';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
  showDetails?: boolean;
  onDataLoaded?: (id: string, rating: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, showDetails = true, onDataLoaded }) => {
  const [posterSrc, setPosterSrc] = useState<string>(movie.poster);
  const [rating, setRating] = useState<number>(movie.rating);

  useEffect(() => {
    let isMounted = true;
    
    getMovieBasicData(movie.title, movie.year, movie.id)
      .then((data) => {
        if (isMounted) {
          if (data.poster) setPosterSrc(data.poster);
          if (data.rating !== null && data.rating !== undefined) {
            setRating(data.rating);
            if (onDataLoaded) {
                onDataLoaded(movie.id, data.rating);
            }
          }
        }
      });

    return () => { isMounted = false; };
  }, [movie.id, movie.title, movie.year, onDataLoaded]);

  return (
    <div 
      onClick={() => onClick(movie.id)}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-cine-800 shadow-md transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:ring-2 group-hover:ring-cine-accent/70">
        <img 
          src={posterSrc} 
          alt={movie.title} 
          className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-cine-accent backdrop-blur-md shadow-sm">
          ★ {rating.toFixed(1)}
        </div>
      </div>
      
      {/* Meta Information Below Poster */}
      <div className="mt-3 flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-gray-200 leading-tight truncate group-hover:text-white transition-colors" title={movie.title}>
          {movie.title}
        </h3>
        <span className="text-xs text-gray-500 font-medium">{movie.year}</span>
      </div>
    </div>
  );
};