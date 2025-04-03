
import React from 'react';
import { BatteryFull } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BatteryFull className="h-6 w-6 text-battery-blue" />
          <h1 className="text-xl font-bold text-battery-dark">BatteryWise</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-battery-blue">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="#tips" className="text-sm font-medium text-gray-700 hover:text-battery-blue">
                Tips
              </Link>
            </li>
            <li>
              <Link to="#factors" className="text-sm font-medium text-gray-700 hover:text-battery-blue">
                Learn
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
