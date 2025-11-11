const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BillingLineSchema = new Schema({
invoice_id: String,
payer_account_id: String,
linked_account_id: String,
record_type: String,
product_name: String,
usage_type: String,
operation: String,
availability_zone: String,
item_description: String,
usage_start_date: Date,
usage_end_date: Date,
usage_quantity: Number,
blended_cost: Number,
unblended_cost: Number,
resource_ids: [String],
tags: Schema.Types.Mixed, // store tags as key:value object
raw: Schema.Types.Mixed // raw original CSV row (for drilldown)
}, { timestamps: true });


BillingLineSchema.index({ payer_account_id: 1 });
BillingLineSchema.index({ product_name: 1 });
BillingLineSchema.index({ usage_start_date: 1 });


module.exports = mongoose.model('BillingLine', BillingLineSchema);
