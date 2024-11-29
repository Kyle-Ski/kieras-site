import { type SchemaTypeDefinition } from 'sanity'
import { aboutType } from './aboutType'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { blogPostType } from './blogPostType'
import { pressType } from './pressType'
import { categoryType } from './categoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutType, authorType, blockContentType, blogPostType, categoryType,pressType],
}
