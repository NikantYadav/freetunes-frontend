
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

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
  const [isLiked, setIsLiked] = useState(false);

  // Mock playlists for demonstration
  const playlists = [
    { id: '1', name: 'Liked Songs' },
    { id: '2', name: 'Dance Mix' },
    { id: '3', name: 'Chill Vibes' },
    { id: '4', name: 'Workout Playlist' }
  ];

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

  // Handle adding song to a playlist
  const addToPlaylist = (playlistId: string) => {
    console.log(`Added song "${currentTrack.title}" to playlist with ID: ${playlistId}`);
    // If it's the liked songs playlist, toggle the heart icon
    if (playlistId === '1') { 
      setIsLiked(true);
    }
  };

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
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className={cn(
                  "ml-2 hover:text-neon transition-colors", 
                  isLiked ? "text-neon" : "text-gray-400"
                )}
                aria-label="Like song"
              >
                <Heart size={18} fill={isLiked ? "#009eff" : "transparent"} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-52 glass-dark border-neon shadow-neon-sm p-2 rounded-md">
              <div className="space-y-1">
                <p className="text-xs text-gray-300 mb-2">Save to playlist:</p>
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-neon/10 text-left transition-colors"
                    onClick={() => addToPlaylist(playlist.id)}
                  >
                    {playlist.name}
                  </button>
                ))}
                <button className="flex items-center w-full px-2 py-1.5 text-sm text-neon rounded-sm hover:bg-neon/10 mt-1 border-t border-white/10 pt-1.5">
                  <Plus size={14} className="mr-1.5" /> Create Playlist
                </button>
              </div>
            </PopoverContent>
          </Popover>
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
