
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerBarProps {
  track?: {
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    duration: number;
  };
}

const PlayerBar = ({ track }: PlayerBarProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Current progress in percentage
  const [volume, setVolume] = useState(80); // Volume level in percentage

  // Mock track if none provided
  const currentTrack = track || {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Cyber Symphony',
    albumArt: 'https://via.placeholder.com/60?text=Album',
    duration: 256,
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate current time based on percentage
  const currentTime = (currentTrack.duration * progress) / 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 glass border-t border-white/5 backdrop-blur-md px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Track info */}
        <div className="flex items-center w-1/4">
          <img 
            src={currentTrack.albumArt} 
            alt={`${currentTrack.title} album art`} 
            className="h-12 w-12 rounded mr-3 object-cover" 
          />
          <div className="truncate mr-4">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          <button 
            className="ml-2 text-gray-400 hover:text-neon"
            aria-label="Like song"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center justify-center space-x-4">
            <button 
              className="text-gray-400 hover:text-neon"
              aria-label="Previous track"
            >
              <SkipBack size={20} />
            </button>
            <button 
              className="bg-neon rounded-full p-2 text-black hover:bg-opacity-80 transition"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button 
              className="text-gray-400 hover:text-neon"
              aria-label="Next track"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-3 mt-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-neon rounded-full"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Progress"
              />
            </div>
            <span className="text-xs text-gray-400">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Volume controls */}
        <div className="flex items-center justify-end w-1/4">
          <Volume2 size={18} className="text-gray-400 mr-2" />
          <div className="relative w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-neon rounded-full"
              style={{ width: `${volume}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
