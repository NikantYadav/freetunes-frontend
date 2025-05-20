
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  isNew?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AlbumCard = ({ id, title, artist, coverImage, isNew = false, size = 'md' }: AlbumCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const dimensions = {
    sm: 'w-32 h-32',
    md: 'w-40 h-40',
    lg: 'w-48 h-48',
  };

  return (
    <Link 
      to={`/album/${id}`}
      className="group transition-all duration-300 hover:scale-[1.03]"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative">
        <div className={cn(
          "relative rounded-xl overflow-hidden shadow-lg hover:shadow-neon transition-all duration-300",
          dimensions[size]
        )}>
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          {isNew && (
            <div className="absolute top-2 right-2 bg-neon text-black text-xs px-2 py-0.5 rounded-full font-medium animate-pulse-glow">
              NEW
            </div>
          )}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}>
            <button 
              className={cn(
                "bg-neon text-black rounded-full flex items-center justify-center transition-all",
                size === 'sm' ? 'w-10 h-10' : 'w-12 h-12',
                isHover ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-90'
              )}
              aria-label={`Play ${title}`}
            >
              <Play size={size === 'sm' ? 16 : 20} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium truncate text-white">{title}</h3>
        <p className="text-sm text-gray-400 truncate">{artist}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
