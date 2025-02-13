const express = require('express');
const {
	fetchDrama,
	fetchDramaById,
	addDramaToList,
	updateDramaStatus,
	getAllDrama,
	getDramaById,
	deleteDrama,
	updateDramaEps,
} = require('../controller/dramaHander');
const authMiddleware = require('../middleware/middleware');

const drama = express.Router();

drama.get('/fetch-drama', fetchDrama);
drama.get('/fetch-drama/:id', fetchDramaById);
drama.post('/add', authMiddleware, addDramaToList);
drama.put('/update/:id', authMiddleware, updateDramaStatus);
drama.put('/updateEps/:id', authMiddleware, updateDramaEps);
drama.get('/', authMiddleware, getAllDrama);
drama.get('/:id', authMiddleware, getDramaById);
drama.delete('/delete/:id', authMiddleware, deleteDrama);

module.exports = drama;
