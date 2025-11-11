const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const authRoutes = require('./routes/auth');
const ingestRoutes = require('./routes/ingest');
const summariesRoutes = require('./routes/summaries');
const nightlyJob = require('./jobs/nightly');


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/ingest', ingestRoutes);
app.use('/api/summaries', summariesRoutes);


mongoose.connect(config.mongoUrl)
.then(()=>{
console.log('Mongo connected');
app.listen(config.port, ()=> console.log('Server listening', config.port));
})
.catch(err => console.error(err));


// start scheduled job
nightlyJob.start();
