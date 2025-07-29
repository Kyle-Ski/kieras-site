import { defineType } from 'sanity';

export const pressType = defineType({
  name: 'press',
  title: 'Press Item',
  type: 'document',
  fields: [
    {
      name: 'press-order',
      type: 'number',
      description: 'The order we would like the press items to be in, 1 start -> 10 last.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Book Title',
      type: 'string',
      description: 'The title of the book being featured.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Book Summary',
      type: 'text',
      description: 'A short summary of the book.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Book Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Enables cropping
      },
    },
    {
      name: 'link',
      title: 'Purchase Book Link',
      type: 'string',
      description: 'The link we want to send the user to, to purchase the book.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quotes',
      title: 'Press Quotes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              description: 'The content of the press quote.',
              validation: (Rule) => Rule.required().max(500),
            },
            {
              name: 'publication',
              title: 'Publication',
              type: 'string',
              description: 'The name of the publication.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'A link to the full article or review.',
            },
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',
              description: 'The date the quote was published.',
            },
          ],
          preview: {
            select: {
              title: 'publication',
              subtitle: 'quote',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'image',
    },
  },
});
