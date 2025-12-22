import React, { useState } from 'react';
import { SafetyAlert, AlertSeverity, AlertStatus } from '../types';
import Icon from 'components/ui/AppIcon';

interface AlertsTableProps {
  alerts: SafetyAlert[];
  onViewDetails: (alert: SafetyAlert) => void;
  onResolve: (alertId: string) => void;
  onDelete: (alertId: string) => void;
}

const AlertsTable = ({ alerts, onViewDetails, onResolve, onDelete }: AlertsTableProps) => {
  const [sortField, setSortField] = useState<keyof SafetyAlert>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<AlertStatus | 'all'>('all');

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'medium':
        return 'bg-accent text-accent-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case 'active':
        return 'bg-error/10 text-error';
      case 'monitoring':
        return 'bg-warning/10 text-warning';
      case 'resolved':
        return 'bg-success/10 text-success';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return 'Cloud';
      case 'trail_closure':
        return 'Ban';
      case 'landslide':
        return 'AlertTriangle';
      case 'emergency':
        return 'AlertOctagon';
      default:
        return 'Info';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as AlertSeverity | 'all')}
            className="px-3 py-2 text-sm border border-border rounded-md bg-card focus-ring"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as AlertStatus | 'all')}
            className="px-3 py-2 text-sm border border-border rounded-md bg-card focus-ring"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="text-sm text-muted-foreground caption">
          Showing {filteredAlerts.length} of {alerts.length} alerts
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Alert
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Affected
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {filteredAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Icon name={getTypeIcon(alert.type)} size={18} className="text-muted-foreground" />
                    <span className="text-sm capitalize">{alert.type.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{alert.title}</p>
                    <p className="text-xs text-muted-foreground caption line-clamp-1 mt-1">
                      {alert.affectedRegions.join(', ')}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <p className="text-foreground">{alert.affectedTrails.length} trails</p>
                    <p className="text-muted-foreground caption text-xs">{alert.affectedUsers} users</p>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground caption">
                  {new Date(alert.createdAt).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewDetails(alert)}
                      className="p-2 hover:bg-muted rounded-md transition-smooth focus-ring"
                      title="View details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    {alert.status === 'active' && (
                      <button
                        onClick={() => onResolve(alert.id)}
                        className="p-2 hover:bg-success/10 text-success rounded-md transition-smooth focus-ring"
                        title="Mark as resolved"
                      >
                        <Icon name="CheckCircle" size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(alert.id)}
                      className="p-2 hover:bg-error/10 text-error rounded-md transition-smooth focus-ring"
                      title="Delete alert"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsTable;