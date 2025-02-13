const express = require('express');
const {
	fetchAnime,
	addAnimeToList,
	updateAnimeStatus,
	getAllAnime,
	getAnimeById,
	deleteAnime,
	updateAnimeEps,
	fetchAnimeById,
} = require('../controller/animeHandler');
const authMiddleware = require('../middleware/middleware');

const anime = express.Router();

anime.get('/fetch-anime', fetchAnime);
anime.get('/fetch-anime/:id', fetchAnimeById);
anime.post('/add', authMiddleware, addAnimeToList);
anime.put('/update/:id', authMiddleware, updateAnimeStatus);
anime.put('/updateEps/:id', authMiddleware, updateAnimeEps);
anime.get('/', authMiddleware, getAllAnime);
anime.get('/:id', authMiddleware, getAnimeById);
anime.delete('/delete/:id', authMiddleware, deleteAnime);

module.exports = anime;
