// API service for image enhancement
import { API_CONFIG } from '../config';

const API_KEY = API_CONFIG.IMAGE_ENHANCER_API_KEY;
const API_BASE_URL = "https://techhk.aoscdn.com/api/tasks/visual/scale";

/**
 * Creates an image enhancement task
 * @param {File} imageFile - The image file to enhance
 * @returns {Promise<string>} - The task ID
 */
export const createEnhancementTask = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("type", "clean"); // Use 'face' for portraits
    formData.append("return_type", "1"); // Return image URL
    
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
      },
      body: formData,
    });

    const data = await response.json();
    
    if (data.status === 200 && data.data?.task_id) {
      return data.data.task_id;
    } else {
      throw new Error(data.message || "Failed to create enhancement task");
    }
  } catch (error) {
    console.error("Error creating enhancement task:", error);
    throw error;
  }
};

/**
 * Gets the result of an image enhancement task
 * @param {string} taskId - The task ID
 * @returns {Promise<Object>} - The task result
 */
export const getTaskResult = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });

    const data = await response.json();
    
    if (data.status === 200) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to get task result");
    }
  } catch (error) {
    console.error("Error getting task result:", error);
    throw error;
  }
};

/**
 * Polls for the task result until it's complete
 * @param {Function} fn - The function to poll
 * @param {number} delay - The delay between polls in ms
 * @param {number} timeout - The timeout in ms
 * @returns {Promise<Object>} - The task result
 */
export const polling = async (fn, delay = 1000, timeout = 30000) => {
  if (!fn) {
    throw new Error('Function is required');
  }
  
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (error && typeof error === 'object' && 'data' in error) {
      throw new Error(JSON.stringify(error, null, 2));
    }
    
    if (timeout <= 0) {
      throw new Error('Polling timeout');
    }
    
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
    
    return polling(fn, delay, timeout - delay);
  }
};

/**
 * Enhances an image using the API
 * @param {File} imageFile - The image file to enhance
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<string>} - The enhanced image URL
 */
export const enhanceImage = async (imageFile, onProgress) => {
  try {
    // Create the enhancement task
    const taskId = await createEnhancementTask(imageFile);
    
    // Poll for the result
    let progress = 0;
    const result = await polling(async () => {
      const taskResult = await getTaskResult(taskId);
      
      // Update progress
      if (taskResult.progress > progress) {
        progress = taskResult.progress;
        if (onProgress) {
          onProgress(progress);
        }
      }
      
      // Check if the task is complete
      if (taskResult.progress >= 100 && taskResult.state === 1) {
        return taskResult;
      }
      
      throw null; // Continue polling
    });
    
    return result.image; // Return the enhanced image URL
  } catch (error) {
    console.error("Error enhancing image:", error);
    throw error;
  }
}; 