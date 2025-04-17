import { useState } from 'react';
import toast from 'react-hot-toast';
import { makeRequest } from '../utils/api';

// Assume sendMessage function is passed in or obtained from context/store
const useUploadFile = (sendMessageCallback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadFile = async (file) => {
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file); // Field name 'file' as planned

        try {
            // Get the API base URL based on environment
            const isProduction = window.location.hostname !== 'localhost';
            const API_BASE_URL = isProduction
                ? 'https://real-time-chat-application-chatterbox.onrender.com/api'
                : '/api';
                
            // Direct fetch for file upload (can't use makeRequest because of FormData)
            const res = await fetch(`${API_BASE_URL}/messages/upload`, {
                method: 'POST',
                credentials: 'include',
                // No Content-Type header as the browser will set it with the boundary parameter
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to upload file');
            }

            if (data.fileUrl) {
                // File uploaded successfully, now send message with the URL
                if (typeof sendMessageCallback === 'function') {
                    // Send the URL as the message content
                    await sendMessageCallback(data.fileUrl); 
                    toast.success('File uploaded and message sent!');
                } else {
                    console.warn('sendMessageCallback is not a function in useUploadFile');
                    toast.success('File uploaded, but message could not be sent automatically.');
                }
            } else {
                throw new Error('File URL not found in response');
            }

        } catch (err) {
            console.error("Upload error:", err);
            const errorMessage = err.message || 'An unknown error occurred during upload.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, uploadFile };
};

export default useUploadFile;