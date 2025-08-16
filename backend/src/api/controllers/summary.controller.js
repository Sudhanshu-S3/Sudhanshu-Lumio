const generateSummary = async (req, res) => {
    res.status(200).json({ message: 'Summary routes have working correctly.'});
}

module.exports = {
    generateSummary,
};