import React, { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPersonImage } from '../utils';

interface PersonCardProps {
  person: Person;
  onClick: (id: string) => void;
  variant?: 'circle' | 'card';
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onClick, variant = 'circle' }) => {
  const [imageSrc, setImageSrc] = useState<string>(person.image);

  useEffect(() => {
    let isMounted = true;
    
    getPersonImage(person.name, person.role, person.id)
      .then((url) => {
        if (isMounted && url) {
          setImageSrc(url);
        }
      });

    return () => { isMounted = false; };
  }, [person.id, person.name, person.role]);

  if (variant === 'circle') {
    return (
      <div 
        onClick={(e) => { e.stopPropagation(); onClick(person.id); }}
        className="flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-transparent transition-colors group-hover:border-cine-accent relative bg-cine-800">
           <img src={imageSrc} alt={person.name} className="h-full w-full object-cover" />
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-white group-hover:text-cine-accent">{person.name}</p>
          <p className="text-[10px] text-gray-400">{person.role}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onClick(person.id)}
      className="flex cursor-pointer flex-col overflow-hidden rounded-lg bg-cine-800 transition hover:bg-cine-700 w-32 md:w-40"
    >
      <div className="aspect-square w-full overflow-hidden bg-cine-900">
        <img src={imageSrc} alt={person.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-sm font-bold text-white truncate">{person.name}</h3>
        <p className="text-xs text-cine-accent">{person.role}</p>
        <p className="text-[10px] text-gray-500 mt-1">Fame: {person.fameScore}</p>
      </div>
    </div>
  );
};