'use client';

import React, { useState, useRef, useEffect } from 'react';
 import Icon from 'components/ui/AppIcon';
import AppImage from 'components/ui/AppImage';
import { Link } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  avatar: string;
  isAuthenticated: boolean;
}

const UserAvatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userData: UserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar.jpg',
    isAuthenticated: true,
  };

  const menuItems = [
    { label: 'Profile', icon: 'UserIcon', path: '/profile' },
    { label: 'My Treks', icon: 'MapIcon', path: '/my-treks' },
    { label: 'Saved', icon: 'BookmarkIcon', path: '/saved' },
    { label: 'Settings', icon: 'Cog6ToothIcon', path: '/settings' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    console.log('Logout clicked');
  };

  if (!userData.isAuthenticated) {
    return (
      <Link
        to="/login"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 p-1 rounded-xl hover:bg-muted transition-smooth"
        aria-label="User menu"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
          <AppImage
            src={userData.avatar}
            alt={userData.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`text-muted-foreground transition-smooth hidden sm:block ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-xl shadow-warm-lg overflow-hidden z-[200]">
          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="font-medium text-foreground truncate">{userData.name}</div>
            <div className="text-sm text-muted-foreground truncate">{userData.email}</div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth"
              >
                <Icon name={item.icon as any} size={20} className="text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth text-left"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} className="text-muted-foreground" />
              <span className="text-foreground">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;