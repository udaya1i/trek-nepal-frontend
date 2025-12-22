'use client';

import React from 'react';
import ProviderCard, { Provider } from './ProviderCard';
 
interface ProviderGridProps {
  providers: Provider[];
  isLoading: boolean;
}

const ProviderGrid = ({ providers, isLoading }: ProviderGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-56 bg-muted" />
            <div className="p-5 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-6 bg-muted rounded w-16" />
                <div className="h-6 bg-muted rounded w-16" />
                <div className="h-6 bg-muted rounded w-16" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-8 bg-muted rounded w-20" />
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-muted rounded-lg" />
                  <div className="w-10 h-10 bg-muted rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
          No Results Found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn&apos;t find any providers matching your filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProviderGrid;