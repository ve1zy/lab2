import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-global-2 border-b border-sidebar-1 p-4 sm:p-6">
      <div className="w-full text-center text-lg sm:text-xl font-anonymous-pro font-normal tracking-[25px] text-sidebar-1 border border-sidebar-1 rounded-lg px-8 py-4">
        ZENCOUNT WEB PANEL
      </div>
    </header>
  );
};

export default Header;