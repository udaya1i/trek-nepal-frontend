import React, { useState } from 'react';
 import type { MockCredentials } from '../types';
import Icon from 'components/ui/AppIcon';

interface CredentialsInfoProps {
  credentials: MockCredentials[];
}

const CredentialsInfo = ({ credentials }: CredentialsInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 p-4 md:p-6 rounded-lg bg-accent/10 border border-accent/20">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <Icon name="Info" size={20} className="text-accent" />
          <span className="text-sm font-medium text-foreground">
            Demo Credentials Available
          </span>
        </div>
        <Icon
          name="ChevronDown"
          size={18}
          className={`text-accent transition-transform duration-250 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-250 ${
          isExpanded ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <div className="space-y-3">
          {credentials.map((cred, index) => (
            <div
              key={index}
              className="p-3 rounded-md bg-background border border-border"
            >
              <p className="text-xs font-medium text-foreground mb-2">
                {cred.name} ({cred.role})
              </p>
              <div className="space-y-1 text-xs caption">
                <p className="text-muted-foreground">
                  <span className="font-medium">Email:</span> {cred.email}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Password:</span> {cred.password}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredentialsInfo;