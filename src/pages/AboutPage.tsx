/**
 * @file AboutPage.tsx
 * @description Defines the "About Us" page for the application.
 * This page provides information about the project, its purpose, and the technologies used.
 * It uses framer-motion for entry animations and react-i18next for internationalization.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRoute } from '../router/routes.config';
import AnimatedPage from '../components/motion/AnimatedPage';
import { 
  FaPersonRunning, 
  FaDumbbell, 
  FaPenToSquare, 
  FaWind, 
  FaBowlFood, 
  FaStopwatch,
  FaBullseye,
  FaHandshake,
  FaMicroscope,
  FaSeedling,
  FaCompass,
  FaEarthAmericas,
  FaLightbulb,
  FaWandMagicSparkles,
  FaRocket
} from 'react-icons/fa6';

/**
 * The About page of the application.
 * It provides information about the team and the project's purpose and technologies used.
 * Content is internationalized and the page uses animations.
 * @returns {JSX.Element} The rendered AboutPage component.
 */
const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  const splitParagraph = (content: string) =>
    content
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

  const missionLines = splitParagraph(
    t(
      'aboutParagraph2',
      'Guided Mission\nDesigning human-centered training plans so every athlete feels seen and supported.'
    )
  );
  const globalLines = splitParagraph(
    t(
      'aboutParagraph3',
      'Global Perspective\nServing multilingual communities online with inclusive fitness experiences.'
    )
  );
  const innovationLinesRaw = splitParagraph(
    t(
      'aboutParagraph4',
      'Innovative Coaching\n• Individualized data-driven assessments\n• Sustainable performance habits\n• Mobility, strength, and mindset synergy'
    )
  );
  const innovationTitle = innovationLinesRaw[0] ?? t('aboutParagraph4TitleFallback', 'Innovative Coaching');
  const innovationBullets = innovationLinesRaw
    .slice(1)
    .filter((line) => line.startsWith('•'))
    .map((line) => line.replace(/^•\s*/, ''));

  const statHighlights = [
    { value: '12+', label: t('aboutStatYears', 'Years of tailored coaching') },
    { value: '500+', label: t('aboutStatClients', 'Athletes guided worldwide') },
    { value: '4', label: t('aboutStatLanguages', 'Languages for coaching') },
  ];

  const timelineMilestones = [
    {
      year: '2014',
      title: t('aboutTimelineSparkTitle', 'The Spark'),
      description: t(
        'aboutTimelineSparkDescription',
        'Moved from competitive athlete to coach, determined to blend science with empathy.'
      ),
    },
    {
      year: '2018',
      title: t('aboutTimelineExpansionTitle', 'Global Expansion'),
      description: t(
        'aboutTimelineExpansionDescription',
        'Launched hybrid online coaching, building community across Europe and LATAM.'
      ),
    },
    {
      year: '2021',
      title: t('aboutTimelineInnovationTitle', 'Innovation Mode'),
      description: t(
        'aboutTimelineInnovationDescription',
        'Integrated wearable insights, breathwork, and mindset labs into every plan.'
      ),
    },
    {
      year: 'Today',
      title: t('aboutTimelineNowTitle', 'Impact Today'),
      description: t(
        'aboutTimelineNowDescription',
        'Helping leaders, parents, and creators build resilient lifestyles that last.'
      ),
    },
  ];

  const toolset = [
    { name: t('aboutToolset1', 'Mobility Flow Systems'), icon: <FaPersonRunning /> },
    { name: t('aboutToolset2', 'Strength & Conditioning'), icon: <FaDumbbell /> },
    { name: t('aboutToolset3', 'Mindset Journaling'), icon: <FaPenToSquare /> },
    { name: t('aboutToolset4', 'Breathwork Protocols'), icon: <FaWind /> },
    { name: t('aboutToolset5', 'Nutrition Micro-habits'), icon: <FaBowlFood /> },
    { name: t('aboutToolset6', 'Wearable Analytics'), icon: <FaStopwatch /> },
  ];

  const skills = [
    { name: t('aboutSkill1', 'Program Design'), level: 95 },
    { name: t('aboutSkill2', 'Mobility & Recovery'), level: 90 },
    { name: t('aboutSkill3', 'Nutrition Strategy'), level: 85 },
    { name: t('aboutSkill4', 'Mental Coaching'), level: 88 },
  ];

  const values = [
    {
      icon: <FaBullseye />,
      title: t('aboutValue1Title', 'Results-Driven'),
      description: t('aboutValue1Desc', 'Every program is built around measurable progress and sustainable outcomes'),
    },
    {
      icon: <FaHandshake />,
      title: t('aboutValue2Title', 'Human-First'),
      description: t('aboutValue2Desc', 'Your life context shapes the training, not the other way around'),
    },
    {
      icon: <FaMicroscope />,
      title: t('aboutValue3Title', 'Evidence-Based'),
      description: t('aboutValue3Desc', 'Rooted in exercise science, refined through real-world application'),
    },
    {
      icon: <FaSeedling />,
      title: t('aboutValue4Title', 'Growth Mindset'),
      description: t('aboutValue4Desc', 'Building habits that compound over years, not just weeks'),
    },
  ];

  const quote = t(
    'aboutSignatureQuote',
    '“Training is not punishment for what you ate; it is a daily vote for the kind of life you want.”'
  );

  return (
    <AnimatedPage className="container mx-auto px-space-md py-12 min-h-full flex flex-col gap-space-xl text-text-default dark:text-text-default-dark">
      {/* Hero Section with Enhanced Visuals */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 shadow-lg dark:from-primary-dark/20 dark:via-primary-dark/5 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,_rgba(106,211,177,0.15),_transparent_50%)] before:pointer-events-none">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark">
              {t('aboutTagline', 'Purpose-driven performance coaching')}
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold text-primary dark:text-primary-dark lg:text-5xl">
                {t('aboutTitlePage', 'Gonorte - About Me')}
              </h1>
              <p className="text-lg text-text-muted dark:text-text-muted-dark">
                {t(
                  'aboutParagraph1',
                  'I blend science-backed methodology with the art of human connection so every program feels handcrafted for your lifestyle.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to={getLocalizedRoute('contact', currentLang)}
                className="group rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">{t('aboutCTAContact', 'Book a discovery call')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                to={getLocalizedRoute('services', currentLang)}
                className="group rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:scale-105 dark:text-primary-dark dark:hover:bg-primary-dark/10"
              >
                <span className="flex items-center gap-2">
                  {t('aboutCTAPrograms', 'Explore coaching tracks')}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl">
              <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" aria-hidden="true" />
              <div className="relative p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-semibold">
                    GT
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/70">Coach</p>
                    <p className="text-2xl font-bold">Gonorte Trainer</p>
                    <p className="text-white/70">{t('aboutLocationTag', 'Based in Spain • Working globally')}</p>
                  </div>
                </div>
                <p className="text-white/80">
                  {t(
                    'aboutProfileSnippet',
                    'Athlete-turned-coach obsessed with helping busy humans build rituals that feel luxurious yet doable.'
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[missionLines[0], globalLines[0], innovationTitle].filter(Boolean).map((label) => (
                    <span key={label} className="rounded-full border border-white/30 px-4 py-1 text-sm text-white/90">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statHighlights.map((stat, index) => (
            <div 
              key={stat.label} 
              className="group rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/40 dark:hover:border-primary-dark/40"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-4xl font-extrabold text-primary dark:text-primary-dark group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
              <p className="text-sm uppercase tracking-wide text-text-muted dark:text-text-muted-dark">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section - Enhanced */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-8 shadow-lg dark:from-primary-dark/10 dark:to-primary-dark/10">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        
        <div className="relative z-10 mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark mb-2">
            {t('aboutValuesLabel', 'Our Foundation')}
          </p>
          <h2 className="text-4xl font-extrabold text-primary dark:text-primary-dark">
            {t('aboutValuesTitle', 'Core Values')}
          </h2>
          <p className="mt-3 text-lg text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto">
            {t('aboutValuesSubtitle', 'The principles that guide every coaching decision and client interaction')}
          </p>
        </div>

        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative rounded-2xl border-2 border-neutral-border-light bg-white p-8 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-primary dark:border-neutral-border-dark dark:bg-neutral-surface-dark dark:hover:border-primary-dark overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary-dark/20 dark:to-primary-dark/5 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-4xl transform transition-transform duration-500 group-hover:scale-125">{value.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-primary dark:text-primary-dark mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {value.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-text-default/80 dark:text-text-default-dark/80 group-hover:text-text-default dark:group-hover:text-text-default-dark transition-colors">
                  {value.description}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission, Vision & About Section */}
      <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8 rounded-3xl border border-neutral-border-light bg-surface p-8 shadow-sm dark:border-neutral-border-dark overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" aria-hidden="true" />
          
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark mb-2">
              {t('aboutSectionLabel', 'Who I Am')}
            </p>
            <h2 className="text-3xl font-semibold text-primary dark:text-primary-dark">
              {t('aboutSectionMainHeading', 'About Me')}
            </h2>
          </div>

          <div className="space-y-6 relative z-10">
            {[missionLines, globalLines].map((lines, index) => {
              if (!lines.length) return null;
              const [title, ...body] = lines;
              const icons = [<FaCompass />, <FaEarthAmericas />];
              const gradients = [
                'from-primary/10 to-primary/5',
                'from-secondary/10 to-secondary/5'
              ];
              
              return (
                <div 
                  key={title ?? index} 
                  className={`group relative rounded-2xl border border-neutral-border-light bg-gradient-to-br ${gradients[index]} p-6 shadow-sm hover:shadow-lg transition-all duration-300 dark:border-neutral-border-dark overflow-hidden`}
                >
                  <div className="absolute -right-8 -top-8 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">
                    {icons[index]}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-neutral-surface-dark shadow-sm">
                        <span className="text-2xl">{icons[index]}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-primary dark:text-primary-dark group-hover:translate-x-1 transition-transform">
                        {title}
                      </h3>
                    </div>
                    <p className="text-lg leading-relaxed text-text-default/90 dark:text-text-default-dark/90 pl-15">
                      {body.join(' ')}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              );
            })}
            <div className="relative rounded-2xl border border-neutral-border-light bg-gradient-to-br from-accent/10 to-accent/5 p-6 shadow-sm hover:shadow-lg transition-all duration-300 dark:border-neutral-border-dark overflow-hidden group">
              <div className="absolute -right-8 -top-8 text-8xl opacity-5 group-hover:opacity-10 transition-opacity"><FaLightbulb /></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-neutral-surface-dark shadow-sm">
                    <span className="text-2xl"><FaLightbulb /></span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary dark:text-primary-dark">{innovationTitle}</h3>
                </div>
                
                <ul className="grid gap-3 text-lg text-text-default/90 dark:text-text-default-dark/90 pl-15">
                  {innovationBullets.map((item, idx) => (
                    <li key={item} className="flex items-start gap-3 group/item">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 dark:bg-primary-dark/20 flex-shrink-0 mt-1 group-hover/item:scale-125 group-hover/item:bg-primary/30 dark:group-hover/item:bg-primary-dark/30 transition-all">
                        <span className="text-xs font-bold text-primary dark:text-primary-dark">{idx + 1}</span>
                      </div>
                      <span className="group-hover/item:text-primary dark:group-hover/item:text-primary-dark group-hover/item:translate-x-1 transition-all">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills Progress Bars */}
            <div className="relative rounded-2xl border border-neutral-border-light bg-white dark:bg-neutral-surface-dark p-6 shadow-sm dark:border-neutral-border-dark mt-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary-dark/20 dark:to-primary-dark/5">
                  <span className="text-xl"><FaBullseye /></span>
                </div>
                <h3 className="text-xl font-bold text-primary dark:text-primary-dark">{t('aboutSkillsTitle', 'Expertise Areas')}</h3>
              </div>
              
              <div className="space-y-5">
                {skills.map((skill, idx) => (
                  <div key={skill.name} className="group space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-text-default dark:text-text-default-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">{skill.name}</span>
                      <span className="text-text-muted dark:text-text-muted-dark font-medium">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-dark rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${idx * 200}ms`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-neutral-border-light bg-gradient-to-b from-white via-white to-white/70 p-6 shadow-sm dark:border-neutral-border-dark dark:from-neutral-surface-dark dark:via-neutral-surface-dark dark:to-neutral-surface-dark/70 hover:shadow-lg transition-shadow duration-300">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark">
              {t('aboutQuoteLabel', 'Signature mantra')}
            </p>
            <blockquote className="mt-4 text-xl italic text-text-default/90 dark:text-text-default-dark/90 relative pl-4 border-l-4 border-primary dark:border-primary-dark">
              {quote}
            </blockquote>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark">
              {t('aboutScheduleLabel', 'Weekly rhythm')}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-text-muted dark:text-text-muted-dark">
              <li className="flex items-start gap-2 group">
                <span className="text-primary dark:text-primary-dark mt-0.5 group-hover:scale-125 transition-transform">•</span>
                <span className="group-hover:text-text-default dark:group-hover:text-text-default-dark transition-colors">{t('aboutRoutine1', 'Deep work blocks for custom plan design')}</span>
              </li>
              <li className="flex items-start gap-2 group">
                <span className="text-primary dark:text-primary-dark mt-0.5 group-hover:scale-125 transition-transform">•</span>
                <span className="group-hover:text-text-default dark:group-hover:text-text-default-dark transition-colors">{t('aboutRoutine2', 'Live check-ins Tuesdays & Thursdays')}</span>
              </li>
              <li className="flex items-start gap-2 group">
                <span className="text-primary dark:text-primary-dark mt-0.5 group-hover:scale-125 transition-transform">•</span>
                <span className="group-hover:text-text-default dark:group-hover:text-text-default-dark transition-colors">{t('aboutRoutine3', 'Community mobility labs every weekend')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-border-light bg-surface p-8 shadow-sm dark:border-neutral-border-dark">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark">
              {t('aboutSectionCertifications', 'Training and Background')}
            </p>
            <p className="text-lg text-text-default/90 dark:text-text-default-dark/90">{t('aboutParagraph5')}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[t('aboutCertification1', 'NSCA Strength & Conditioning Specialist'), t('aboutCertification2', 'Precision Nutrition Level 1'), t('aboutCertification3', 'Breathwork & Mobility Specialist'), t('aboutCertification4', 'Functional Range Conditioning Coach')].map((cert, idx) => (
                <div 
                  key={cert} 
                  className="group rounded-2xl border border-neutral-border-light/70 px-4 py-3 text-sm font-semibold text-text-default dark:text-text-default-dark dark:border-neutral-border-dark/50 hover:border-primary dark:hover:border-primary-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5 transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-primary dark:text-primary-dark opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark">
              {t('aboutSectionPhilosophy', 'Gonorte Philosophy')}
            </p>
            <p className="mt-4 text-lg text-text-default/90 dark:text-text-default-dark/90">{t('aboutParagraph6')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {toolset.map((tool, idx) => (
                <span 
                  key={tool.name} 
                  className="group rounded-full border border-neutral-border-light px-4 py-2 text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-text-muted-dark dark:border-neutral-border-dark hover:border-primary hover:text-primary dark:hover:border-primary-dark dark:hover:text-primary-dark hover:shadow-md transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="flex items-center gap-2">
                    <span className="transition-transform group-hover:scale-125">{tool.icon}</span>
                    {tool.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section with Enhanced Styling */}
      <section className="rounded-3xl border border-neutral-border-light bg-surface p-8 shadow-sm dark:border-neutral-border-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0" aria-hidden="true" />
        <div className="mb-8 relative z-10">
          <p className="text-sm uppercase tracking-[0.3em] text-primary dark:text-primary-dark">
            {t('aboutTimelineLabel', 'Milestones & evolution')}
          </p>
          <h2 className="text-3xl font-semibold text-primary dark:text-primary-dark">
            {t('aboutTimelineTitle', 'The journey so far')}
          </h2>
        </div>
        <div className="relative pl-6 z-10">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20 dark:from-primary-dark dark:via-primary-dark/50 dark:to-primary-dark/20" aria-hidden="true" />
          <div className="space-y-8">
            {timelineMilestones.map((item, idx) => (
              <div 
                key={item.title} 
                className="group relative rounded-2xl border border-neutral-border-light/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-neutral-border-dark/50 dark:bg-white/5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -left-[38px] top-6 h-3 w-3 rounded-full border-4 border-white bg-primary dark:border-neutral-surface-dark group-hover:scale-150 group-hover:shadow-lg transition-all duration-300" aria-hidden="true" />
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <p className="text-sm uppercase tracking-[0.3em] text-text-muted dark:text-text-muted-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">{item.year}</p>
                    <h3 className="mt-2 text-2xl font-bold text-primary dark:text-primary-dark">{item.title}</h3>
                    <p className="mt-2 text-lg text-text-default/90 dark:text-text-default-dark/90">{item.description}</p>
                  </div>
                  <div className="text-3xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 text-primary dark:text-primary-dark">
                    {idx === 0 ? <FaWandMagicSparkles /> : idx === 1 ? <FaEarthAmericas /> : idx === 2 ? <FaRocket /> : <FaBullseye />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default AboutPage;
