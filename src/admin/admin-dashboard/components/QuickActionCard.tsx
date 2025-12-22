import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuickAction } from '../types';
import Icon from 'components/ui/AppIcon';

interface QuickActionCardProps {
  action: QuickAction;
}

const QuickActionCard = ({ action }: QuickActionCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(action.path)}
      className="w-full min-w-0 bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary hover:shadow-elevation-3 transition-smooth text-left group"
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-smooth`}
        >
          <Icon name={action.icon} size={20} className="md:w-6 md:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1 line-clamp-1">
            {action.title}
          </h3>
          <p className="text-sm text-muted-foreground caption line-clamp-2 mb-3">
            {action.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl md:text-3xl font-bold text-foreground data-text whitespace-nowrap">
              {action.count}
            </span>
            <Icon
              name="ArrowRight"
              size={18}
              className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth"
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;