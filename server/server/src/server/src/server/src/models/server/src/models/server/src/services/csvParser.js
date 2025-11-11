const fs = require('fs');
const csv = require('csv-parser');
const BillingLine = require('../models/BillingLine');
const IngestJob = require('../models/IngestJob');
const validator = require('../utils/validator');


async function ingestFileStream(path, meta={filename: path}){
const job = new IngestJob({ filename: meta.filename, rows: 0, status: 'running', startedAt: new Date() });
await job.save();


return new Promise((resolve, reject)=>{
const stream = fs.createReadStream(path).pipe(csv());
let rows = 0;
stream.on('data', async (row) => {
stream.pause();
try{
const canonical = validator.normalizeRow(row);
// idempotent insert: use unique key from raw (e.g. invoice + line item id) but here naive approach
await BillingLine.create({ ...canonical, raw: row });
rows++;
job.rows = rows;
if(rows % 1000 === 0) await job.save();
}catch(err){
job.errors.push(err.message);
}
stream.resume();
});
stream.on('end', async ()=>{
job.status = 'finished';
job.finishedAt = new Date();
job.rows = rows;
await job.save();
resolve(job);
});
stream.on('error', async (err)=>{
job.status = 'failed';
job.errors.push(err.message);
await job.save();
reject(err);
});
});
}


module.exports = { ingestFileStream };
