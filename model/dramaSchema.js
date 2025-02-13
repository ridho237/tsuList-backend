const mongoose = require('mongoose');

const DramaSchema = new mongoose.Schema(
	{
		drama_id: { type: Number, required: true },
		name: { type: String, required: true },
		year: { type: String },
		genre: { type: String },
		score: { type: Number },
		img_url: { type: String },
		episode: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Drama', DramaSchema);
