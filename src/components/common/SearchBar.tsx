import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/ui/AppIcon';

interface SearchResult {
  id: string;
  title: string;
  type: 'trek' | 'service' | 'story';
  subtitle?: string;
}

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = location.pathname;

  const getPlaceholder = () => {
    if (pathname.includes('trek')) return 'Search treks...';
    if (pathname.includes('hotel') || pathname.includes('guide')) return 'Search services...';
    if (pathname.includes('story')) return 'Search stories...';
    return 'Search...';
  };

  /* Close on outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Debounced search */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsLoading(true);

    // Simulated API call
    setTimeout(() => {
      // const mockResults: SearchResult[] = [
      const mockResults: any[] = [
        { id: '1', title: 'Everest Base Camp Trek', type: 'trek', subtitle: '12 days • Moderate' },
        { id: '2', title: 'Annapurna Circuit', type: 'trek', subtitle: '15 days • Challenging' },
        { id: '3', title: 'Mountain View Hotel', type: 'service', subtitle: 'Pokhara • 4.5★' },
        { id: '4', title: 'My Journey to Everest', type: 'story', subtitle: 'By John Doe' },
      ].filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(mockResults);
      setIsLoading(false);
    }, 500);
  };

  const handleSearchClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleResultClick = (result: SearchResult) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsExpanded(false);

    // Optional navigation logic
    if (result.type === 'trek') navigate('/trek-listing');
    if (result.type === 'service') navigate('/hotel-guide-listing');
    if (result.type === 'story') navigate('/story-detail');
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Desktop Search */}
      <div className="hidden md:block">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder={getPlaceholder()}
            className="w-64 h-12 pl-12 pr-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        {!isExpanded ? (
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-lg hover:bg-muted transition"
            aria-label="Search"
          >
            <Icon name="MagnifyingGlassIcon" size={24} />
          </button>
        ) : (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full h-12 pl-12 pr-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        )}
      </div>

      {/* Search Results */}
      {isExpanded && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-lg z-[200] max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map(result => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex gap-3"
                >
                  <Icon
                    name={
                      result.type === 'trek'
                        ? 'MapIcon'
                        : result.type === 'service'
                        ? 'BuildingOfficeIcon'
                        : 'DocumentTextIcon'
                    }
                    size={20}
                    className="text-muted-foreground mt-1"
                  />
                  <div>
                    <div className="font-medium truncate">{result.title}</div>
                    {result.subtitle && (
                      <div className="text-sm text-muted-foreground truncate">
                        {result.subtitle}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
