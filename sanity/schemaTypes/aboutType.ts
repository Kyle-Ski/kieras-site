import { defineType } from 'sanity';

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'image', title: 'Image', type: 'image' },
  ],
});