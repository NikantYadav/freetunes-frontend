
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import PlayerBar from '../components/PlayerBar';
import AlbumCard from '../components/AlbumCard';
import TrackRow from '../components/TrackRow';
import { newReleases, recommendedForYou, featuredPlaylists } from '../data/mockData';
import { useLocation } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark text-white">
      <Sidebar activePath={location.pathname} />
      
      <main className="min-h-screen md:ml-64 pb-40">
        <div className="p-6 max-w-6xl mx-auto">
          {/* Hero section with improved design */}
          <section className="mb-12">
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 glass-dark">
              <div className="absolute inset-0 bg-gradient-to-r from-neon/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">
                  Welcome <span className="text-neon">Back</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-lg mb-6">
                  Discover new music that matches your futuristic vibe
                </p>
                <div className="flex space-x-4">
                  <button className="bg-neon/90 hover:bg-neon text-black font-medium py-2 px-6 rounded-full transition-all duration-300 hover:shadow-neon">
                    Explore
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-2 px-6 rounded-full border border-white/20 transition-all duration-300">
                    My Library
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* New releases section with carousel */}
          <section className="mb-16 relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-neon rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold">New Releases</h2>
              </div>
              <a href="/new-releases" className="text-neon text-sm group flex items-center">
                <span className="animated-underline">View all</span>
                <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {newReleases.map((album) => (
                  <CarouselItem key={album.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <AlbumCard
                      id={album.id}
                      title={album.title}
                      artist={album.artist.name}
                      coverImage={album.coverImage}
                      isNew={album.isNew}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-black/50 border-neon text-neon hover:bg-black/80" />
              <CarouselNext className="right-0 bg-black/50 border-neon text-neon hover:bg-black/80" />
            </Carousel>
          </section>
          
          {/* Featured playlists with updated styling */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-1 h-6 bg-neon rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold">Featured Playlists</h2>
              </div>
              <a href="/playlists" className="text-neon text-sm group flex items-center">
                <span className="animated-underline">View all</span>
                <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredPlaylists.map((playlist) => (
                <AlbumCard
                  key={playlist.id}
                  id={playlist.id}
                  title={playlist.name}
                  artist={playlist.owner}
                  coverImage={playlist.coverImage}
                  size="lg"
                />
              ))}
            </div>
          </section>
          
          {/* Recommended for you with updated styling */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-1 h-6 bg-neon rounded-full mr-3"></div>
              <h2 className="text-2xl font-bold">Recommended for You</h2>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
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
