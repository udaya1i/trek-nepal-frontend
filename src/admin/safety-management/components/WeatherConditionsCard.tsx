import React from 'react';
import { WeatherCondition } from '../types';
import Icon from 'components/ui/AppIcon';

interface WeatherConditionsCardProps {
  conditions: WeatherCondition[];
  onRefresh: () => void;
}

const WeatherConditionsCard = ({ conditions, onRefresh }: WeatherConditionsCardProps) => {
  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain') || lower.includes('storm')) return 'CloudRain';
    if (lower.includes('snow')) return 'Snowflake';
    if (lower.includes('cloud')) return 'Cloud';
    if (lower.includes('clear') || lower.includes('sunny')) return 'Sun';
    return 'CloudSun';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold">Weather Conditions</h3>
          <p className="text-sm text-muted-foreground caption mt-1">
            Current weather across trekking regions
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-muted rounded-md transition-smooth focus-ring"
          title="Refresh weather data"
        >
          <Icon name="RefreshCw" size={18} />
        </button>
      </div>

      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {conditions.map((weather) => (
          <div key={weather.id} className="p-4 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name={getWeatherIcon(weather.condition)} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground">{weather.region}</h4>
                    <p className="text-xs text-muted-foreground caption">{weather.condition}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-heading font-semibold text-foreground whitespace-nowrap">
                      {weather.temperature}°C
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground caption mb-1">Wind</p>
                    <p className="text-foreground font-medium">{weather.windSpeed} km/h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground caption mb-1">Rain</p>
                    <p className="text-foreground font-medium">{weather.precipitation}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground caption mb-1">Visibility</p>
                    <p className="text-foreground font-medium">{weather.visibility}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground caption mb-1">Forecast:</p>
                  <p className="text-xs text-foreground">{weather.forecast}</p>
                </div>

                <p className="text-xs text-muted-foreground caption mt-2">
                  Updated: {new Date(weather.lastUpdated).toLocaleString('en-GB')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherConditionsCard;