const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const csvService = require('../services/csvParser');


exports.uploadRoute = [
upload.single('file'),
async (req, res) => {
try{
const file = req.file;
if(!file) return res.status(400).json({error:'file required'});
const job = await csvService.ingestFileStream(file.path, { filename: file.originalname });
res.json({ jobId: job._id, rows: job.rows });
}catch(err){
res.status(500).json({ error: err.message });
}
}
];
