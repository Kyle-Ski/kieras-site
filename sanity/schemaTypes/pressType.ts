import { defineType } from 'sanity';

export const pressType = defineType({
  name: 'press',
  title: 'Press Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'publication', title: 'Publication', type: 'string' },
    { name: 'link', title: 'Link', type: 'url' },
    { name: 'date', title: 'Date', type: 'datetime' },
    { name: 'summary', title: 'Summary', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
});
