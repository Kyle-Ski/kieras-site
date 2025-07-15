'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const navItems = [
    { href: `/`, label: "Home" },
    { href: `/about`, label: "About" },
    { href: `/blog`, label: "Blog" },
    { href: `/press`, label: "Press" },
    { href: `/about#follow-me-about`, label: "Contact" },
  ];

  // Helper function to determine if the link is active
  const isActive = (href: string) => {
    return activeItem === href;
  };

  // Function to close the menu when a link is clicked
  const handleLinkClick = (href: string) => {
    setActiveItem(href);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="nav-bar">
      <div className="nav-container">
        <div className="logo">
          <Link href="/" onClick={() => handleLinkClick("/")} className="font-name">
            Kiera Stewart
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleLinkClick(item.href)}
              className={`font-body ${isActive(item.href) ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}