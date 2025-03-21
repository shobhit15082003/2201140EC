const numService = require('../service/calciService');
const {fetchNumbers} = require('../service/calciService');

// In-memory window to store recent unique numbers
let numberWindow = [];

exports.getNums = async (req, res) => {
    const { type } = req.params;
    const windowSize = parseInt(process.env.WINDOW_SIZE, 10) || 10; // Default to 10 if not set

    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).json({ error: "Invalid number ID. Use 'p', 'f', 'e', or 'r'." });
    }

    const prevState = [...numberWindow];

    try {
        const nums = await fetchNumbers(type);
        const uniqueNums = nums.filter(n => !numberWindow.includes(n));

        numberWindow = [...numberWindow, ...uniqueNums].slice(-windowSize);

        const avg = numberWindow.length
            ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2)
            : 0;

        res.json({
            windowPrevState: prevState,
            windowCurrState: numberWindow,
            numbers: nums,
            avg: parseFloat(avg)
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Failed to fetch numbers no' });
    }
};
