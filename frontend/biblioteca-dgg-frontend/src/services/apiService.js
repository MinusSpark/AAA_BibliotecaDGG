import axios from 'axios';

const API_URL = 'http://localhost/api';

export const fetchBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`); 
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return null;
    }
};


export const notifyAvailability = async (email, bookTitle) => {
    try {
        const response = await axios.post(`${API_URL}/notify-availability`, { 
            email,
            bookTitle
        });
        return response.data;
    } catch (error) {
        console.error('Error notifying availability:', error);
        return null;
    }
};

