/**
 * @file CarouselSection.tsx
 * @description Defines the Carousel section for the HomePage.
 * It showcases a series of images or items in an interactive carousel.
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeftIcon, ChevronRightIcon } from '../icons/ChevronIcons'; // Placeholder, create if needed

// Fallback Chevron Icons if not provided
const DefaultChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const DefaultChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;


interface CarouselItem {
  id: string;
  content: React.ReactNode; // Can be an image URL, text, or a component
  altText: string;
}

// Placeholder SVG for images
const PlaceholderImage = ({ text, className }: { text: string, className?: string }) => (
  <svg viewBox="0 0 400 200" className={`w-full h-full bg-neutral-surface dark:bg-neutral-border ${className || ''}`} xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="200" fill="currentColor" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontSize="24px" fill="#FFF" className="text-text-default dark:text-text-default-dark">
      {text}
    </text>
  </svg>
);


const items: CarouselItem[] = [
  { id: 'item1', content: <PlaceholderImage text="Showcase Item 1" />, altText: 'Showcase Item 1 Description' },
  { id: 'item2', content: <PlaceholderImage text="Showcase Item 2" />, altText: 'Showcase Item 2 Description' },
  { id: 'item3', content: <PlaceholderImage text="Showcase Item 3" />, altText: 'Showcase Item 3 Description' },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

/**
 * CarouselSection component for the landing page.
 * Displays a simple image or content carousel with navigation.
 * @returns {JSX.Element} The rendered CarouselSection component.
 */
const CarouselSection: React.FC = () => {
  const { t } = useTranslation();
  const [[page, direction], setPage] = useState([0, 0]); // page index and swipe direction

  const itemIndex = (page % items.length + items.length) % items.length; // Wraps page index

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="w-full bg-surface dark:bg-neutral-background py-16 md:py-24">
      <div className="container mx-auto px-space-md text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-space-lg text-default"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {t('carouselTitle', 'Product Showcase')}
        </motion.h2>
        <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-radius-lg shadow-lg">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="absolute w-full h-full"
              custom={direction}
              variants={{
                enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
            >
              {items[itemIndex].content}
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
            onClick={() => paginate(-1)}
            aria-label={t('previousSlide', 'Previous Slide')}
          >
            <DefaultChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
            onClick={() => paginate(1)}
            aria-label={t('nextSlide', 'Next Slide')}
          >
            <DefaultChevronRight />
          </button>
        </div>
        <div className="flex justify-center mt-space-md">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > itemIndex ? 1 : -1])}
              className={`w-3 h-3 rounded-full mx-1 transition-colors
                ${itemIndex === index ? 'bg-primary' : 'bg-neutral-border hover:bg-neutral-border-dark'}`}
              aria-label={t('goToSlide', 'Go to slide') + ` ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
