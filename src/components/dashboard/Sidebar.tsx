'use client';
import React from 'react';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface SidebarProps {
  menuItems: MenuItem[];
  logoSrc?: string;
  logoAlt?: string;
  className?: string;
  onMenuItemClick?: (item: MenuItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  logoSrc = '/images/img_sidebar_logo.svg',
  logoAlt = 'Logo',
  className = '',
  onMenuItemClick,
  ...props
}) => {
  const handleMenuClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full w-64 sm:w-72 lg:w-80 bg-sidebar-1 border-r border-sidebar-1 shadow-sidebar flex flex-col pt-12 sm:pt-16 px-3 sm:px-4 z-40 transform transition-transform duration-300 ease-in-out ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="w-12 h-10 sm:w-14 sm:h-12 relative">
          <Image src={logoSrc} alt={logoAlt} fill className="object-contain" priority />
        </div>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4 sm:space-y-6">
          {menuItems.map((item, index) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`
                  w-full px-3 py-3 sm:px-4 sm:py-4 text-left text-sm sm:text-base font-anonymous-pro font-normal tracking-wider text-sidebar-1 bg-sidebar-1 rounded transition-all duration-200 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-button-1 focus:ring-opacity-50 min-h-[44px] sm:min-h-[48px] touch-manipulation flex items-center ${item.active ? 'bg-gray-50 font-medium' : ''} ${index > 0 ? 'mt-4 sm:mt-6' : ''}
                `
                  .trim()
                  .replace(/\s+/g, ' ')}
                role="menuitem"
                tabIndex={0}
              >
                <span className="ml-5 sm:ml-6">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
