const express = require('express');
const User = express.Router();
const authMiddleware = require('../middleware/middleware');
const {
	signUp,
	login,
	getProfile,
	logout,
	updateProfile,
	deleteAccount,
} = require('../controller/userHandler');

User.post('/signup', signUp);
User.post('/login', login);
User.get('/profile', authMiddleware, getProfile);
User.post('/logout', logout);
User.put('/profile', authMiddleware, updateProfile);
User.delete('/profile', authMiddleware, deleteAccount);

module.exports = User;
