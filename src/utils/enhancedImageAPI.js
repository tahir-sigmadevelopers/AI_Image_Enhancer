const API_KEY = 'wxmczdcsf7x6700wi';
const BASE_URL = 'https://techhk.aoscdn.com';
export const enhanceImage = async (imageFile) => {
    try {

        //code to upload image to the server
        //POST: /api/tasks/visual/scale ( when we want to upload image to the server we get task_id, then we can use this task_id to fetch the enhanced image)

        const taskId = await uploadImage(imageFile);
        console.log('Image uploaded successfully, taskId:', taskId);
        const enhancedImage = await fetchEnhancedImage(taskId);
        console.log('Enhanced image fetched successfully, enhancedImage:', enhancedImage);


        //code to fetch enhanced image
        //GET: /api/tasks/visual/scale/{task_id}

        // return enhancedImage;


        //code to download enhanced image
        // /api/tasks/visual/scale/result/download

    } catch (error) {
        console.error('Error enhancing image:', error);
        throw error;
    }
}


const uploadImage = async (imageFile) => {
    try {

        return 'task_id';
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

const fetchEnhancedImage = async (taskId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/tasks/visual/scale/${taskId}?api_key=${API_KEY}`);
    } catch (error) {
        console.error('Error fetching enhanced image:', error);
        throw error;
    }
}