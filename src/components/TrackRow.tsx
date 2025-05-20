
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
  const [liked, setLiked] = useState(isLiked);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div 
      className={cn(
        "group flex items-center px-4 py-3 transition-all duration-300",
        isPlaying 
          ? "bg-white/10 backdrop-blur-md border-l-2 border-neon shadow-[0_0_10px_rgba(0,158,255,0.1)]" 
          : "hover:bg-white/5 border-l-2 border-transparent hover:border-neon/30",
        index % 2 === 0 ? "bg-black/20" : "bg-transparent"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-8">
        {isHovered || isPlaying ? (
          <button 
            className={cn(
              "transition-all duration-300 transform hover:scale-110",
              isPlaying ? "text-neon animate-glow-pulse" : "text-white"
            )}
            onClick={onPlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        ) : (
          <span className="text-gray-400 opacity-70">{index}</span>
        )}
      </div>
      <div className="ml-4 flex-1 min-w-0 mr-4 transition-all duration-300 group-hover:translate-x-1">
        <div className="flex flex-col">
          <span className={cn(
            "font-medium truncate transition-all duration-300",
            isPlaying ? "text-neon text-shadow-neon" : "group-hover:text-white"
          )}>
            {title}
          </span>
          <span className="text-sm text-gray-400 truncate transition-all duration-300 group-hover:text-gray-300">{artist}</span>
        </div>
      </div>
      {album && (
        <div className="hidden md:block w-1/4 mr-4 truncate transition-all duration-300">
          <span className="text-sm text-gray-400 group-hover:text-gray-300">{album}</span>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <button 
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110",
            liked ? "text-neon" : "text-gray-400 hover:text-neon"
          )}
          onClick={() => setLiked(!liked)}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <Heart size={16} fill={liked ? "#009eff" : "none"} className="transition-transform duration-300" />
        </button>
        <span className="text-sm text-gray-400 w-12 transition-all duration-300 group-hover:text-gray-300">{formatDuration(duration)}</span>
        <button 
          className="text-gray-400 hover:text-neon opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackRow;
