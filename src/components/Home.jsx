import React from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { useImageContext } from './ImageContext'
import Loading from './Loading'

const Home = () => {
    const { isLoading } = useImageContext();
    
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">AI Image Enhancer</h1>
                <p className="text-gray-600">Upload your image and let AI enhance it in seconds!</p>
            </header>
            
            <ImageUpload />
            
            <div className="mt-8">
                <ImagePreview />
            </div>
            
            {isLoading && <Loading />}
            
            <footer className="text-center mt-8 text-sm text-gray-500">
                Powered by @TahirDev. https://tahirdev.vercel.app
            </footer>
        </div>
    )
}

export default Home