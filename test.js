const axios = require('axios');
const cheerio = require('cheerio');

// Replace this with the Roblox profile URL you want to fetch
const profileUrl = 'https://www.roblox.com/users/profile';

const getUserIdFromProfile = async (profileUrl) => {
    try {
        // Make a GET request to the profile URL
        const response = await axios.get(profileUrl);
        
        // If the request was successful, capture the final URL
        const finalUrl = response.request.res.responseUrl;
        
        // Extract the user ID from the final URL using regex
        const userId = finalUrl.match(/users\/(\d+)\//);

        if (userId) {
            console.log(`User ID: ${userId[1]}`);
            return userId[1];  // Return the user ID
        } else {
            console.log('User ID not found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching the profile:', error);
    }
};

// Run the function
getUserIdFromProfile(profileUrl);
