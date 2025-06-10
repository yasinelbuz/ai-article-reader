export function generateSlug(url: string): string {
  return url
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function reverseSlug(slug: string): string {
  return slug
    .replace(/-/g, ' ') // tireleri boşluğa çevir
    .replace(/\b\w/g, char => char.toUpperCase()); // her kelimenin ilk harfini büyük yap
}
