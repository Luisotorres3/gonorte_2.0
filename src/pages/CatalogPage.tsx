/**
 * @file CatalogPage.tsx
 * @description Defines the Catalog page, which displays a collection of products or services.
 * Items are presented in a responsive grid format.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedPage from '../components/motion/AnimatedPage';
import CatalogItem, { type CatalogItemProps } from '../components/catalog/CatalogItem';

// Placeholder data for catalog items
const catalogItemsData: CatalogItemProps[] = [
  {
    title: 'Cosmic Explorer Subscription',
    description: 'Unlock exclusive access to our premium content, tools, and community features. Explore the universe like never before.',
    imageUrl: 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1', // Example Pexels image
    price: '$29.99/month',
    actionText: 'Subscribe Now',
    onAction: () => alert('Subscribe Now clicked for Cosmic Explorer!'),
    tags: ['Subscription', 'Premium', 'Space'],
  },
  {
    title: 'Starship Model Kit',
    description: 'Build your own detailed replica of the famous XS-1 Starship. Perfect for hobbyists and collectors.',
    // No imageUrl, will use placeholder
    price: '$79.99',
    actionText: 'Add to Cart',
    onAction: () => alert('Add to Cart clicked for Starship Model!'),
    tags: ['Model Kit', 'Collectibles'],
  },
  {
    title: 'Nebula Observation Guide',
    description: 'A comprehensive digital guide to observing and understanding various nebulae. Includes charts and expert tips.',
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    price: '$14.99',
    actionText: 'View Details',
    onAction: () => alert('View Details for Nebula Guide!'),
    tags: ['Digital', 'Guide', 'Astronomy'],
  },
  {
    title: 'Zero-G Coffee Mug',
    description: 'The perfect mug for your space adventures (or just your morning coffee). Spill-proof technology not included.',
    price: '$24.50',
    actionText: 'Buy Now',
    onAction: () => alert('Zero-G Mug purchased!'),
    tags: ['Merchandise', 'Fun'],
  },
  {
    title: 'Galaxy Mapping Service',
    description: 'Professional service to map uncharted regions of your newly discovered galaxy. Includes detailed star charts.',
    imageUrl: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    price: 'Contact for Quote',
    actionText: 'Request Info',
    onAction: () => alert('Info requested for Galaxy Mapping!'),
    tags: ['Service', 'Professional'],
  },
    {
    title: 'Anti-Gravity Boots (Prototype)',
    description: 'Experimental footwear for brief periods of reduced gravitational effect. Use with caution. Not liable for ceiling impacts.',
    // No imageUrl
    price: '$999.99 (Pre-order)',
    actionText: 'Pre-order Now',
    onAction: () => alert('Anti-Gravity Boots pre-ordered!'),
    tags: ['Experimental', 'Tech', 'Limited'],
  },
];

/**
 * CatalogPage displays a grid of available products or services.
 * It uses the CatalogItem component to render each item.
 * @returns {JSX.Element} The rendered CatalogPage.
 */
const CatalogPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AnimatedPage className="container mx-auto px-space-md py-12">
      <h1 className="text-4xl font-bold mb-space-lg text-center text-primary dark:text-primary-dark">
        {t('catalogTitle', 'Our Products & Services')}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {catalogItemsData.map((item, index) => (
          <CatalogItem
            key={item.title + index} // Using title + index for key in case titles are not unique
            title={t(item.title.toLowerCase().replace(/\s+/g, '_'), item.title)}
            description={t(item.description.toLowerCase().replace(/\s+/g, '_'), item.description)}
            imageUrl={item.imageUrl}
            price={item.price}
            actionText={item.actionText ? t(item.actionText.toLowerCase().replace(/\s+/g, '_'), item.actionText) : undefined}
            onAction={item.onAction}
            tags={item.tags}
          />
        ))}
      </div>
    </AnimatedPage>
  );
};

export default CatalogPage;
