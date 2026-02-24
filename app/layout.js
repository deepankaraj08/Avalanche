import './globals.css';
import GlobalBackground from '@/components/GlobalBackground';

export const metadata = {
  title: 'Avalanche Club – SIT, Tumkur',
  description:
    'Avalanche Club at Siddaganga Institute of Technology – Where Campus Energy Begins',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-[#0a0f1a] text-white overflow-x-hidden">

        {/* Global animated background */}
        <GlobalBackground />

        {/* Page content */}
        <main className="relative z-10">
          {children}
        </main>

      </body>
    </html>
  );
}
