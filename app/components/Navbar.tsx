'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Invoice Generator
                </Link>
                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="hover:bg-blue-700 px-3 py-2 rounded">
                        Create
                    </Link>
                    <Link
                        href="/dashboard"
                        className="hover:bg-blue-700 px-3 py-2 rounded">
                        Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
}
