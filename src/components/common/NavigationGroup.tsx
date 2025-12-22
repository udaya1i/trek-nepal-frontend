import Icon from 'components/ui/AppIcon';
import React from 'react';
 
interface NavigationGroupProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const NavigationGroup = ({
  title,
  isExpanded,
  onToggle,
  children,
}: NavigationGroupProps) => {
  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth caption uppercase tracking-wider"
      >
        <span>{title}</span>
        <Icon
          name="ChevronDown"
          size={14}
          className={`transition-transform duration-250 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`space-y-1 overflow-hidden transition-all duration-250 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default NavigationGroup;