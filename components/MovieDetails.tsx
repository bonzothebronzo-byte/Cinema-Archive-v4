import React, { useState, useEffect } from 'react';
import { MOVIES } from '../data';
import { PersonCard } from './PersonCard';
import { getMovieMetadata, MovieMetadata, openExternalVideoSearch, getMovieImage } from '../utils';

interface MovieDetailsProps {
  movieId: string;
  onBack: () => void;
  onPersonClick: (id: string) => void;
  onGenreClick: (genre: string) => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, onBack, onPersonClick, onGenreClick }) => {
  const movie = MOVIES.find(m => m.id === movieId);
  
  // Initialize with static poster, update with fetched poster
  const [posterSrc, setPosterSrc] = useState<string>(movie ? movie.poster : '');
  const [metadata, setMetadata] = useState<MovieMetadata | null>(null);

  useEffect(() => {
    if (!movie) return;
    
    let isMounted = true;
    
    // 1. Fetch Basic Poster (Fast)
    getMovieImage(movie.title, movie.year, movie.id)
      .then((url) => {
        if (isMounted && url && !metadata?.poster) {
          setPosterSrc(url);
        }
      });

    // 2. Fetch Full Metadata (Real data from TMDb)
    getMovieMetadata(movie.title, movie.year).then(data => {
      if (isMounted && data) {
        setMetadata(data);
        if (data.poster) setPosterSrc(data.poster);
      }
    });

    return () => { isMounted = false; };
  }, [movie]);

  if (!movie) return <div>Not Found</div>;

  // Use metadata if available, otherwise fall back to static data
  const displayTitle = movie.title;
  const displayYear = movie.year;
  const displayRuntime = metadata ? metadata.runtime : movie.runtime;
  const displayRating = metadata ? metadata.rating.toFixed(1) : movie.rating;
  const displayPlot = metadata ? metadata.plot : movie.plot;
  const displayGenres = metadata ? metadata.genres : movie.genres;
  const displayDirectors = metadata ? metadata.directors : movie.directors;
  const displayCast = metadata ? metadata.cast : movie.cast;
  const displayBackdrop = metadata?.backdrop || movie.backdrop;

  return (
    <div className="min-h-screen relative bg-cine-900">
        {/* Dynamic Backdrop */}
        <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden z-0">
            <img src={displayBackdrop} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-cine-900/10 via-cine-900/60 to-cine-900" />
        </div>

      <div className="relative z-10 pt-24 px-6 md:px-20 pb-20">
        <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           Back to Library
        </button>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Poster */}
          <div className="w-full md:w-1/3 max-w-[350px] flex-shrink-0 mx-auto md:mx-0">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-[2/3] bg-cine-800">
              <img src={posterSrc} alt={displayTitle} className="w-full h-full object-cover" />
            </div>
            
            <button 
              onClick={() => openExternalVideoSearch(displayTitle, displayYear)}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg shadow-red-900/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              Search Video
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{displayTitle}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-8 text-sm md:text-base font-medium">
              <span className="text-gray-100 bg-white/10 px-2 py-0.5 rounded">{displayYear}</span>
              <span>•</span>
              <span>{displayRuntime} min</span>
              <span>•</span>
              <span className="text-cine-accent font-bold flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  {displayRating}
              </span>
              <span>•</span>
              <span>{movie.isColor ? 'Color' : 'B&W'}</span>
              <span>•</span>
              <span>{movie.isTalkie ? 'Sound' : 'Silent'}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {displayGenres.map(g => (
                <button 
                  key={g} 
                  onClick={() => onGenreClick(g)}
                  className="px-4 py-1.5 bg-cine-800 rounded-full text-xs font-semibold text-gray-300 border border-white/10 hover:border-cine-accent hover:text-white transition-colors cursor-pointer"
                >
                  {g}
                </button>
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide text-cine-accent/80">Synopsis</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-4xl font-light">
                {displayPlot || "No synopsis available."}
            </p>

            {/* Credits */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide text-cine-accent/80">Directors</h3>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {displayDirectors.map(d => (
                   <PersonCard key={d.id} person={d} onClick={onPersonClick} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide text-cine-accent/80">Cast</h3>
              <div className="flex flex-wrap gap-6">
                {displayCast.map(c => (
                  <PersonCard key={c.id} person={c} onClick={onPersonClick} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};