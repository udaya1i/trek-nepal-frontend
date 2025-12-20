import Icon from "../../../components/AppIcon";
import { ItineraryDay } from "../types";

interface ItineraryTabProps {
  itinerary: ItineraryDay[];
}

const ItineraryTab = ({ itinerary }: ItineraryTabProps) => {
  return (
    <div className="space-y-4">
      {itinerary.map((day, index) => (
        <div
          key={day.day}
          className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div className="bg-primary/5 border-b border-border p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{day.title}</h3>
                  <p className="text-sm text-muted-foreground">Day {day.day}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  <span>{day.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Route" size={16} />
                  <span>{day.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Mountain" size={16} />
                  <span>{day.altitude}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-foreground leading-relaxed mb-6 whitespace-pre-line">
              {day.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Icon name="Home" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Accommodation</p>
                  <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Icon name="Utensils" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Meals Included</p>
                  <p className="text-sm text-muted-foreground">{day.meals}</p>
                </div>
              </div>
            </div>
          </div>

          {index < itinerary.length - 1 && (
            <div className="flex justify-center py-2">
              <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItineraryTab;