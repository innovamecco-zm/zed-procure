/**
 * Dynamically loads all images from the sliderImages folder
 * This allows automatic scaling without manual imports
 */
export const loadAssetImages = () => {
  const images = import.meta.glob('../assets/sliderImages/*.{jpg,jpeg,png,gif,webp}', { eager: true });
  
  // Map to get URLs
  const imageList = Object.values(images)
    .map((module) => module.default)
    .filter(Boolean);

  return imageList;
};

/**
 * Slider helper: mark a slide and the one after it as loaded, so images are
 * only downloaded once the slider reaches them (the next one is preloaded so
 * the transition stays smooth).
 */
export const withSlideLoaded = (loaded, index, count) => {
  const next = (index + 1) % count;
  if (loaded.has(index) && loaded.has(next)) return loaded;
  return new Set(loaded).add(index).add(next);
};

/**
 * Get a specific subset of images for the hero slider
 * You can customize this to pick specific images or patterns
 */
export const getHeroSliderImages = () => {
  const allImages = loadAssetImages();
  
  // Return all images, or customize filtering logic here
  // For example, you could filter by specific names or patterns
  return allImages;
};
