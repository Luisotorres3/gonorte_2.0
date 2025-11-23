import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaListCheck, FaUser, FaCalendarCheck, FaCheck } from 'react-icons/fa6';

interface BookingStepsProps {
  currentStep: 1 | 2 | 3;
}

const BookingSteps: React.FC<BookingStepsProps> = ({ currentStep }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t('stepSelectPlan', 'Seleccionar Plan'), shortLabel: t('stepSelectPlanShort', 'Plan'), icon: FaListCheck },
    { id: 2, label: t('stepYourInfo', 'Tus Datos'), shortLabel: t('stepYourInfoShort', 'Datos'), icon: FaUser },
    { id: 3, label: t('stepBookSession', 'Agendar Sesión'), shortLabel: t('stepBookSessionShort', 'Agenda'), icon: FaCalendarCheck },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 md:mb-12 px-4">
      {/* Step indicator for mobile */}
      <div className="md:hidden text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
          <span className="text-primary dark:text-primary-dark font-bold text-sm">
            {t('step', 'Paso')} {currentStep} {t('of', 'de')} {steps.length}
          </span>
        </div>
        <p className="text-lg font-bold text-text-default dark:text-text-default-dark mt-3">
          {steps[currentStep - 1].label}
        </p>
      </div>

      <div className="relative hidden md:flex justify-between items-start">
        {/* Progress Bar Background */}
        <div className="absolute top-8 left-0 w-full h-2 bg-neutral-border-light dark:bg-neutral-border-dark rounded-full" style={{ zIndex: 0 }} />
        
        {/* Active Progress Bar with gradient */}
        <div 
          className="absolute top-8 left-0 h-2 bg-gradient-to-r from-primary via-primary to-primary-dark rounded-full transition-all duration-700 ease-in-out shadow-lg"
          style={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            zIndex: 1
          }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isNext = step.id === currentStep + 1;

          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center gap-3 relative transition-all duration-500"
              style={{ 
                flex: 1,
                zIndex: 10,
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {/* Step circle */}
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 bg-neutral-background-light dark:bg-neutral-background-dark ${
                  isActive
                    ? 'border-primary shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110 animate-pulse'
                    : isCompleted
                    ? 'border-primary bg-primary shadow-lg'
                    : isNext
                    ? 'border-neutral-border-light dark:border-neutral-border-dark shadow-md'
                    : 'border-neutral-border-light dark:border-neutral-border-dark'
                }`}
              >
                {isCompleted ? (
                  <FaCheck className="text-white text-xl" />
                ) : (
                  <Icon 
                    className={`text-2xl transition-colors duration-300 ${
                      isActive
                        ? 'text-primary dark:text-primary-dark'
                        : isNext
                        ? 'text-text-muted-light dark:text-text-muted-dark'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                )}
              </div>
              
              {/* Step label */}
              <div className="text-center">
                <p 
                  className={`text-sm font-bold transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-primary dark:text-primary-dark text-base'
                      : isCompleted
                      ? 'text-primary dark:text-primary-dark'
                      : isNext
                      ? 'text-text-muted-light dark:text-text-muted-dark'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {step.label}
                </p>
                {isActive && (
                  <span className="inline-block mt-1 px-3 py-1 bg-primary text-white text-xs rounded-full font-semibold animate-fade-in">
                    {t('currentStep', 'Paso actual')}
                  </span>
                )}
                {isNext && (
                  <span className="inline-block mt-1 px-3 py-1 bg-neutral-surface-light dark:bg-neutral-surface-dark text-text-muted-light dark:text-text-muted-dark text-xs rounded-full font-medium">
                    {t('nextStep', 'Siguiente')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSteps;
