import React from 'react';
import { useFormWizard } from '../../packages/react-form-guardian/src';
import { StepSummary } from '../../packages/react-form-guardian/src/components/StepSummary';

const WizardExample = () => {
  const wizard = useFormWizard(
    {
      steps: [
        {
          id: 'personal',
          title: 'Kişisel Bilgiler',
          description: 'Temel bilgilerinizi girin',
          fields: ['firstName', 'lastName', 'email']
        },
        {
          id: 'address',
          title: 'Adres Bilgileri',
          description: 'Adres bilgilerinizi girin',
          fields: ['street', 'city', 'zipCode']
        },
        {
          id: 'account',
          title: 'Hesap Bilgileri',
          description: 'Hesap bilgilerinizi girin',
          fields: ['username', 'password']
        }
      ],
      csrf: {
        tokenKey: '_csrf',
        headerName: 'X-CSRF-Token',
        cookieName: 'csrf_token',
        getToken: async () => {
          const token = `csrf-${Date.now()}`;
          document.cookie = `csrf_token=${token}; path=/; max-age=3600`;
          console.log('CSRF Token üretildi ve cookie\'ye kaydedildi:', token);
          return token;
        }
      },
      onStepChange: async (from, to, values) => {
        console.log(`${from} adımından ${to} adımına geçiliyor`, values);
        return true;
      },
      onComplete: async (formDataOrObject: any) => {
        console.log('Form gönderimi başladı');
        
        if (formDataOrObject.data && formDataOrObject.headers) {
          const { data, headers } = formDataOrObject;
          console.log('CSRF korumalı gönderim yapılıyor:');
          console.log('- Form verileri:', data);
          console.log('- CSRF Token:', data._csrf);
          console.log('- Headers:', Object.fromEntries(headers.entries()));
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          alert('Form CSRF koruması ile başarıyla gönderildi!');
        } else {
          console.error('CSRF token bulunamadı! Normal gönderim yapılıyor:', formDataOrObject);
          alert('UYARI: Form CSRF koruması olmadan gönderildi!');
        }
      }
    },
    {
      fields: {
        firstName: {
          initialValue: '',
          required: true,
          requiredMessage: 'Ad alanı zorunludur'
        },
        lastName: {
          initialValue: '',
          required: true,
          requiredMessage: 'Soyad alanı zorunludur'
        },
        email: {
          initialValue: '',
          required: true,
          requiredMessage: 'E-posta alanı zorunludur',
          rules: [
            {
              validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
              message: 'Geçerli bir e-posta adresi giriniz'
            }
          ]
        },
        street: {
          initialValue: '',
          required: true,
          requiredMessage: 'Sokak adresi zorunludur'
        },
        city: {
          initialValue: '',
          required: true,
          requiredMessage: 'Şehir alanı zorunludur'
        },
        zipCode: {
          initialValue: '',
          required: true,
          requiredMessage: 'Posta kodu zorunludur',
          rules: [
            {
              validator: (value) => /^\d{5}$/.test(value),
              message: '5 haneli posta kodu giriniz'
            }
          ]
        },
        username: {
          initialValue: '',
          required: true,
          requiredMessage: 'Kullanıcı adı zorunludur',
          rules: [
            {
              validator: (value) => value.length >= 4,
              message: 'Kullanıcı adı en az 4 karakter olmalıdır'
            },
            {
              validator: (value) => !/[@]/.test(value),
              message: 'Kullanıcı adı @ işareti içeremez'
            },
            {
              validator: (value) => /^[a-zA-Z0-9_-]+$/.test(value),
              message: 'Kullanıcı adı sadece harf, rakam, tire ve alt çizgi içerebilir'
            }
          ]
        },
        password: {
          initialValue: '',
          required: true,
          requiredMessage: 'Şifre zorunludur',
          rules: [
            {
              validator: (value) => value.length >= 6,
              message: 'Şifre en az 6 karakter olmalıdır'
            },
            {
              validator: (value) => /[A-Z]/.test(value),
              message: 'Şifre en az bir büyük harf içermelidir'
            }
          ]
        }
      }
    }
  );

  const currentStep = wizard.wizardState.currentStepId;
  const currentFields = wizard.wizardConfig.steps.find(
    step => step.id === currentStep
  )?.fields || [];

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          height: '4px', 
          backgroundColor: '#eee', 
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${wizard.wizardState.progress}%`,
            height: '100%',
            backgroundColor: '#007bff',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '10px'
        }}>
          {wizard.wizardConfig.steps.map(step => (
            <div
              key={step.id}
              style={{
                color: wizard.wizardState.completedSteps.includes(step.id) ? '#28a745' : 
                  step.id === currentStep ? '#007bff' : '#666'
              }}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {wizard.isCurrentStepSummary ? (
        <StepSummary
          steps={wizard.wizardConfig.steps}
          values={wizard.values}
          onEdit={wizard.handleEditStep}
        />
      ) : (
        <div className="form-fields">
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (wizard.wizardState.isLastStep) {
              await wizard.handleSubmit(e);
            } else {
              await wizard.nextStep();
            }
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {currentFields.map(fieldName => (
                <div key={fieldName}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>
                    {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                  </label>
                  <input
                    type={fieldName === 'password' ? 'password' : 'text'}
                    value={wizard.values[fieldName] || ''}
                    onChange={(e) => wizard.handleChange(fieldName, e.target.value)}
                    onBlur={() => wizard.handleBlur(fieldName)}
                    style={{ width: '100%', padding: '8px' }}
                  />
                  {wizard.touched[fieldName] && wizard.errors[fieldName]?.map((error) => (
                    <div key={error} style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                      {error}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="button-group">
              {!wizard.isFirstStep && (
                <button
                  type="button"
                  onClick={wizard.previousStep}
                  disabled={wizard.isSubmitting}
                >
                  Geri
                </button>
              )}
              
              {wizard.isCurrentStepSummary ? (
                <button
                  type="submit"
                  disabled={wizard.isSubmitting}
                >
                  {wizard.isSubmitting ? 'Gönderiliyor...' : 'Formu Gönder'}
                </button>
              ) : wizard.editingStepId ? (
                <button
                  type="button"
                  onClick={wizard.returnToSummary}
                  disabled={wizard.isSubmitting}
                >
                  Özete Dön
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={wizard.isSubmitting}
                >
                  {wizard.isLastStep ? 'Tamamla' : 'İleri'}
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Form Durumu:</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify({
            values: wizard.values,
            errors: wizard.errors,
            currentStep: wizard.wizardState.currentStepId,
            completedSteps: wizard.wizardState.completedSteps,
            progress: wizard.wizardState.progress
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default WizardExample; 