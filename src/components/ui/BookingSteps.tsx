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
    <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
      {/* Step indicator for mobile */}
      <div className="md:hidden text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-primary-500/10 dark:bg-primary-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm">
            {t('step', 'Paso')} {currentStep} {t('of', 'de')} {steps.length}
          </span>
        </div>
        <p className="text-base sm:text-lg font-bold mt-2 sm:mt-3" style={{ color: 'hsl(var(--color-fg-base))' }}>
          {steps[currentStep - 1].label}
        </p>
      </div>

      <div className="relative hidden md:flex justify-between items-start">
        {/* Progress Bar Background */}
        <div 
          className="absolute top-8 left-0 w-full h-2 rounded-full" 
          style={{ backgroundColor: 'hsl(var(--color-border-base))', zIndex: 0 }} 
        />
        
        {/* Active Progress Bar with gradient */}
        <div 
          className="absolute top-8 left-0 h-2 bg-gradient-to-r from-primary-500 via-primary-500 to-primary-600 rounded-full transition-all duration-700 ease-in-out shadow-lg"
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
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  isActive
                    ? 'border-primary-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110 animate-pulse'
                    : isCompleted
                    ? 'border-primary-500 bg-primary-500 shadow-lg'
                    : isNext
                    ? 'shadow-md'
                    : ''
                }`}
                style={{ 
                  backgroundColor: isCompleted ? undefined : 'hsl(var(--color-bg-base))',
                  borderColor: isCompleted || isActive ? undefined : 'hsl(var(--color-border-base))'
                }}
              >
                {isCompleted ? (
                  <FaCheck className="text-white text-lg lg:text-xl" />
                ) : (
                  <Icon 
                    className={`text-xl lg:text-2xl transition-colors duration-300 ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : ''
                    }`}
                    style={!isActive ? { color: 'hsl(var(--color-fg-muted))' } : undefined}
                  />
                )}
              </div>
              
              {/* Step label */}
              <div className="text-center">
                <p 
                  className={`text-xs lg:text-sm font-bold transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 text-sm lg:text-base'
                      : isCompleted
                      ? 'text-primary-600 dark:text-primary-400'
                      : ''
                  }`}
                  style={!isActive && !isCompleted ? { color: 'hsl(var(--color-fg-muted))' } : undefined}
                >
                  {step.label}
                </p>
                {isActive && (
                  <span className="inline-block mt-1 px-2 lg:px-3 py-0.5 lg:py-1 bg-primary-500 text-white text-[10px] lg:text-xs rounded-full font-semibold animate-fade-in">
                    {t('currentStep', 'Paso actual')}
                  </span>
                )}
                {isNext && (
                  <span 
                    className="inline-block mt-1 px-2 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs rounded-full font-medium"
                    style={{ 
                      backgroundColor: 'hsl(var(--color-bg-surface))', 
                      color: 'hsl(var(--color-fg-muted))',
                      border: '1px solid hsl(var(--color-border-base))'
                    }}
                  >
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
