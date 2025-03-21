const axios = require("axios");
require("dotenv").config();

let cachedToken = null;
let tokenExpiry = 0;

const fetchAuthToken = async () => {
    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    try {
        const response = await axios.post(`${process.env.THIRD_PARTY_BASE_URL}/auth`, {
            companyName: process.env.COMPANY_NAME,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            ownerName: process.env.OWNER_NAME,
            ownerEmail: process.env.OWNER_EMAIL,
            rollNo: process.env.ROLL_NO
        });

        cachedToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 5000; 

        return cachedToken;
    } catch (error) {
        console.error("Failed to fetch auth token:", error.message);
        throw new Error("Authentication failed");
    }
};

module.exports = { fetchAuthToken };