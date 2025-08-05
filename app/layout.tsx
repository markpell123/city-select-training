// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/AuthContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'City Select Training',
  description: 'Training platform for dealership staff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900 min-h-screen`}>
        <AuthProvider>
          {/* Global Header */}
          <header className="bg-black text-white p-4 shadow-md mb-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-lg font-bold">City Select Training</h1>
              <Link href="/" className="text-white underline hover:text-gray-300">
                Home
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <main className="max-w-6xl mx-auto p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}