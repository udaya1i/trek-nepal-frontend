import Icon from "../../../components/ui/AppIcon";
import TrekStats from "./TrekStats";
import { Trek } from "../types";

interface OverviewTabProps {
  trek: Trek;
}

const OverviewTab = ({ trek }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">About This Trek</h2>
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {trek.longDescription}
        </p>
      </div>

      <TrekStats stats={trek.stats} />

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="FileText" size={20} className="text-primary" />
          Required Permits
        </h3>
        <div className="space-y-4">
          {trek.permits.map((permit, index) => (
            <div key={index} className="border-l-4 border-primary pl-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-medium text-foreground">{permit.name}</h4>
                <span className="text-primary font-semibold whitespace-nowrap">
                  {permit.cost}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{permit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Backpack" size={20} className="text-primary" />
          Packing List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trek.packingList.map((category, index) => (
            <div key={index}>
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} className="text-success" />
                {category.category}
              </h4>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;