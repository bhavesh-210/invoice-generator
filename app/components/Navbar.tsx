'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Invoice Generator
        </Link>
        <ul className="nav-menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
}
