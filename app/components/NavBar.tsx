'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="nav-bar">
      <div className="nav-container">
        <div className="logo">
          <Link href="/">
            Kiera Stewart
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`line ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/about">
            About
          </Link>
          <Link href="/press">
            Press
          </Link>
          <Link href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
