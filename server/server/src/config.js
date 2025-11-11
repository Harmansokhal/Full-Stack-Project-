require('dotenv').config();
module.exports = {
port: process.env.PORT || 4000,
mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/costopt',
jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
cronSchedule: process.env.CRON_SCHEDULE || '0 2 * * *'
};
