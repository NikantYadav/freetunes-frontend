
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import PlayerBar from '../components/PlayerBar';
import TrackRow from '../components/TrackRow';
import { playlists } from '../data/mockData';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  
  // Find the playlist
  const playlist = playlists.find(p => p.id === id);
  
  if (!playlist) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Playlist not found</h1>
          <a href="/" className="text-neon hover:underline">Return to home</a>
        </div>
      </div>
    );
  }
  
  const totalDuration = playlist.tracks.reduce((sum, track) => sum + track.duration, 0);
  const formatTotalDuration = () => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  };
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Sidebar activePath={location.pathname} />
      
      <main className="min-h-screen md:ml-64 pb-40">
        <div>
          {/* Playlist header */}
          <div className="bg-gradient-to-b from-neon/20 to-dark pt-12 pb-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="w-48 h-48 shadow-2xl shadow-neon/20 rounded-lg overflow-hidden">
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-sm font-medium mb-2">PLAYLIST</div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{playlist.name}</h1>
                <p className="text-gray-300 mb-2">{playlist.description}</p>
                <div className="text-sm text-gray-400">
                  Created by <span className="text-white">{playlist.owner}</span> • {playlist.tracks.length} songs, {formatTotalDuration()}
                </div>
              </div>
            </div>
          </div>
          
          {/* Playlist controls */}
          <div className="px-6 py-4 bg-black/30 sticky top-0 z-10 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto flex items-center gap-4">
              <button 
                className="bg-neon text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition"
                aria-label="Play playlist"
              >
                <Play size={24} className="ml-0.5" />
              </button>
            </div>
          </div>
          
          {/* Track list */}
          <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-white/5 rounded-lg overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-white/10 text-gray-400 text-sm">
                <div className="w-8">#</div>
                <div>TITLE</div>
                <div className="hidden md:block">ALBUM</div>
                <div>DURATION</div>
              </div>
              
              {playlist.tracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  id={track.id}
                  index={index + 1}
                  title={track.title}
                  artist={track.artist.name}
                  album={track.album.title}
                  duration={track.duration}
                  isPlaying={currentTrackId === track.id}
                  onPlay={() => setCurrentTrackId(track.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <MobileNavigation activePath={location.pathname} />
      <PlayerBar />
    </div>
  );
};

export default Playlist;
