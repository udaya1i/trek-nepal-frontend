import Icon from '../../../components/ui/AppIcon';
import { Checkpoint } from '../types';

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  isOvernight?: boolean;
  isHighlight?: boolean;
  notes?: string;
  onClick: () => void;
}

const typeIcons: Record<Checkpoint['type'], string> = {
  village: '🏘️',
  viewpoint: '🔭',
  pass: '⛰️',
  glacier: '🧊',
  religious_site: '🕉️',
  settlement: '🏠',
  base_camp: '⛺',
};

const CheckpointCard = ({
  checkpoint,
  isOvernight = false,
  isHighlight = false,
  notes,
  onClick
}: CheckpointCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">
          {typeIcons[checkpoint.type]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {checkpoint.name}
            </h4>
            {isHighlight && (
              <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {checkpoint.short_description}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Icon name="Mountain" size={12} />
              {checkpoint.altitude}m
            </span>
            {checkpoint.typical_night_temp && (
              <span>🌡️ {checkpoint.typical_night_temp}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {isOvernight && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                🌙 Overnight Stop
              </span>
            )}
            {checkpoint.has_wifi && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                📶 WiFi
              </span>
            )}
            {checkpoint.has_atm && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                💳 ATM
              </span>
            )}
          </div>

          {notes && (
            <div className="flex items-start gap-2 mt-2 p-2 bg-amber-50 border-l-2 border-amber-400 rounded">
              <Icon name="Info" size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">{notes}</p>
            </div>
          )}

          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
            <Icon name="MapPin" size={12} />
            Click for detailed information
          </p>
        </div>
      </div>
    </button>
  );
};

export default CheckpointCard;
