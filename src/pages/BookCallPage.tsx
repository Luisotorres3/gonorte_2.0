/**
 * @file BookCallPage.tsx
 * @description Calendly InlineWidget with a full-layout skeleton shown until
 * the widget fires calendly.event_type_viewed (or a 10 s fallback kicks in).
 */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InlineWidget } from 'react-calendly';
import { motion, AnimatePresence } from 'framer-motion';
import { MARKETING } from '../constants';

const CALENDLY_URL =
  `${MARKETING.CALENDLY_URL}?embed_type=Inline&hide_gdpr_banner=1&primary_color=0d9488`;

// ─── Skeleton pieces ────────────────────────────────────────────────────────

const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700 ${className}`} />
);

const CalendlySkeleton: React.FC = () => (
  <div className="flex w-full h-full">
    {/* Left panel */}
    <div className="hidden sm:flex flex-col gap-5 w-64 xl:w-72 flex-shrink-0 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 p-8">
      <Shimmer className="w-14 h-14 rounded-full" />
      <Shimmer className="h-4 w-32" />
      <Shimmer className="h-6 w-48" />
      <div className="flex flex-col gap-3 mt-2">
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <Shimmer className="h-3 w-4/6" />
        <Shimmer className="h-3 w-5/6" />
        <Shimmer className="h-3 w-3/6" />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Shimmer className="w-4 h-4 rounded-full flex-shrink-0" />
        <Shimmer className="h-3 w-20" />
      </div>
      <div className="flex items-center gap-2">
        <Shimmer className="w-4 h-4 rounded-full flex-shrink-0" />
        <Shimmer className="h-3 w-28" />
      </div>
    </div>

    {/* Calendar panel */}
    <div className="flex-1 bg-white dark:bg-neutral-800 flex flex-col p-6 sm:p-8 gap-6">
      <div className="flex items-center justify-between">
        <Shimmer className="w-7 h-7 rounded-full" />
        <Shimmer className="h-5 w-40" />
        <Shimmer className="w-7 h-7 rounded-full" />
      </div>
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Shimmer key={i} className="h-3 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 35 }).map((_, i) => (
          <Shimmer key={i} className="h-9 w-full rounded-full" />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-neutral-100 dark:border-neutral-700">
        <Shimmer className="w-4 h-4 rounded-full flex-shrink-0" />
        <Shimmer className="h-3 w-44" />
      </div>
    </div>

    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-700 shadow-sm">
        <p className="text-sm sm:text-base font-medium text-primary-600 dark:text-primary-400">
          Cargando agenda...
        </p>
      </div>
    </div>
  </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const WIDGET_MIN_HEIGHT = 980;

const FALLBACK_MS = 10_000; // show widget after 10 s even if event never fires

const BookCallPage: React.FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Fallback: if Calendly never fires the ready event, reveal widget anyway
    timerRef.current = setTimeout(() => setLoaded(true), FALLBACK_MS);

    const handler = (e: MessageEvent) => {
      if (
        e.origin === 'https://calendly.com' &&
        e.data?.event === 'calendly.event_type_viewed'
      ) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setLoaded(true);
      }
    };
    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-full bg-neutral-100 dark:bg-neutral-900 flex flex-col">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 w-full bg-white dark:bg-neutral-800 border-b border-border-base px-6 py-6 sm:py-8 text-center"
      >
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">
          {t('bookCallBadge', 'Videollamada inicial · Gratis')}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 leading-tight">
          {t('bookCallTitle', 'Agenda una cita conmigo')}
        </h1>
      </motion.div>

      {/* Widget area — explicit height so absolute skeleton and iframe both fill it */}
      <div className="relative w-full" style={{ minHeight: `${WIDGET_MIN_HEIGHT}px` }}>

        {/* Skeleton — sits on top until widget is ready */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10"
            >
              <CalendlySkeleton />
            </motion.div>
          )}
        </AnimatePresence>

        {/* InlineWidget — always mounted, fades in when ready */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <InlineWidget
            url={CALENDLY_URL}
            styles={{ width: '100%', minHeight: `${WIDGET_MIN_HEIGHT}px`, height: '100%' }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default BookCallPage;








