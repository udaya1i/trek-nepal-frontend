import Icon from 'components/ui/AppIcon';
import React, { useState } from 'react';
 
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => !query && setIsExpanded(false)}
          placeholder="Search treks, users, or content..."
          className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-smooth"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-smooth"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {isExpanded && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-3 overflow-hidden z-50 animate-slideDown">
          <div className="p-4">
            <p className="text-sm text-muted-foreground caption mb-3">Quick filters</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 text-foreground rounded-md transition-smooth"
              >
                Treks
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 text-foreground rounded-md transition-smooth"
              >
                Users
              </button>
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 text-foreground rounded-md transition-smooth"
              >
                Content
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;