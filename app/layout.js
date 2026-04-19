import './globals.css';


export const metadata = {
  title: 'TEAM-AVALANCHE',
  description: 'Avalanche Club at Siddaganga Institute of Technology – Where Campus Energy Begins',
};

// Ensures the layout scales correctly on all devices and prevents auto-zoom on mobile inputs
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      </head>
      <body
        className="relative bg-white dark:bg-[#020617] text-slate-900 dark:text-white overflow-x-hidden antialiased selection:bg-cyan-500/30 transition-colors duration-400"
      >
        {/* Global animated background: 
            Ensuring it is fixed and promoted to its own GPU layer for smooth movement 
        */}


        {/* Page content: 
            Using relative z-index to stay above the background 
        */}
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}