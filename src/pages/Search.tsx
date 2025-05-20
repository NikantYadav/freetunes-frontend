
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import PlayerBar from '../components/PlayerBar';
import SearchInput from '../components/SearchInput';
import AlbumCard from '../components/AlbumCard';
import TrackRow from '../components/TrackRow';
import { albums, tracks, artists } from '../data/mockData';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const location = useLocation();
  
  // Filter data based on search query
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Sidebar activePath={location.pathname} />
      
      <main className="min-h-screen md:ml-64 pb-40">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="sticky top-0 z-10 pt-4 pb-8 bg-dark">
            <h1 className="text-3xl font-bold mb-6">Search</h1>
            <SearchInput onSearch={handleSearch} />
          </div>
          
          {/* Initial view when no search query */}
          {!searchQuery && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {["Electronic", "Synthwave", "Cyberpunk", "Ambient", "Sci-Fi", "Neo-Classical", "Vaporwave", "Lo-Fi"].map((category, index) => (
                  <div 
                    key={index} 
                    className="aspect-square rounded-lg flex items-center justify-center bg-gradient-to-br from-neon/40 to-purple-500/30 hover-glow cursor-pointer"
                  >
                    <span className="text-lg font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Search results */}
          {searchQuery && (
            <>
              {/* Albums results */}
              {filteredAlbums.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Albums</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredAlbums.slice(0, 5).map((album) => (
                      <AlbumCard
                        key={album.id}
                        id={album.id}
                        title={album.title}
                        artist={album.artist.name}
                        coverImage={album.coverImage}
                        isNew={album.isNew}
                        size="sm"
                      />
                    ))}
                  </div>
                </section>
              )}
              
              {/* Artists results */}
              {filteredArtists.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Artists</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredArtists.map((artist) => (
                      <div key={artist.id} className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden hover-glow">
                          <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="mt-2 font-medium text-center">{artist.name}</h3>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              {/* Tracks results */}
              {filteredTracks.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Songs</h2>
                  <div className="bg-white/5 rounded-lg overflow-hidden">
                    {filteredTracks.slice(0, 10).map((track, index) => (
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
              )}
              
              {filteredAlbums.length === 0 && filteredTracks.length === 0 && filteredArtists.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-xl text-gray-400">No results found for "{searchQuery}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <MobileNavigation activePath={location.pathname} />
      <PlayerBar />
    </div>
  );
};

export default Search;
