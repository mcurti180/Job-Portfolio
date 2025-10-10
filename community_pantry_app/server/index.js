// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../db/index');
const userRoutes = require('../db/routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
