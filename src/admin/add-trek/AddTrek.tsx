import { useState } from 'react';
import { Check } from 'lucide-react'; 
import { DifficultyLevel, Permit, TrekFormData, TrekItinerary, TrekPacking, TrekStatus, TrekWaypoint } from './types';
import { BasicInfoSection } from './components/BasicInfoSection';
import { ItinerarySection } from './components/ItinerarySection';
import { WaypointSection } from './components/WaypointSectionProps';
import { PackingSection } from './components/PackingSection';
import { PermitSection } from './components/PermitSection';
import Button from 'components/ui/Button';
import AdminHeader from 'components/admin-components/AdminHeader';
import AdminSidebar from 'components/admin-components/AdminSidebar';


interface Step {
  id: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  { id: 'basic', title: 'Basic Details', description: 'Trek information' },
  { id: 'itinerary', title: 'Itinerary', description: 'Daily schedule' },
  { id: 'waypoints', title: 'Waypoints', description: 'Key locations' },
  { id: 'permits', title: 'Permits', description: 'Required permits' },
  { id: 'packing', title: 'Packing', description: 'Essential items' },
];

export const AddTrek = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [basicInfo, setBasicInfo] = useState<TrekFormData>({
    name: '',
    subtitle: '',
    difficultyLevel: '',
    durationDays: '',
    maxAltitude: '',
    totalDistance: '',
    bestSeason: '',
    aboutTrek: '',
    startPoint: '',
    endPoint: '',
    highestPoint: '',
    lowestPoint: '',
    province: '',
    district: '',
    localLevel: '',
    totalAscent: '',
    totalDescent: '',
    region: '',
  });

  const [itineraries, setItineraries] = useState<TrekItinerary[]>([]);
  const [waypoints, setWaypoints] = useState<TrekWaypoint[]>([]);
  const [permits, setPermits] = useState<Permit[]>([]);
  const [packingLists, setPackingLists] = useState<TrekPacking[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const trekId = 1;

  const handleBasicInfoChange = (field: keyof TrekFormData, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateBasicInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!basicInfo.name.trim()) newErrors.name = 'Trek name is required';
    if (!basicInfo.difficultyLevel) newErrors.difficultyLevel = 'Difficulty level is required';
    if (!basicInfo.durationDays.trim()) newErrors.durationDays = 'Duration is required';
    if (!basicInfo.maxAltitude) newErrors.maxAltitude = 'Maximum altitude is required';
    if (!basicInfo.totalDistance) newErrors.totalDistance = 'Total distance is required';
    if (!basicInfo.bestSeason.trim()) newErrors.bestSeason = 'Best season is required';
    if (!basicInfo.aboutTrek.trim()) newErrors.aboutTrek = 'Trek description is required';
    if (!basicInfo.startPoint.trim()) newErrors.startPoint = 'Starting point is required';
    if (!basicInfo.endPoint.trim()) newErrors.endPoint = 'End point is required';
    if (!basicInfo.highestPoint) newErrors.highestPoint = 'Highest point is required';
    if (!basicInfo.lowestPoint) newErrors.lowestPoint = 'Lowest point is required';
    if (!basicInfo.province.trim()) newErrors.province = 'Province is required';
    if (!basicInfo.district.trim()) newErrors.district = 'District is required';
    if (!basicInfo.localLevel.trim()) newErrors.localLevel = 'Local level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && !validateBasicInfo()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === 0 || completedSteps.includes(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      basicInfo,
      itineraries,
      waypoints,
      permits,
      packingLists,
    };
    localStorage.setItem('trek-draft', JSON.stringify(draftData));
    alert('Draft saved successfully!');
  };

  const handlePublish = () => {
    if (!validateBasicInfo()) {
      alert('Please complete the basic information before publishing');
      return;
    }

    const trekData = {
      id: trekId,
      ...basicInfo,
      difficultyLevel: basicInfo.difficultyLevel as DifficultyLevel,
      durationDays: basicInfo.durationDays,
      maxAltitude: parseInt(basicInfo.maxAltitude),
      totalDistance: parseFloat(basicInfo.totalDistance),
      highestPoint: parseInt(basicInfo.highestPoint),
      lowestPoint: parseInt(basicInfo.lowestPoint),
      totalAscent: basicInfo.totalAscent ? parseInt(basicInfo.totalAscent) : undefined,
      totalDescent: basicInfo.totalDescent ? parseInt(basicInfo.totalDescent) : undefined,
      status: TrekStatus.PUBLISHED,
      itineraries,
      waypoints,
      permits,
      packingLists,
    };

    console.log('Publishing trek:', trekData);
    alert('Trek published successfully!');
    localStorage.removeItem('trek-draft');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoSection
            formData={basicInfo}
            onChange={handleBasicInfoChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <ItinerarySection
            trekId={trekId}
            itineraries={itineraries}
            onChange={setItineraries}
          />
        );
      case 2:
        return (
          <WaypointSection
            trekId={trekId}
            waypoints={waypoints}
            onChange={setWaypoints}
          />
        );
      case 3:
        return (
          <PermitSection
            trekId={trekId}
            permits={permits}
            onChange={setPermits}
          />
        );
      case 4:
        return (
          <PackingSection
            trekId={trekId}
            packingLists={packingLists}
            onChange={setPackingLists}
          />
        );
      default:
        return null;
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (

      <div className="min-h-screen bg-background">
      <AdminHeader
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userName="Safety Coordinator"
        userRole="Emergency Response Team"
        notificationCount={3}
        userAvatar="/default-avatar.png"
      />

      <AdminSidebar

        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userRole="admin"
      />
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Trek</h1>
          <p className="text-gray-600 mt-2">Create a comprehensive trek listing with all necessary details</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1">
                <div className="flex items-center">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={index > 0 && !completedSteps.includes(index - 1)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep === index
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : completedSteps.includes(index)
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    } ${
                      index > 0 && !completedSteps.includes(index - 1)
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer hover:border-blue-500'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        completedSteps.includes(index) ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <p className={`text-sm font-medium ${currentStep === index ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          {renderStepContent()}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button variant="outline" onClick={handlePublish}>
              Publish Trek
            </Button>
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

