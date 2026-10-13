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
 * Get a specific subset of images for the hero slider
 * You can customize this to pick specific images or patterns
 */
export const getHeroSliderImages = () => {
  const allImages = loadAssetImages();
  
  // Return all images, or customize filtering logic here
  // For example, you could filter by specific names or patterns
  return allImages;
};
