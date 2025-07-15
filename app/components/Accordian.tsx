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
    link: "/press#The-Summer-of-Bad-Ideas"//'https://www.google.com/books/edition/The_Summer_of_Bad_Ideas/6XDUDAAAQBAJ?hl=en&gbpv=0',
  },
  {
    title: 'How to Break a Heart',
    imageUrl:
      '/How_to_Break_a_Heart.jpeg',
    link: "/press#How-to-Break-a-Heart"//'https://www.google.com/books/edition/How_to_Break_a_Heart/DmkuCwAAQBAJ?hl=en&gbpv=0',
  },
  {
    title: 'Fetching',
    imageUrl:
      '/Fetching.jpeg',
    link: "/press#Fetching"//'https://www.google.com/books/edition/Fetching/4ZDNZDme3JAC?hl=en&gbpv=0',
  },
  {
    title: 'Dumme Ideen für einen guten Sommer',
    imageUrl:
      '/Kiera_Geman.jpg',
    link: '/press#Dumme-Ideen-für-einen-guten-Sommer', //"https://www.amazon.com/Dumme-Ideen-einen-guten-Sommer/dp/3551319855"
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