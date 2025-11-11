function parseNumber(v){
const n = Number(v);
return Number.isNaN(n) ? 0 : n;
}


function normalizeRow(row){
// very small example of canonicalization
return {
invoice_id: row.InvoiceID || row.invoice_id || null,
payer_account_id: row.PayerAccountId || row.payer_account_id || row.PayerAccountId || null,
linked_account_id: row.LinkedAccountId || null,
product_name: row.ProductName || row.product_name || row.Product || 'Unknown',
usage_type: row.UsageType || null,
availability_zone: row.AvailabilityZone || row.availability_zone || null,
usage_start_date: row.UsageStartDate ? new Date(row.UsageStartDate) : new Date(row['usage_start_date'] || Date.now()),
usage_end_date: row.UsageEndDate ? new Date(row.UsageEndDate) : new Date(row['usage_end_date'] || Date.now()),
usage_quantity: parseNumber(row.UsageQuantity || row.usage_quantity || 0),
unblended_cost: parseNumber(row.UnblendedCost || row.unblended_cost || 0),
blended_cost: parseNumber(row.BlendedCost || row.blended_cost || 0),
resource_ids: (row.ResourceIds || '').split(',').map(s=>s.trim()).filter(Boolean),
tags: {} // you could parse tags if present as JSON/semicolon list
};
}


module.exports = { normalizeRow };
