import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 
import NotificationBell from './NotificationBell';
import Icon from 'components/ui/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

interface HeaderProps {
  isAuthenticated?: boolean;
  userAvatar?: string;
  userName?: string;
  onLogout?: () => void;
}

const Header = ({
  isAuthenticated = false,
  userAvatar,
  userName,
  onLogout,
}: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems: NavigationItem[] = [
    { label: 'Treks', path: '/trek-listing', icon: 'MapIcon' },
    { label: 'Community', path: '/story-feed-community', icon: 'UserGroupIcon' },
    { label: 'Services', path: '/hotel-guide-listing', icon: 'BuildingOfficeIcon' },
  ];

  const isActivePath = (path: string) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(path)
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/trek-listing?search=${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border">
      <nav className="h-[70px] flex items-center justify-between px-4 lg:px-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Mountain" size={22} className="text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-xl hidden sm:block">
            Nepal Trek Explorer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navigationItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 bg-card border rounded-md px-3 py-2 w-64"
          >
            <Icon name="Search" size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </form>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted"
          >
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          <NotificationBell />

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {userName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-md shadow-lg">
                  <Link
                    to="/user-profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <Icon name="User" size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left"
                  >
                    <Icon name="LogOut" size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login-register">
              <Button size="sm">Login</Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden p-4 border-t bg-background">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 border-t bg-background">
          <nav className="flex flex-col gap-2">
            {navigationItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
