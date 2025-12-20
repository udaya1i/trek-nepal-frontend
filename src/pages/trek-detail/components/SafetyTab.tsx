import Icon from "../../../components/AppIcon";
import { SafetyAlert, WeatherData } from "../types";

interface SafetyTabProps {
  safetyAlerts: SafetyAlert[];
  weather: WeatherData[];
}

const SafetyTab = ({ safetyAlerts, weather }: SafetyTabProps) => {
  const alertConfig = {
    warning: { color: "text-warning", bg: "bg-warning/10", icon: "AlertTriangle" },
    info: { color: "text-primary", bg: "bg-primary/10", icon: "Info" },
    danger: { color: "text-error", bg: "bg-error/10", icon: "AlertCircle" },
  };

  const emergencyContacts = [
    { name: "Nepal Police", number: "100", icon: "Phone" },
    { name: "Tourist Police", number: "1144", icon: "Shield" },
    { name: "Ambulance", number: "102", icon: "Ambulance" },
    { name: "Fire Brigade", number: "101", icon: "Flame" },
  ];

  const safetyTips = [
    "Always trek with a registered guide or porter",
    "Carry adequate travel and medical insurance",
    "Acclimatize properly to prevent altitude sickness",
    "Stay hydrated and maintain proper nutrition",
    "Inform someone about your trekking plans",
    "Carry emergency communication devices",
    "Check weather forecasts before starting",
    "Respect local customs and environment",
  ];

  return (
    <div className="space-y-6">
      {safetyAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            Current Alerts
          </h3>
          {safetyAlerts.map((alert) => {
            const config = alertConfig[alert.type];
            return (
              <div
                key={alert.id}
                className={`${config.bg} border-l-4 ${config.color.replace("text-", "border-")} p-4 rounded-lg`}
              >
                <div className="flex items-start gap-3">
                  <Icon name={config.icon} size={20} className={config.color} />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold ${config.color} mb-1`}>{alert.title}</h4>
                    <p className="text-sm text-foreground mb-2">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Cloud" size={20} className="text-primary" />
          Weather Forecast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {weather.map((day, index) => (
            <div
              key={index}
              className="bg-muted rounded-lg p-4 text-center hover:bg-muted/80 transition-colors duration-200"
            >
              <p className="text-sm font-medium text-foreground mb-2">{day.day}</p>
              <Icon name={day.icon} size={32} className="text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground mb-1">{day.temp}</p>
              <p className="text-xs text-muted-foreground mb-1">{day.condition}</p>
              <p className="text-xs text-muted-foreground">{day.precipitation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Phone" size={20} className="text-primary" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, index) => (
            <a
              key={index}
              href={`tel:${contact.number}`}
              className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={contact.icon} size={20} className="text-error" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.number}</p>
              </div>
              <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Shield" size={20} className="text-primary" />
          Safety Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {safetyTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={18} className="text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Medical Facilities</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Medical facilities are available at major stops along the trek. However, facilities
              may be basic in remote areas. Carry a comprehensive first aid kit and any personal
              medications.
            </p>
            <p className="text-sm text-muted-foreground">
              For serious emergencies, helicopter evacuation services are available. Ensure your
              travel insurance covers high-altitude rescue and evacuation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTab;