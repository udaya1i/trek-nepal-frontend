import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';

import Button from '../../../components/ui/Button';
import type { SearchBarProps } from '../types';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-center gap-2 bg-card border rounded-lg transition-all duration-200 ${
        isFocused ? 'ring-2 ring-ring border-ring' : 'border-border'
      }`}>
        <div className="flex-1 flex items-center gap-2 px-4">
          <Icon name="Search" size={20} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search stories, treks, or authors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none py-3 text-sm placeholder:text-muted-foreground"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="sm"
          className="mr-2"
          iconName="Search"
        >
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;