export const formatPrice = (price) =>
  price === 0 ? 'Free' : `$${price.toFixed(2)}`;

export const formatStatusLabel = (status) => status;

export const truncate = (text, max = 140) =>
  text.length > max ? `${text.slice(0, max).trim()}\u2026` : text;

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
