import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl text-center">Omega Ai</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        {children}
      </main>
      <footer className="p-4 bg-gray-100">
        <p className="text-center text-gray-500">Omega Ai UI © 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
