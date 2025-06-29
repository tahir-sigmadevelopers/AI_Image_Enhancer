import React from 'react'
import { useImageContext } from './ImageContext'

const Loading = () => {
  const { progress } = useImageContext();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-4">
          <div className="relative h-12 w-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700">Enhancing your image...</p>
      </div>
    </div>
  )
}

export default Loading