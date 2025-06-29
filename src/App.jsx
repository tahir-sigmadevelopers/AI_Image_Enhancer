import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ImagePreview from './components/ImagePreview'
import ImageUpload from './components/ImageUpload'
import { ImageProvider } from './components/ImageContext'

const App = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/image-preview' element={<ImagePreview />} />
          <Route path='/image-upload' element={<ImageUpload />} />
        </Routes>
      </div>
    </ImageProvider>
  )
}

export default App