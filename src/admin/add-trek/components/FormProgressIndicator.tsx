import React from 'react';
import { FormSection } from '../types';
import { Check, AlertCircle } from 'lucide-react';

interface FormProgressIndicatorProps {
  sections: FormSection[];
  currentSection: string;
  onSectionClick: (sectionId: string) => void;
}

const FormProgressIndicator: React.FC<FormProgressIndicatorProps> = ({
  sections,
  currentSection,
  onSectionClick,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Form Progress</h3>
      {sections.map((section, index) => {
        const isActive = section.id === currentSection;
        const isComplete = section.isComplete;
        const hasErrors = section.hasErrors;

        return (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-blue-50 border-l-4 border-blue-600' :'hover:bg-gray-50 border-l-4 border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">{index + 1}</span>
              <span className={`flex-1 text-sm ${isActive ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                {section.title}
              </span>
              {isComplete && !hasErrors && (
                <Check className="w-4 h-4 text-green-600" />
              )}
              {hasErrors && (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FormProgressIndicator;