import React from 'react'
import { useImageContext } from './ImageContext'

const ImagePreview = () => {
  const { originalImage, enhancedImage, error, isLoading } = useImageContext();

  if (!originalImage) return null;

  const downloadImage = () => {
    if (!enhancedImage) return;
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = enhancedImage;
    a.download = 'enhanced-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <div className="bg-gray-900 text-white text-center py-2 rounded-t-lg">
          Original Image
        </div>
        <div className="border border-gray-300 rounded-b-lg h-64 md:h-80 overflow-hidden bg-white flex items-center justify-center">
          <img 
            src={originalImage} 
            alt="Original" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
          Enhanced Image
        </div>
        <div className="border border-gray-300 rounded-b-lg h-64 md:h-80 overflow-hidden bg-white flex items-center justify-center">
          {enhancedImage ? (
            <div className="relative w-full h-full">
              <img 
                src={enhancedImage} 
                alt="Enhanced" 
                className="max-w-full max-h-full object-contain mx-auto"
              />
              <button 
                onClick={downloadImage}
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
                title="Download enhanced image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          ) : (
            <div className="text-gray-400 text-center">
              {isLoading ? "Processing..." : "Waiting for enhancement"}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImagePreview