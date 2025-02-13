require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const user = require('./routes/user');
const anime = require('./routes/anime');
const drama = require('./routes/drama');

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 200,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test API
app.get('/', (req, res) => {
	res.send('Hello from Node API Server Updated');
});

// Routes
app.use('/', user);
app.use('/anime', anime);
app.use('/drama', drama);

// MongoDB Connection
async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}`);
	} catch (error) {
		console.error('❌ MongoDB Connection Error:', error.message);
		process.exit(1);
	}
}

connectDB();

module.exports = app;
