import React from 'react';
import { WizardStep } from '../types';

interface StepSummaryProps {
  steps: WizardStep[];
  values: Record<string, any>;
  onEdit: (stepId: string) => void;
}

export const StepSummary: React.FC<StepSummaryProps> = ({ steps, values, onEdit }) => {
 
  const stepsToShow = steps.filter(step => !step.isSummary);

  return (
    <div className="step-summary">
      {stepsToShow.map((step) => (
        <div key={step.id} className="step-summary-section">
          <div className="step-summary-header">
            <h3>{step.title}</h3>
            <button 
              type="button" 
              onClick={() => onEdit(step.id)}
              className="edit-button"
            >
              Düzenle
            </button>
          </div>
          <div className="step-summary-content">
            {step.fields.map((field) => {
              const value = values[field];
              if (!value && step.summaryConfig?.hideEmpty) return null;

              const label = step.summaryConfig?.labels?.[field] || field;
              const formatter = step.summaryConfig?.formatters?.[field];
              const displayValue = formatter ? formatter(value) : value;

              return (
                <div key={field} className="summary-field">
                  <span className="field-label">{label}:</span>
                  <span className="field-value">{displayValue}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}; 