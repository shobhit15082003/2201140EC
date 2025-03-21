const axios = require('axios');
const { fetchAuthToken } = require('./authService');
require('dotenv').config();

const API_MAP = {
    p: 'primes',
    f: 'fibo',
    e: 'even',
    r: 'rand',
};

const fetchNumbers = async (type) => {
    const path = API_MAP[type];
    if (!path) {
        console.warn(`Invalid type '${type}' provided.`);
        return [];
    }

    const url = `${process.env.THIRD_PARTY_BASE_URL}/${path}`;

    try {
        const token = await fetchAuthToken();

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 500,
        });

        return Array.isArray(response.data?.numbers) ? response.data.numbers : [];
    } catch (error) {
        return [];
    }
};

module.exports = { fetchNumbers };
