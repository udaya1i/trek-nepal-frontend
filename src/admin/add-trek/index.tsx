import React, { useState, useEffect } from 'react';
import BasicInfoSection from './components/BasicInfoSection';
import { Save, Eye, Send, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormSection, TrekFormData } from './types';
import RouteDetailsSection from './components/RouteDetailsSection';
import PricingSection from './components/PricingSection';
import SafetySection from './components/SafetySection';
import DescriptionSection from './components/DescriptionSection';
import ItinerarySection from './components/ItinerarySection';
import ImageUploadSection from './components/ImageUploadSection';
import PermitSection from './components/PermitSection';
import AdminSidebar from 'components/admin-components/AdminSidebar';
import FormProgressIndicator from './components/FormProgressIndicator';
import Button from 'components/ui/Button';
import AdminHeader from 'components/admin-components/AdminHeader';

const AddTrek: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('basic-info');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<TrekFormData>({
    name: '',
    region: '',
    difficulty: 'Moderate',
    duration: 0,
    maxAltitude: 0,
    bestSeason: [],
    permitRequired: false,
    route: {
      startPoint: '',
      endPoint: '',
      totalDistance: 0,
      waypoints: [],
    },
    price: {
      min: 0,
      max: 0,
      currency: 'USD',
    },
    safety: {
      riskLevel: 'Medium',
      emergencyContacts: [],
      medicalFacilities: false,
      requiredExperience: '',
    },
    description: '',
    highlights: [],
    requirements: [],
    includedServices: [],
    excludedServices: [],
    itinerary: [],
    images: [],
    permits: [],
    status: 'Draft',
    featured: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<FormSection[]>([
    { id: 'basic-info', title: 'Basic Information', isComplete: false, hasErrors: false },
    { id: 'route-details', title: 'Route Details', isComplete: false, hasErrors: false },
    { id: 'pricing', title: 'Pricing', isComplete: false, hasErrors: false },
    { id: 'safety', title: 'Safety Information', isComplete: false, hasErrors: false },
    { id: 'description', title: 'Description & Details', isComplete: false, hasErrors: false },
    { id: 'itinerary', title: 'Itinerary', isComplete: false, hasErrors: false },
    { id: 'images', title: 'Images', isComplete: false, hasErrors: false },
    { id: 'permits', title: 'Permits', isComplete: false, hasErrors: false },
  ]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('add-trek-draft', JSON.stringify(formData));
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('add-trek-draft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  const handleChange = (field: keyof TrekFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic Information validation
    if (!formData.name?.trim()) newErrors.name = 'Trek name is required';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty level is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (!formData.maxAltitude || formData.maxAltitude <= 0) newErrors.maxAltitude = 'Maximum altitude is required';
    if (!formData.bestSeason || formData.bestSeason.length === 0) newErrors.bestSeason = 'Select at least one season';

    // Route validation
    if (!formData.route?.startPoint?.trim()) newErrors['route.startPoint'] = 'Start point is required';
    if (!formData.route?.endPoint?.trim()) newErrors['route.endPoint'] = 'End point is required';
    if (!formData.route?.totalDistance || formData.route.totalDistance <= 0) {
      newErrors['route.totalDistance'] = 'Total distance is required';
    }

    // Pricing validation
    if (!formData.price?.min || formData.price.min <= 0) newErrors['price.min'] = 'Minimum price is required';
    if (!formData.price?.max || formData.price.max <= 0) newErrors['price.max'] = 'Maximum price is required';
    if (formData.price?.max < formData.price?.min) {
      newErrors['price.max'] = 'Maximum price must be greater than minimum price';
    }

    // Safety validation
    if (!formData.safety?.riskLevel) newErrors['safety.riskLevel'] = 'Risk level is required';
    if (!formData.safety?.requiredExperience?.trim()) {
      newErrors['safety.requiredExperience'] = 'Required experience is required';
    }

    // Description validation
    if (!formData.description?.trim()) newErrors.description = 'Trek description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = { ...formData, status: 'Draft' as const };
      localStorage.setItem('add-trek-draft', JSON.stringify(draftData));
      
      alert('Draft saved successfully!');
    } catch (error) {
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab or modal
    console.log('Preview trek:', formData);
    alert('Preview functionality would open a modal or new tab with trek preview');
  };

  const handlePublish = async () => {
    if (!validateForm()) {
      alert('Please fix all errors before publishing');
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const publishData = { ...formData, status: 'Published' as const };
      console.log('Publishing trek:', publishData);
      
      // Clear draft
      localStorage.removeItem('add-trek-draft');
      
      alert('Trek published successfully!');
      navigate('/trek-management');
    } catch (error) {
      alert('Failed to publish trek. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'basic-info':
        return <BasicInfoSection formData={formData} onChange={handleChange} errors={errors} />;
      case 'route-details':
        return <RouteDetailsSection formData={formData} onChange={handleChange} errors={errors} />;
      case 'pricing':
        return <PricingSection formData={formData} onChange={handleChange} errors={errors} />;
      case 'safety':
        return <SafetySection formData={formData} onChange={handleChange} errors={errors} />;
      case 'description':
        return <DescriptionSection formData={formData} onChange={handleChange} errors={errors} />;
      case 'itinerary':
        return <ItinerarySection formData={formData} onChange={handleChange} errors={errors} />;
      case 'images':
        return <ImageUploadSection formData={formData} onChange={handleChange} errors={errors} />;
      case 'permits':
        return <PermitSection formData={formData} onChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Trek</h1>
              <p className="text-gray-600">
                Create a comprehensive trek listing with all necessary information for trekkers
              </p>
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-900 mb-1">
                      Please fix the following errors:
                    </h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>• {message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Progress Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
                  <FormProgressIndicator
                    sections={sections}
                    currentSection={currentSection}
                    onSectionClick={setCurrentSection}
                  />
                </div>
              </div>

              {/* Form Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  {renderSection()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={handleSaveDraft}
                      disabled={isSaving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save Draft'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handlePreview}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  
                  <Button
                    variant="secondary"
                    onClick={handlePublish}
                    disabled={isSaving}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSaving ? 'Publishing...' : 'Publish Trek'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddTrek;