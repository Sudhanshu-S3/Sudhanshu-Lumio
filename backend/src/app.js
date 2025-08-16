const express = require('express');
const cors = require('cors');
const summaryRoutes = require('./api/routes/summary.routes.js');
const shareRoutes = require('./api/routes/share.routes.js')

const app = express();

app.use(cors());
app.use(express.json());


//Setup testing
app.get('/', (req,res) => {
    res.status(200).json({message:'AI Summarizer Backend is running!'});
})


app.use('/api/summary', summaryRoutes);
app.use('/api/share', shareRoutes);

module.exports = app;