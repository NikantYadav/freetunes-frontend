
import React, { useState } from 'react';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackRowProps {
  id: string;
  index: number;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlay?: () => void;
}

const TrackRow = ({ 
  id, 
  index, 
  title, 
  artist, 
  album, 
  duration, 
  isPlaying = false,
  isLiked = false,
  onPlay
}: TrackRowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div 
      className={cn(
        "group flex items-center px-4 py-3 transition-all",
        isPlaying 
          ? "bg-white/10 border-l-2 border-neon" 
          : "hover:bg-white/5 border-l-2 border-transparent",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-8">
        {isHovered || isPlaying ? (
          <button 
            className="text-neon hover:scale-110 transition-transform"
            onClick={onPlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        ) : (
          <span className="text-gray-400">{index}</span>
        )}
      </div>
      <div className="ml-4 flex-1 min-w-0 mr-4">
        <div className="flex flex-col">
          <span className={cn(
            "font-medium truncate",
            isPlaying ? "text-neon" : ""
          )}>
            {title}
          </span>
          <span className="text-sm text-gray-400 truncate">{artist}</span>
        </div>
      </div>
      {album && (
        <div className="hidden md:block w-1/4 mr-4 truncate">
          <span className="text-sm text-gray-400">{album}</span>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <button 
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity",
            isLiked ? "text-neon" : "text-gray-400 hover:text-neon"
          )}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart size={16} fill={isLiked ? "#00FFFF" : "none"} />
        </button>
        <span className="text-sm text-gray-400 w-12">{formatDuration(duration)}</span>
        <button 
          className="text-gray-400 hover:text-neon opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackRow;
