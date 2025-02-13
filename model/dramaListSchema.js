const mongoose = require('mongoose');

const DramaListSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		drama_id: { type: Number, required: true },
		listNumber: { type: Number },
		name: { type: String, required: true },
		year: { type: String },
		genre: { type: String },
		score: { type: Number },
		img_url: { type: String },
		episode: { type: String },
		status: { type: String },
		progEps: { type: Number },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('DramaList', DramaListSchema);
