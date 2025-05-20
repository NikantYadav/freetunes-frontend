
// Mock data for music streaming app
export interface Artist {
  id: string;
  name: string;
  image: string;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverImage: string;
  releaseDate: string;
  isNew?: boolean;
}

export interface Track {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: number; // in seconds
  isExplicit?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  coverImage: string;
  description: string;
  tracks: Track[];
  owner: string;
}

// Artists
export const artists: Artist[] = [
  {
    id: "artist-1",
    name: "Cyber Symphony",
    image: "https://via.placeholder.com/200?text=CS"
  },
  {
    id: "artist-2",
    name: "Neon Pulse",
    image: "https://via.placeholder.com/200?text=NP"
  },
  {
    id: "artist-3",
    name: "Digital Echo",
    image: "https://via.placeholder.com/200?text=DE"
  },
  {
    id: "artist-4",
    name: "Binary Dreams",
    image: "https://via.placeholder.com/200?text=BD"
  },
  {
    id: "artist-5",
    name: "Circuit Noise",
    image: "https://via.placeholder.com/200?text=CN"
  },
  {
    id: "artist-6",
    name: "Quantum Waves",
    image: "https://via.placeholder.com/200?text=QW"
  }
];

// Albums
export const albums: Album[] = [
  {
    id: "album-1",
    title: "Neon Dreams",
    artist: artists[0],
    coverImage: "https://via.placeholder.com/300/0088ff/ffffff?text=Neon+Dreams",
    releaseDate: "2025-02-15",
    isNew: true
  },
  {
    id: "album-2",
    title: "Digital Horizons",
    artist: artists[1],
    coverImage: "https://via.placeholder.com/300/00ffaa/000000?text=Digital+Horizons",
    releaseDate: "2025-01-22",
    isNew: true
  },
  {
    id: "album-3",
    title: "Synthwave Nights",
    artist: artists[2],
    coverImage: "https://via.placeholder.com/300/ff00ff/ffffff?text=Synthwave+Nights",
    releaseDate: "2024-12-10",
    isNew: false
  },
  {
    id: "album-4",
    title: "Future Nostalgia",
    artist: artists[3],
    coverImage: "https://via.placeholder.com/300/00ffff/000000?text=Future+Nostalgia",
    releaseDate: "2024-11-05",
    isNew: false
  },
  {
    id: "album-5",
    title: "Cyber Punk",
    artist: artists[4],
    coverImage: "https://via.placeholder.com/300/ff0088/ffffff?text=Cyber+Punk",
    releaseDate: "2024-10-20",
    isNew: false
  },
  {
    id: "album-6",
    title: "Electric Dreams",
    artist: artists[5],
    coverImage: "https://via.placeholder.com/300/ffff00/000000?text=Electric+Dreams",
    releaseDate: "2025-03-01",
    isNew: true
  },
  {
    id: "album-7",
    title: "Hologram Sunset",
    artist: artists[0],
    coverImage: "https://via.placeholder.com/300/ff8800/000000?text=Hologram+Sunset",
    releaseDate: "2024-09-12",
    isNew: false
  },
  {
    id: "album-8",
    title: "Quantum Beats",
    artist: artists[2],
    coverImage: "https://via.placeholder.com/300/0044ff/ffffff?text=Quantum+Beats",
    releaseDate: "2024-08-30",
    isNew: false
  }
];

// Tracks
const createTracks = (): Track[] => {
  const tracks: Track[] = [];
  
  albums.forEach(album => {
    // Create 5-8 tracks for each album
    const trackCount = Math.floor(Math.random() * 4) + 5;
    
    for (let i = 1; i <= trackCount; i++) {
      tracks.push({
        id: `track-${album.id}-${i}`,
        title: `Track ${i}`,
        artist: album.artist,
        album: album,
        duration: Math.floor(Math.random() * 180) + 120, // 2-5 minutes
        isExplicit: Math.random() > 0.8
      });
    }
  });
  
  return tracks;
};

export const tracks: Track[] = createTracks();

// Playlists
export const playlists: Playlist[] = [
  {
    id: "playlist-1",
    name: "Synthwave Nights",
    coverImage: "https://via.placeholder.com/300/9900ff/ffffff?text=Synthwave+Nights",
    description: "The best synthwave tracks to fuel your night coding sessions",
    tracks: tracks.slice(0, 15),
    owner: "Nebula Music"
  },
  {
    id: "playlist-2",
    name: "Cyberpunk Essentials",
    coverImage: "https://via.placeholder.com/300/ff0066/ffffff?text=Cyberpunk+Essentials",
    description: "Dystopian future vibes and digital landscapes",
    tracks: tracks.slice(10, 25),
    owner: "Nebula Music"
  },
  {
    id: "playlist-3",
    name: "Ambient Space",
    coverImage: "https://via.placeholder.com/300/00ddff/000000?text=Ambient+Space",
    description: "Atmospheric sounds for deep focus and relaxation",
    tracks: tracks.slice(5, 20),
    owner: "Nebula Music"
  }
];

// New Releases
export const newReleases = albums.filter(album => album.isNew);

// Recommended for you
export const recommendedForYou = tracks.slice(0, 10);

// Featured Playlists
export const featuredPlaylists = playlists;
