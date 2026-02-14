import React, { useState, useEffect, useMemo } from 'react';
import { PEOPLE, MOVIES } from '../data';
import { Person } from '../types';
import { MovieCard } from './MovieCard';
import { getPersonImage, getPersonMetadata, getPersonCredits, normalizeTitle } from '../utils';

interface PersonDetailsProps {
  personId: string;
  onBack: () => void;
  onMovieClick: (id: string) => void;
}

export const PersonDetails: React.FC<PersonDetailsProps> = ({ personId, onBack, onMovieClick }) => {
  // Try to find in static data first, state will update if fetched dynamically
  const initialPerson = PEOPLE.find(p => p.id === personId);
  const [person, setPerson] = useState<Person | undefined>(initialPerson);
  const [imageSrc, setImageSrc] = useState<string>(initialPerson ? initialPerson.image : '');
  const [isLoading, setIsLoading] = useState(!initialPerson);
  
  // Store fetched credits (Set of normalized titles)
  const [knownTitles, setKnownTitles] = useState<Set<string> | null>(null);

  // Effect to fetch person data and credits if it's a TMDb ID
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
        // Always try to fetch credits if we have a TMDb ID, to ensure accuracy against the library
        if (personId.startsWith('tmdb-')) {
             const titles = await getPersonCredits(personId);
             if (isMounted) setKnownTitles(titles);
        }

        if (!initialPerson && personId.startsWith('tmdb-')) {
            setIsLoading(true);
            
            // 1. Fetch Profile
            const p = await getPersonMetadata(personId);
            if (isMounted && p) {
                setPerson(p);
                setImageSrc(p.image);
            }
            
            if (isMounted) setIsLoading(false);
        } else if (initialPerson) {
            // Local person - just fetch better image
            getPersonImage(initialPerson.name, initialPerson.role, initialPerson.id).then(url => {
                if (isMounted && url) setImageSrc(url);
            });
            setIsLoading(false);
        }
    };

    loadData();

    return () => { isMounted = false; };
  }, [personId, initialPerson]);

  // Filter Logic:
  // If we have fetched real credits (knownTitles), use those to find movies in our library.
  // Otherwise, fall back to matching name/id against the static (mock) cast data.
  const filmography = useMemo(() => {
    if (!person) return [];

    return MOVIES.filter(m => {
        // 1. Check against fetched real credits (Robust)
        if (knownTitles) {
            if (knownTitles.has(normalizeTitle(m.title))) return true;
        }

        // 2. Check against static data (Fallback for local people or cache misses)
        // We check ID or Name
        const inCast = m.cast.some(c => c.id === person.id || c.name === person.name);
        const inCrew = m.directors.some(d => d.id === person.id || d.name === person.name);
        return inCast || inCrew;
    }).sort((a,b) => b.year - a.year);

  }, [person, knownTitles]);


  if (isLoading) {
      return <div className="min-h-screen pt-24 text-center text-gray-500">Loading Profile...</div>;
  }

  if (!person) return <div className="min-h-screen pt-24 text-center text-gray-500">Person Not Found</div>;

  return (
    <div className="min-h-screen pt-24 px-6 md:px-20 pb-20">
       <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
         Back to Library
      </button>

       <div className="flex flex-col items-center md:items-start md:flex-row gap-10 mb-16 bg-cine-800/30 p-8 rounded-2xl border border-white/5">
          <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-cine-accent shadow-2xl flex-shrink-0 bg-cine-900">
            {imageSrc ? (
               <img src={imageSrc} alt={person.name} className="h-full w-full object-cover"/>
            ) : (
                <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-700 select-none">
                    {person.name.charAt(0)}
                </div>
            )}
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white mt-4 tracking-tight">{person.name}</h1>
            <p className="text-2xl text-cine-accent mt-2 font-medium">{person.role}</p>
            <p className="text-gray-400 mt-4 max-w-xl text-lg leading-relaxed">
              Found in <span className="text-white font-bold">{filmography.length}</span> films in this library. 
              <br/>
              Fame Score: <span className="text-white font-bold">{Math.round(person.fameScore)}</span>
            </p>
          </div>
       </div>

       <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Library Appearances</h2>
       {filmography.length > 0 ? (
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-12">
              {filmography.map(m => (
                <MovieCard key={m.id} movie={m} onClick={onMovieClick} />
              ))}
           </div>
       ) : (
           <div className="text-gray-500 italic">No other films in this library feature this person.</div>
       )}
    </div>
  );
};
