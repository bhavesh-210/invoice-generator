import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
    title: 'Digital Heroes Invoice Generator',
    description:
        'Fullstack invoice generator for freelancers and businesses with GST calculations, PDF export, and saved invoice history.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
                <Navbar />
                <div className="flex-1">{children}</div>
                <footer className="shrink-0 border-t border-slate-200 bg-white px-6 py-6 text-sm text-slate-700 shadow-[0_-1px_0_rgba(15,23,42,0.04)]">
                    <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-semibold">Developer: Bhavesh</p>
                            <p>Email: your-email@example.com</p>
                        </div>
                        <a
                            href="https://digitalheroesco.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700">
                            Built for Digital Heroes
                        </a>
                    </div>
                </footer>
            </body>
        </html>
    );
}
