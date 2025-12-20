import React from 'react';
 
import * as LucideIcons from 'lucide-react';
import {
  HelpCircle,
  LucideProps
} from 'lucide-react';

import * as HeroIconsOutline from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'; 
type IconLibrary = 'lucide' | 'hero';
type HeroVariant = 'outline' | 'solid';

interface IconProps {
  name: string;
  library?: IconLibrary;
  variant?: HeroVariant;

  size?: number;
  color?: string;
  strokeWidth?: number;

  className?: string;
  onClick?: () => void;
  disabled?: boolean;

  [key: string]: any;
}
 
const toPascalCase = (value: string) =>
  value
    .split('-')
    .map(v => v.charAt(0).toUpperCase() + v.slice(1))
    .join('');
 
function Icon({
  name,
  library = 'lucide',
  variant = 'outline',

  size = 24,
  color = 'currentColor',
  strokeWidth = 2,

  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  const isClickable = !!onClick && !disabled;
  const cursorClass = isClickable
    ? 'cursor-pointer hover:opacity-80'
    : disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  /* =======================
     LUCIDE ICONS
  ======================= */
  if (library === 'lucide') {
    const formattedName = toPascalCase(name);
    const LucideIcon =
      LucideIcons[formattedName as keyof typeof LucideIcons] as
        | React.ComponentType<LucideProps>
        | undefined;

    if (!LucideIcon) {
      return (
        <HelpCircle
          size={size}
          color="gray"
          strokeWidth={strokeWidth}
          className={`${cursorClass} ${className}`}
        />
      );
    }

    return (
      <LucideIcon
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={`${cursorClass} ${className}`}
        onClick={disabled ? undefined : onClick}
        {...props}
      />
    );
  }

  /* =======================
     HERO ICONS
  ======================= */
  const iconSet =
    variant === 'solid' ? HeroIconsSolid : HeroIconsOutline;

  const HeroIcon =
    iconSet[name as keyof typeof iconSet] as
      | React.ComponentType<any>
      | undefined;

  if (!HeroIcon) {
    return (
      <QuestionMarkCircleIcon
        width={size}
        height={size}
        className={`${cursorClass} text-gray-400 ${className}`}
      />
    );
  }

  return (
    <HeroIcon
      width={size}
      height={size}
      className={`${cursorClass} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    />
  );
}

export default Icon;
