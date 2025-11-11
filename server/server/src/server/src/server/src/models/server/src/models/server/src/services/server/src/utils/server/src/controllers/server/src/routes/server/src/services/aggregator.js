const BillingLine = require('../models/BillingLine');


async function topNServicesByCost(start, end, n=10){
const pipeline = [
{ $match: { usage_start_date: { $gte: new Date(start), $lte: new Date(end) } } },
{ $group: { _id: '$product_name', cost: { $sum: '$unblended_cost' }, usage: { $sum: '$usage_quantity' } } },
{ $sort: { cost: -1 } },
{ $limit: n }
];
return BillingLine.aggregate(pipeline);
}


async function heatmapByRegion(start, end){
const pipeline = [
{ $match: { usage_start_date: { $gte: new Date(start), $lte: new Date(end) } } },
{ $group: { _id: { region: '$availability_zone', product: '$product_name' }, cost: { $sum: '$unblended_co
