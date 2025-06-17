export function formatPrice(priceCents) {
const dollars = (Math.round(priceCents)/100);
return dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}