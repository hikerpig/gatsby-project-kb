import slugify from 'slugify'

export function slugifyTitle(str: string) {
  return slugify(str)
}
