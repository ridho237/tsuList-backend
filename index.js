require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const user = require('./routes/user');
const anime = require('./routes/anime');
const drama = require('./routes/drama');

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello from Node API Server Updated');
});

app.use('/', user);
app.use('/anime', anime);
app.use('/drama', drama);

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('✅ Connected to MongoDB');
	} catch (error) {
		console.error('❌ MongoDB Connection Error:', error);
	}
}

connectDB();

module.exports = app;
