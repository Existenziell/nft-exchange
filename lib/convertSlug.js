export default function convertSlug(slug) {
  return slug.split(' ').join('-').toLowerCase()
}
