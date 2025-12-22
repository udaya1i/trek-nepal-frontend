import React from 'react';
import { IncidentReport, AlertSeverity } from '../types';
import Icon from 'components/ui/AppIcon';

interface RecentIncidentsCardProps {
  incidents: IncidentReport[];
  onViewDetails: (incident: IncidentReport) => void;
}

const RecentIncidentsCard = ({ incidents, onViewDetails }: RecentIncidentsCardProps) => {
  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      case 'low':
        return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'investigating':
        return 'bg-accent/10 text-accent';
      case 'resolved':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold">Recent Incident Reports</h3>
        <p className="text-sm text-muted-foreground caption mt-1">
          Latest safety incidents requiring attention
        </p>
      </div>

      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {incidents.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-3" />
            <p className="text-sm text-muted-foreground caption">No recent incidents reported</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 hover:bg-muted/30 transition-smooth cursor-pointer"
              onClick={() => onViewDetails(incident)}
            >
              <div className="flex items-start gap-3">
                <Icon
                  name="AlertCircle"
                  size={20}
                  className={`flex-shrink-0 mt-0.5 ${getSeverityColor(incident.severity)}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-medium text-foreground line-clamp-1">
                      {incident.title}
                    </h4>
                    <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground caption line-clamp-2 mb-2">
                    {incident.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground caption">
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      {incident.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {new Date(incident.reportedAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentIncidentsCard;