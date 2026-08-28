export function newOrderNumber() {
  const d = new Date();
  const year = d.getUTCFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ASTRO-${year}-${random}`;
}
