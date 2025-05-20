
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, User, ListMusic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
  expanded: boolean;
}

const NavItem = ({ icon, label, to, isActive = false, expanded }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center p-3 mb-2 rounded-md transition-all hover-glow",
        isActive 
          ? "text-neon bg-white/5" 
          : "text-gray-400 hover:text-neon hover:bg-white/5"
      )}
      aria-label={label}
    >
      <div className="mr-3">{icon}</div>
      {expanded && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

interface SidebarProps {
  activePath: string;
}

const Sidebar = ({ activePath }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  const recentPlaylists = [
    { id: '1', name: 'Synthwave Nights' },
    { id: '2', name: 'Cyberpunk Essentials' },
    { id: '3', name: 'Ambient Space' },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full hidden md:flex flex-col glass-dark z-20 transition-all duration-300",
      expanded ? "w-64" : "w-20"
    )}>
      <div className="p-5 flex items-center justify-between border-b border-white/5">
        <h1 className={cn(
          "font-bold text-xl neon-text",
          expanded ? "block" : "hidden"
        )}>NEBULAFY</h1>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full hover:bg-white/10 text-neon"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? "←" : "→"}
        </button>
      </div>
      
      <div className="p-3 flex-1 overflow-y-auto">
        <nav>
          <NavItem 
            icon={<Home size={20} />} 
            label="Home" 
            to="/" 
            isActive={activePath === '/'} 
            expanded={expanded}
          />
          <NavItem 
            icon={<Search size={20} />} 
            label="Search" 
            to="/search" 
            isActive={activePath === '/search'} 
            expanded={expanded}
          />
          <NavItem 
            icon={<Library size={20} />} 
            label="Library" 
            to="/library" 
            isActive={activePath === '/library'} 
            expanded={expanded}
          />
          <NavItem 
            icon={<User size={20} />} 
            label="Profile" 
            to="/profile" 
            isActive={activePath === '/profile'} 
            expanded={expanded}
          />
        </nav>
        
        {expanded && (
          <div className="mt-8">
            <h3 className="text-xs uppercase text-gray-500 font-bold mb-3">Recent Playlists</h3>
            <div>
              {recentPlaylists.map((playlist) => (
                <Link 
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="flex items-center p-2 rounded-md text-gray-400 hover:text-neon hover:bg-white/5"
                >
                  <ListMusic size={16} className="mr-3" />
                  <span className="text-sm truncate">{playlist.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
