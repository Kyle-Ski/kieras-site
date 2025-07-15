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
    link: "/press#The-Summer-of-Bad-Ideas"
  },
  {
    title: 'How to Break a Heart',
    imageUrl:
      '/How_to_Break_a_Heart.jpeg',
    link: "/press#How-to-Break-a-Heart"
  },
  {
    title: 'Fetching',
    imageUrl:
      '/Fetching.jpeg',
    link: "/press#Fetching"
  },
  {
    title: 'Dumme Ideen für einen guten Sommer',
    imageUrl:
      '/Kiera_Geman.jpg',
    link: '/press#Dumme-Ideen-für-einen-guten-Sommer',
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
        <p className="font-header" dangerouslySetInnerHTML={{ __html: item.title }} />
        {item.link && (
          <a
            href={item.link}
            className="u-link-block u-link-inherit"
          />
        )}
      </div>
    ))}
  </div>
  );
}