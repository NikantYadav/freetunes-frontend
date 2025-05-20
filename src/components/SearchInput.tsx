
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchInput = ({ onSearch, placeholder = "Search for artists, songs, or podcasts" }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto relative"
    >
      <div className="relative">
        <Search 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-3 pl-12 pr-10 rounded-full bg-white/10 border border-white/10 focus:outline-none focus:border-neon focus:ring-0 text-white"
          aria-label="Search"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div 
        className="absolute bottom-0 left-12 right-12 h-0.5 bg-neon transition-all duration-300" 
        style={{ 
          width: isFocused || searchQuery ? '80%' : '0%',
          opacity: isFocused || searchQuery ? 1 : 0,
          left: '10%'
        }}
      />
    </form>
  );
};

export default SearchInput;
