'use client';

import React from 'react';

interface ExpandableItem {
  title: string;
  imageUrl: string;
  link?: string;
}

const expandableItems: ExpandableItem[] = [
  {
    title: 'The Summer of Bad Ideas',
    imageUrl:
      '/The_Summer_Of_Bad_Ideas.jpeg',
    link: 'https://www.google.com/books/edition/The_Summer_of_Bad_Ideas/6XDUDAAAQBAJ?hl=en&gbpv=0',
  },
  {
    title: 'How to Break a Heart',
    imageUrl:
      '/How_to_Break_a_Heart.jpeg',
    link: 'https://www.google.com/books/edition/How_to_Break_a_Heart/DmkuCwAAQBAJ?hl=en&gbpv=0',
  },
  {
    title: 'Fetching',
    imageUrl:
      '/Fetching.jpeg',
    link: 'https://www.google.com/books/edition/Fetching/4ZDNZDme3JAC?hl=en&gbpv=0',
  },
  {
    title: 'Book 4',
    imageUrl:
      'https://picsum.photos/200/300',
    link: 'series/the-reivers/',
  },
  
];

export default function ImageAccordion() {
  return (
    <div className="hover-flex-wrapper">
    {expandableItems.map((item, index) => (
      <div
        key={index}
        className="hover-expandable-item"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      >
        <p dangerouslySetInnerHTML={{ __html: item.title }} />
        {item.link && (
          <a
            href={item.link}
            className="u-link-block u-link-inherit"
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </div>
    ))}
  </div>
  );
}