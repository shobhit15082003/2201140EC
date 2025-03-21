const axios = require('axios');
const { fetchAuthToken } = require('./authService');  
require('dotenv').config();  

const endpoints = {
    p: 'https://20.244.56.144/test/primes',
    f: 'https://20.244.56.144/test/fibo',
    e: 'https://20.244.56.144/test/even',
    r: 'https://20.244.56.144/test/rand',
};

const fetchNums = async (type) => {
    const url = endpoints[type];
    if (!url) {
        console.warn(`Invalid type '${type}' provided.`);
        return null;
    }

    try {
        const token = await fetchAuthToken();  

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}` 
            },
            timeout: 500
        });

        return Array.isArray(response.data?.numbers) ? response.data.numbers : [];
    } catch (e) {
        console.log(e.message);
        console.error(e);
        return null;
    }
};

module.exports = fetchNums;
