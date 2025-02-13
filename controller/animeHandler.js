const Anime = require('../model/animeSchema');
const AnimeList = require('../model/animeListSchema');

const fetchAnime = async (req, res) => {
	try {
		const data = await Anime.find();
		const anime = data.map((anime) => ({
			_id: anime._id.toString(),
			anime_id: anime.anime_id,
			name: anime.name,
			score: anime.score,
			genres: anime.genres,
			episode: anime.episode,
			year: anime.year,
			image: anime.img_url,
		}));

		res.json(anime);
	} catch (error) {
		res.status(500).json({ error: 'Gagal Mendapatkan data Anime' });
	}
};

const fetchAnimeById = async (req, res) => {
	try {
		const { id } = req.params;
		const anime = await Anime.findById(id);

		if (!anime) {
			return res.status(404).json({ error: 'Anime tidak dapat ditemukan' });
		}

		res.json({
			_id: anime._id.toString(),
			anime_id: anime.anime_id,
			name: anime.name,
			score: anime.score,
			genres: anime.genres,
			episode: anime.episode,
			year: anime.year,
			image: anime.img_url,
		});
	} catch (error) {
		res.status(500).json({ error: 'Gagal saat menerima data anime' });
	}
};

const addAnimeToList = async (req, res) => {
	try {
		const { anime_id, name, score, genres, episode, year, image, status, progEps } =
			req.body;
		const userId = req.user.id;
		const existingAnime = await AnimeList.findOne({ name, status, userId });

		if (existingAnime) {
			return res
				.status(400)
				.json({ message: 'Anime tersebut sudah ada di list kamu' });
		}

		const lastAnime = await AnimeList.findOne({ status, userId })
			.sort({ listNumber: -1 })
			.select('listNumber');

		let listNumber = lastAnime ? lastAnime.listNumber + 1 : 1;

		const newAnime = new AnimeList({
			userId,
			anime_id,
			name,
			score,
			genres,
			episode,
			year,
			img_url: image,
			status,
			progEps,
			listNumber,
		});

		await newAnime.save();
		res.status(201).json({ message: 'Anime berhasil ditambah', anime: newAnime });
	} catch (error) {
		res.status(500).json({ error: 'Gagal menambah Animemu' });
	}
};

const updateAnimeStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const userId = req.user.id;

		if (!status) {
			return res.status(400).json({ message: 'Status dibutuhkan' });
		}

		const anime = await AnimeList.findOne({ _id: id, userId });

		if (!anime) {
			return res.status(404).json({ message: 'Anime tidak ditemukan' });
		}

		anime.status = status;
		await anime.save();

		res.status(200).json({ message: 'Status Anime berhasil diupdate', anime });
	} catch (error) {
		res.status(500).json({ error: 'Gagal saat update status Anime' });
	}
};

const updateAnimeEps = async (req, res) => {
	try {
		const { id } = req.params;
		const { progEps } = req.body;
		const userId = req.user.id;

		if (!progEps) {
			return res.status(400).json({ message: 'Progress dibutuhkan' });
		}

		const anime = await AnimeList.findOne({ _id: id, userId });

		if (!anime) {
			return res.status(404).json({ message: 'Anime tidak ditemukan' });
		}

		anime.progEps = progEps;
		await anime.save();

		res.status(200).json({ message: 'Episode Anime berhasil diupdate', anime });
	} catch (error) {
		res.status(500).json({ error: 'Gagal mengupdate episode Anime' });
	}
};

const getAllAnime = async (req, res) => {
	try {
		const userId = req.user.id;
		const anime = await AnimeList.find({ userId });
		res.json(anime);
	} catch (error) {
		res.status(500).json({ error: 'Gagal mendapatkan data Anime' });
	}
};

const getAnimeById = async (req, res) => {
	try {
		const userId = req.user.id;
		const anime = await AnimeList.findOne({ _id: req.params.id, userId });

		if (!anime) {
			return res.status(404).json({ error: 'Anime tidak ditemukan' });
		}
		res.json(anime);
	} catch (error) {
		res.status(500).json({ error: 'Gagal mendapatkan data Anime' });
	}
};

const deleteAnime = async (req, res) => {
	try {
		const userId = req.user.id;
		const animeToDelete = await AnimeList.findOne({ _id: req.params.id, userId });

		if (!animeToDelete) {
			return res.status(404).json({ error: 'Anime tidak ditemukan' });
		}

		const deletedListNumber = animeToDelete.listNumber;

		await AnimeList.findByIdAndDelete(req.params.id);

		await AnimeList.updateMany(
			{ userId, listNumber: { $gt: deletedListNumber } },
			{ $inc: { listNumber: -1 } }
		);

		res.json({ message: 'Anime berhasil dihapus dari list' });
	} catch (error) {
		res.status(500).json({ error: 'Gagal menghapus Anime' });
	}
};

module.exports = {
	fetchAnime,
	fetchAnimeById,
	addAnimeToList,
	updateAnimeStatus,
	getAllAnime,
	getAnimeById,
	deleteAnime,
	updateAnimeEps,
};
