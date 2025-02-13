const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema(
	{
		anime_id: { type: Number, required: true },
		name: { type: String, required: true },
		score: { type: Number },
		genres: { type: String },
		episode: { type: Number },
		year: { type: String },
		img_url: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Anime', AnimeSchema);
