function cleanString(input: string): string {
  return input
    .replace(/\d+/g, ' ')
    .replace(/[^\w\sáéíóúüñÁÉÍÓÚÜÑ-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function generateSlugByTitle(title: string): string {
  return cleanString(title.split('-')[0].trim().toLowerCase() ?? '').replace(
    / /g,
    '-'
  )
}

export function generateSourceSlug(source: string): string {
  const ignoredParts = ['com', 'org', 'net', 'gov', 'edu', 'www']
  if (source.includes('.')) {
    const cleaned = source.split('.').filter((s) => !ignoredParts.includes(s))
    return cleaned.join('-').toLowerCase()
  }
  return source.toLowerCase()
}
