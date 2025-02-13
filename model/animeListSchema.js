const mongoose = require('mongoose');

const AnimeListSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		anime_id: { type: Number, required: true },
		listNumber: { type: Number },
		name: { type: String, required: true },
		score: { type: Number },
		genres: { type: String },
		episode: { type: Number },
		year: { type: String },
		img_url: { type: String },
		status: { type: String },
		progEps: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('AnimeList', AnimeListSchema);
