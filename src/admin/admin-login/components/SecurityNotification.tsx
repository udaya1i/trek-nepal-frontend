import React from 'react';

import Icon from 'components/ui/AppIcon';
import Image from 'components/ui/AppImage';
const SecurityNotice = () => {
  return (
    <div className="mt-8 p-4 md:p-6 rounded-lg bg-muted/50 border border-border">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="ShieldCheck" size={20} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-2">
            Secure Admin Access
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground caption">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={14} className="flex-shrink-0 mt-0.5 text-success" />
              <span>256-bit SSL encryption for all data transmission</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={14} className="flex-shrink-0 mt-0.5 text-success" />
              <span>Session timeout after 30 minutes of inactivity</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={14} className="flex-shrink-0 mt-0.5 text-success" />
              <span>All login attempts are logged and monitored</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;