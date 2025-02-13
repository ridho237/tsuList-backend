const Drama = require('../model/dramaSchema');
const DramaList = require('../model/dramaListSchema');

const fetchDrama = async (req, res) => {
	try {
		const data = await Drama.find();
		const drama = data.map((drama) => ({
			_id: drama._id.toString(),
			drama_id: drama.drama_id,
			name: drama.name,
			score: drama.score,
			genre: drama.genre,
			episode: drama.episode,
			year: drama.year,
			image: drama.img_url,
		}));

		res.json(drama);
	} catch (error) {
		res.status(500).json({ error: 'Gagal Mendapatkan data Drama' });
	}
};

const fetchDramaById = async (req, res) => {
	try {
		const { id } = req.params;
		const drama = await Drama.findById(id);

		if (!drama) {
			return res.status(404).json({ error: 'Drama tidak dapat ditemukan' });
		}

		res.json({
			_id: drama._id.toString(),
			drama_id: drama.drama_id,
			name: drama.name,
			score: drama.score,
			genre: drama.genre,
			episode: drama.episode,
			year: drama.year,
			image: drama.img_url,
		});
	} catch (error) {
		res.status(500).json({ error: 'Gagal saat menerima data drama' });
	}
};

const addDramaToList = async (req, res) => {
	try {
		const { drama_id, name, score, genre, episode, year, image, status, progEps } =
			req.body;
		const userId = req.user.id;
		const existingDrama = await DramaList.findOne({ name, status, userId });

		if (existingDrama) {
			return res.status(400).json({ message: 'Drama tersebut sudah ada dilist mu' });
		}

		const lastDrama = await DramaList.findOne({ status })
			.sort({ listNumber: -1 })
			.select('listNumber');

		let listNumber = lastDrama ? lastDrama.listNumber + 1 : 1;

		const newDrama = new DramaList({
			userId,
			drama_id,
			name,
			score,
			genre,
			episode,
			year,
			img_url: image,
			status,
			progEps,
			listNumber,
		});

		await newDrama.save();
		res.status(201).json({ message: 'Drama berhasil ditambah', drama: newDrama });
	} catch (error) {
		res.status(500).json({ error: 'Gagal menambah Dramamu' });
	}
};

const updateDramaStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const userId = req.user.id;

		if (!status) {
			return res.status(400).json({ message: 'Status dibutuhkan' });
		}

		const drama = await DramaList.findOne({ _id: id, userId });

		if (!drama) {
			return res.status(404).json({ message: 'Drama tidak ditemukan' });
		}

		drama.status = status;
		await drama.save();

		res.status(200).json({ message: 'Status Drama berhasil diupdate', drama });
	} catch (error) {
		res.status(500).json({ error: 'Gagal saat update status Drama' });
	}
};

const updateDramaEps = async (req, res) => {
	try {
		const { id } = req.params;
		const { progEps } = req.body;
		const userId = req.user.id;

		if (!progEps) {
			return res.status(400).json({ message: 'Progress dibutuhkan' });
		}

		const drama = await DramaList.findOne({ _id: id, userId });

		if (!drama) {
			return res.status(404).json({ message: 'Drama tidak ditemukan' });
		}

		drama.progEps = progEps;
		await drama.save();

		res.status(200).json({ message: 'Episode Drama berhasil diupdate', drama });
	} catch (error) {
		res.status(500).json({ error: 'Gagal mengupdate episode Drama' });
	}
};

const getAllDrama = async (req, res) => {
	try {
		const userId = req.user.id;
		const drama = await DramaList.find({ userId });
		res.json(drama);
	} catch (error) {
		res.status(500).json({ error: 'Gagal mendapatkan data Drama' });
	}
};

const getDramaById = async (req, res) => {
	try {
		const userId = req.user.id;
		const drama = await DramaList.findOne({ _id: req.params.id, userId });

		if (!drama) {
			return res.status(404).json({ error: 'Drama tidak ditemukan' });
		}
		res.json(drama);
	} catch (error) {
		res.status(500).json({ error: 'Gagal mendapatkan data Drama' });
	}
};

const deleteDrama = async (req, res) => {
	try {
		const userId = req.user.id;
		const dramaToDelete = await DramaList.findOne({ _id: req.params.id, userId });

		if (!dramaToDelete) {
			return res.status(404).json({ error: 'Drama tidak ditemukan' });
		}

		const deletedListNumber = dramaToDelete.listNumber;

		await DramaList.findByIdAndDelete(req.params.id);

		await DramaList.updateMany(
			{ listNumber: { $gt: deletedListNumber } },
			{ $inc: { listNumber: -1 } }
		);

		res.json({ message: 'Drama berhasil dihapus dari list' });
	} catch (error) {
		res.status(500).json({ error: 'Gagal menghapus Drama' });
	}
};

module.exports = {
	fetchDrama,
	fetchDramaById,
	addDramaToList,
	updateDramaStatus,
	updateDramaEps,
	getDramaById,
	getAllDrama,
	deleteDrama,
};
