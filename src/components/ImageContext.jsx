import React, { createContext, useState, useContext } from 'react';
import { enhanceImage as enhanceImageApi } from '../services/imageEnhancerApi';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const enhanceImage = async (imageFile) => {
    if (!imageFile) return;
    
    setIsLoading(true);
    setProgress(0);
    setError(null);
    
    try {
      // Call the API service to enhance the image
      const enhancedImageUrl = await enhanceImageApi(imageFile, (progressValue) => {
        setProgress(progressValue);
      });
      
      setEnhancedImage(enhancedImageUrl);
    } catch (error) {
      console.error('Error enhancing image:', error);
      setError('Failed to enhance image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = (file) => {
    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);
    enhanceImage(file);
  };

  return (
    <ImageContext.Provider value={{
      originalImage,
      enhancedImage,
      isLoading,
      progress,
      error,
      uploadImage
    }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
