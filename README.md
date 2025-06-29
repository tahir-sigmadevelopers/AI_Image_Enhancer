# AI Image Enhancer

A React application that enhances images using an AI API. Upload an image, and the app will process it to improve quality and resolution.

## Features

- Drag and drop image upload
- Real-time enhancement progress tracking
- Side-by-side comparison of original and enhanced images
- Download enhanced images
- Responsive design

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Add your API key:
   - Open `src/config.js`
   - Replace `YOUR_API_KEY` with your actual API key from [AOS API](https://techhk.aoscdn.com/)

4. Run the development server:
   ```
   npm run dev
   ```

## API Usage

This application uses the AOS API for image enhancement. The API provides:

- Image quality enhancement
- Resolution upscaling (up to 4x)
- Support for various image formats (JPG, PNG, WEBP)

## How It Works

1. Upload an image by dragging and dropping or clicking the upload area
2. The app sends the image to the enhancement API
3. Progress is tracked in real-time
4. Once complete, the enhanced image is displayed alongside the original
5. Download the enhanced image using the download button

## Technologies Used

- React
- Tailwind CSS
- Vite
- AOS Image Enhancement API
