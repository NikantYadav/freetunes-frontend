
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import PlayerBar from '../components/PlayerBar';
import AlbumCard from '../components/AlbumCard';
import TrackRow from '../components/TrackRow';
import { newReleases, recommendedForYou, featuredPlaylists } from '../data/mockData';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark text-white">
      <Sidebar activePath={location.pathname} />
      
      <main className="min-h-screen md:ml-64 pb-40">
        <div className="p-6 max-w-6xl mx-auto">
          {/* Hero section */}
          <section className="mb-12">
            <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 glass-dark">
              <div className="absolute inset-0 bg-gradient-to-r from-neon/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome Back</h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-lg">
                  Discover new music that matches your futuristic vibe
                </p>
              </div>
            </div>
          </section>
          
          {/* New releases section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">New Releases</h2>
              <a href="/new-releases" className="text-neon text-sm animated-underline">
                View all
              </a>
            </div>
            <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {newReleases.map((album) => (
                <AlbumCard
                  key={album.id}
                  id={album.id}
                  title={album.title}
                  artist={album.artist.name}
                  coverImage={album.coverImage}
                  isNew={album.isNew}
                />
              ))}
            </div>
          </section>
          
          {/* Featured playlists */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Featured Playlists</h2>
              <a href="/playlists" className="text-neon text-sm animated-underline">
                View all
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredPlaylists.map((playlist) => (
                <AlbumCard
                  key={playlist.id}
                  id={playlist.id}
                  title={playlist.name}
                  artist={playlist.owner}
                  coverImage={playlist.coverImage}
                />
              ))}
            </div>
          </section>
          
          {/* Recommended for you */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
            <div className="bg-white/5 rounded-lg overflow-hidden">
              {recommendedForYou.map((track, index) => (
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
          </section>
        </div>
      </main>
      
      <MobileNavigation activePath={location.pathname} />
      <PlayerBar />
    </div>
  );
};

export default Index;
