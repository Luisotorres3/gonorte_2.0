/**
 * @file CatalogItem.tsx
 * @description Defines a component to display a single item in a catalog.
 * It includes details like title, description, image, price, and action buttons.
 */
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Props for the CatalogItem component.
 */
export interface CatalogItemProps {
  /** The title of the catalog item. */
  title: string;
  /** A brief description of the item. */
  description: string;
  /** Optional URL for the item's image. */
  imageUrl?: string;
  /** Optional price of the item, formatted as a string (e.g., "$19.99"). */
  price?: string;
  /** Optional text for the action button (e.g., "View Details", "Add to Cart"). */
  actionText?: string;
  /** Optional callback function to be executed when the action button is clicked. */
  onAction?: () => void;
  /** Optional array of strings for displaying category tags or labels. */
  tags?: string[];
}

/**
 * Placeholder SVG for catalog item images if no imageUrl is provided.
 */
const PlaceholderItemImage: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="100%"
    height="200" // Fixed height for consistency, width will be 100% of parent
    viewBox="0 0 400 200" // Aspect ratio for the content within SVG
    className={`bg-neutral-surface dark:bg-neutral-border ${className || ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="200" fill="currentColor" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontSize="24px" className="fill-text-muted dark:fill-text-muted-dark">
      Image
    </text>
  </svg>
);

/**
 * CatalogItem component displays a single product or service item in a card format.
 * Features an optional image, title, description, price, tags, and an action button.
 *
 * @param {CatalogItemProps} props The component props.
 * @returns {JSX.Element} The rendered CatalogItem card.
 */
const CatalogItem: React.FC<CatalogItemProps> = ({
  title,
  description,
  imageUrl,
  price,
  actionText,
  onAction,
  tags,
}) => {
  return (
    <motion.div
      className="bg-surface rounded-radius-lg shadow-lg overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <PlaceholderItemImage className="h-48" />
      )}

      <div className="p-space-md flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-space-xs">
          {title}
        </h3>
        <p className="text-text-muted text-sm mb-space-sm flex-grow min-h-[60px]">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="mb-space-sm flex flex-wrap gap-space-xs">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-accent/20 text-accent-dark dark:bg-accent/30 dark:text-accent-light px-2 py-1 rounded-radius-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {price && (
          <p className="text-lg font-bold text-text-default dark:text-text-default-dark mb-space-md">
            {price}
          </p>
        )}

        {actionText && onAction && (
          <button
            onClick={onAction}
            className="mt-auto w-full bg-primary hover:opacity-90 text-white font-semibold py-space-sm px-space-md rounded-radius-md transition-opacity"
            aria-label={`${actionText} for ${title}`}
          >
            {actionText}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CatalogItem;
