
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Library, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, to, isActive = false }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center p-2 transition-all",
        isActive 
          ? "text-neon" 
          : "text-gray-400 hover:text-neon"
      )}
      aria-label={label}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

interface MobileNavigationProps {
  activePath: string;
}

const MobileNavigation = ({ activePath }: MobileNavigationProps) => {
  return (
    <div className="fixed bottom-[70px] left-0 right-0 md:hidden z-10 glass border-t border-white/5">
      <div className="flex justify-around items-center py-2">
        <NavItem 
          icon={<Home size={20} />} 
          label="Home" 
          to="/" 
          isActive={activePath === '/'} 
        />
        <NavItem 
          icon={<Search size={20} />} 
          label="Search" 
          to="/search" 
          isActive={activePath === '/search'} 
        />
        <NavItem 
          icon={<Library size={20} />} 
          label="Library" 
          to="/library" 
          isActive={activePath === '/library'} 
        />
        <NavItem 
          icon={<User size={20} />} 
          label="Profile" 
          to="/profile" 
          isActive={activePath === '/profile'} 
        />
      </div>
    </div>
  );
};

export default MobileNavigation;
