import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./AppIcon";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems: NavigationItem[] = [
    { label: "Discover", path: "/trek-listing", icon: "Mountain" },
    { label: "Community", path: "/story-feed-community", icon: "Users" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/trek-listing?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-[1000]">
      <nav className="h-[60px] flex items-center justify-between pr-4">
        <div className="flex items-center gap-6">
          <Link
            to="/landing-home"
            className="flex items-center gap-2 px-4 hover:opacity-80 transition-opacity duration-200"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M16 4L4 14L6 14L6 26L14 26L14 18L18 18L18 26L26 26L26 14L28 14L16 4Z"
                fill="var(--color-primary)"
              />
              <path
                d="M16 2L14.5 3.5L8 10L8 12L10 12L10 24L12 24L12 16L20 16L20 24L22 24L22 12L24 12L24 10L17.5 3.5L16 2Z"
                fill="var(--color-secondary)"
              />
            </svg>
            <span className="font-heading font-semibold text-lg text-primary hidden sm:inline">
              Nepal Trek Explorer
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "text-primary bg-primary/10" :"text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 bg-card border border-border rounded-md px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-ring transition-all duration-200"
          >
            <Icon name="Search" size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
          </form>

          <button
            onClick={toggleSearch}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors duration-200"
            aria-label="Toggle search"
          >
            <Icon name="Search" size={20} />
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center gap-2 p-1 hover:bg-muted rounded-md transition-colors duration-200"
                aria-label="User menu"
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName || "User"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
                    {userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-[999] overflow-hidden">
                  <Link
                    to="/user-profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors duration-200"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <Icon name="User" size={18} />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors duration-200 text-left"
                  >
                    <Icon name="LogOut" size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login-register">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>
          )}

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-background border-b border-border p-4 z-[1100]">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="default" size="sm">
              Search
            </Button>
          </form>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-background border-b border-border z-[1200]">
          <div className="flex flex-col p-4 gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "text-primary bg-primary/10" :"text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;