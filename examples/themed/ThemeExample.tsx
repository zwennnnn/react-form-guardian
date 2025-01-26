import React from 'react';
import { useFormWizard } from '../../packages/react-form-guardian/src';
import { WizardTheme } from '../../packages/react-form-guardian/src/themes/types';
import { darkTheme, lightTheme, modernTheme, warmTheme, neonTheme, pastelTheme, retroTheme, gradientTheme, minimalTheme, corporateTheme, gameTheme } from '../../packages/react-form-guardian/src/themes/defaultThemes';

const steps = [
  {
    id: 'step1',
    title: 'Adım 1',
    fields: ['name', 'email']
  },
  {
    id: 'step2',
    title: 'Adım 2',
    fields: ['address', 'phone']
  },
  {
    id: 'step3',
    title: 'Adım 3',
    fields: ['comments']
  }
];

const formConfig = {
  fields: {
    name: {
      required: true,
      requiredMessage: 'İsim zorunludur'
    },
    email: {
      required: true,
      requiredMessage: 'E-posta zorunludur'
    },
    address: {
      required: true,
      requiredMessage: 'Adres zorunludur'
    },
    phone: {
      required: true,
      requiredMessage: 'Telefon zorunludur'
    },
    comments: {
      required: false
    }
  }
};

const themes: Record<string, WizardTheme> = {
  'Light': lightTheme,
  'Dark': darkTheme,
  'Modern': modernTheme,
  'Warm': warmTheme,
  'Neon': neonTheme,
  'Pastel': pastelTheme,
  'Retro': retroTheme,
  'Gradient': gradientTheme,
  'Minimal': minimalTheme,
  'Corporate': corporateTheme,
  'Game': gameTheme
};

export const ThemeExample = () => {
  const [selectedTheme, setSelectedTheme] = React.useState<string>('Light');
  const wizard = useFormWizard({ steps, theme: themes[selectedTheme] }, formConfig);
  const theme = themes[selectedTheme];

  const hasPreviousStep = wizard.wizardState.currentStepId !== steps[0].id;
  const progress = Math.round((wizard.wizardState.completedSteps.length / steps.length) * 100);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', color: theme.colors.text }}>
          Tema Seçin:
        </label>
        <select 
          value={selectedTheme} 
          onChange={(e) => setSelectedTheme(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: theme.button.borderRadius,
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {Object.keys(themes).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName} Tema
            </option>
          ))}
        </select>
      </div>

      <div style={{ 
        backgroundColor: theme.colors.background,
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: theme.colors.text,
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            height: theme.progressBar.height,
            backgroundColor: theme.progressBar.background,
            borderRadius: theme.progressBar.borderRadius,
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: theme.colors.primary,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          {steps.map((step, index) => (
            <div key={step.id} style={{
              width: theme.stepIndicator.size,
              height: theme.stepIndicator.size,
              borderRadius: theme.stepIndicator.borderRadius,
              backgroundColor: wizard.wizardState.currentStepId === step.id
                ? theme.colors.primary
                : wizard.wizardState.completedSteps.includes(step.id)
                  ? theme.colors.success
                  : theme.stepIndicator.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: wizard.wizardState.currentStepId === step.id
                ? '#fff'
                : wizard.wizardState.completedSteps.includes(step.id)
                  ? '#fff'
                  : theme.colors.text,
              border: `2px solid ${
                wizard.wizardState.currentStepId === step.id
                  ? theme.colors.primary
                  : wizard.wizardState.completedSteps.includes(step.id)
                    ? theme.colors.success
                    : theme.colors.border
              }`,
              transition: 'all 0.3s ease'
            }}>
              {index + 1}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '20px' }}>
          {steps.map((step) => {
            if (step.id === wizard.wizardState.currentStepId) {
              return (
                <div key={step.id}>
                  <h3 style={{ 
                    color: theme.colors.primary,
                    marginBottom: '20px',
                    fontSize: theme.form.labelFontSize
                  }}>
                    {step.title}
                  </h3>
                  <div style={{ width: '100%' }}>
                    {step.fields.map((field) => (
                      <div key={field} style={{ 
                        marginBottom: theme.form.fieldSpacing,
                        width: '100%'
                      }}>
                        <label style={{
                          display: 'block',
                          marginBottom: theme.form.labelSpacing,
                          color: theme.colors.text,
                          fontSize: theme.form.labelFontSize
                        }}>
                          {field.charAt(0).toUpperCase() + field.slice(1)}:
                        </label>
                        <input
                          type="text"
                          value={wizard.values[field] || ''}
                          onChange={(e) => wizard.setFieldValue(field, e.target.value)}
                          onBlur={() => wizard.setFieldTouched(field, true)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            height: theme.form.inputHeight,
                            padding: theme.form.inputPadding,
                            borderRadius: theme.form.inputBorderRadius,
                            border: `1px solid ${
                              wizard.errors[field] && wizard.touched[field]
                                ? theme.colors.error
                                : theme.form.inputBorderColor
                            }`,
                            fontSize: theme.form.fontSize,
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text,
                            transition: 'all 0.3s ease'
                          }}
                        />
                        {wizard.errors[field] && wizard.touched[field] && (
                          <div style={{
                            color: theme.colors.error,
                            fontSize: theme.form.errorFontSize,
                            marginTop: '4px'
                          }}>
                            {wizard.errors[field]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={wizard.previousStep}
            disabled={!hasPreviousStep}
            style={{
              padding: theme.button.padding,
              borderRadius: theme.button.borderRadius,
              border: 'none',
              backgroundColor: theme.colors.secondary,
              color: '#fff',
              fontSize: theme.button.fontSize,
              cursor: hasPreviousStep ? 'pointer' : 'not-allowed',
              opacity: hasPreviousStep ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            Geri
          </button>
          <button
            onClick={wizard.nextStep}
            style={{
              padding: theme.button.padding,
              borderRadius: theme.button.borderRadius,
              border: 'none',
              backgroundColor: theme.colors.primary,
              color: '#fff',
              fontSize: theme.button.fontSize,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {wizard.isLastStep ? 'Tamamla' : 'İleri'}
          </button>
        </div>
      </div>
    </div>
  );
}; 