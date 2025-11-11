const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IngestJob = new Schema({
filename: String,
rows: Number,
status: String,
startedAt: Date,
finishedAt: Date,
errors: [String]
});
module.exports = mongoose.model('IngestJob', IngestJob);
