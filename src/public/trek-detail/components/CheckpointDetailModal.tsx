import { useEffect } from 'react';
import Icon from '../../../components/ui/AppIcon';
import { Checkpoint } from '../types';

interface CheckpointDetailModalProps {
  checkpoint: Checkpoint | null;
  onClose: () => void;
}

const typeLabels: Record<Checkpoint['type'], string> = {
  village: 'Village',
  viewpoint: 'Viewpoint',
  pass: 'Mountain Pass',
  glacier: 'Glacier',
  religious_site: 'Religious Site',
  settlement: 'Settlement',
  base_camp: 'Base Camp',
};

const significanceLabels: Record<string, { label: string; color: string }> = {
  acclimatization: { label: 'Acclimatization Stop', color: 'bg-blue-100 text-blue-800' },
  cultural_hub: { label: 'Cultural Hub', color: 'bg-purple-100 text-purple-800' },
  scenic_highlight: { label: 'Scenic Highlight', color: 'bg-green-100 text-green-800' },
  logistical_stop: { label: 'Logistical Stop', color: 'bg-gray-100 text-gray-800' },
  religious_site: { label: 'Religious Site', color: 'bg-orange-100 text-orange-800' },
  base_camp_access: { label: 'Base Camp Access', color: 'bg-red-100 text-red-800' },
  achievement_point: { label: 'Achievement Point', color: 'bg-yellow-100 text-yellow-800' },
  medical_facility: { label: 'Medical Facility', color: 'bg-teal-100 text-teal-800' },
};

const CheckpointDetailModal = ({ checkpoint, onClose }: CheckpointDetailModalProps) => {
  useEffect(() => {
    if (checkpoint) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [checkpoint]);

  if (!checkpoint) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{checkpoint.name}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                <Icon name="MapPin" size={14} />
                {typeLabels[checkpoint.type]}
              </span>
              <span className="text-gray-400">•</span>
              <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                <Icon name="Mountain" size={14} />
                {checkpoint.altitude}m
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0 ml-4"
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {checkpoint.photos && checkpoint.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checkpoint.photos.map((photo) => (
                <div key={photo.id} className="relative rounded-lg overflow-hidden group">
                  <img
                    src={photo.url}
                    alt={photo.alt_text}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Place</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{checkpoint.short_description}</p>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{checkpoint.long_description}</p>
          </div>

          {checkpoint.significance && checkpoint.significance.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Icon name="Info" size={20} className="text-blue-600" />
                Why This Checkpoint Matters
              </h3>
              <div className="flex flex-wrap gap-2">
                {checkpoint.significance.map((sig) => {
                  const sigInfo = significanceLabels[sig] || { label: sig, color: 'bg-gray-100 text-gray-800' };
                  return (
                    <span
                      key={sig}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${sigInfo.color}`}
                    >
                      <Icon name="CheckCircle2" size={14} />
                      {sigInfo.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="Info" size={20} className="text-blue-600" />
                Practical Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="Wifi" size={18} className={checkpoint.has_wifi ? 'text-green-600' : 'text-gray-400'} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">WiFi</p>
                    <p className="text-sm text-gray-600">
                      {checkpoint.has_wifi ? checkpoint.wifi_cost || 'Available' : 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon name="Zap" size={18} className={checkpoint.has_charging ? 'text-green-600' : 'text-gray-400'} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Device Charging</p>
                    <p className="text-sm text-gray-600">
                      {checkpoint.has_charging ? checkpoint.charging_cost || 'Available' : 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon name="Droplets" size={18} className={checkpoint.has_hot_shower ? 'text-green-600' : 'text-gray-400'} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Hot Shower</p>
                    <p className="text-sm text-gray-600">
                      {checkpoint.has_hot_shower ? checkpoint.shower_cost || 'Available' : 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon name="Banknote" size={18} className={checkpoint.has_atm ? 'text-green-600' : 'text-red-600'} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">ATM</p>
                    <p className="text-sm text-gray-600">
                      {checkpoint.has_atm
                        ? checkpoint.atm_notes || 'ATM available'
                        : checkpoint.atm_notes || 'No ATM - bring cash'}
                    </p>
                  </div>
                </div>

                {checkpoint.typical_night_temp && (
                  <div className="flex items-start gap-3">
                    <Icon name="ThermometerSun" size={18} className="text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Night Temperature</p>
                      <p className="text-sm text-gray-600">{checkpoint.typical_night_temp}</p>
                    </div>
                  </div>
                )}

                {checkpoint.best_time_to_visit && (
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={18} className="text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Best Time to Visit</p>
                      <p className="text-sm text-gray-600">{checkpoint.best_time_to_visit}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {checkpoint.activities && checkpoint.activities.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={20} className="text-blue-600" />
                  Things to Do
                </h3>
                <div className="space-y-4">
                  {checkpoint.activities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <h4 className="font-medium text-gray-900 flex-1">{activity.name}</h4>
                        {activity.difficulty && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            activity.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            activity.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {activity.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      {activity.duration && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {activity.duration}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckpointDetailModal;
