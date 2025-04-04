
import React from 'react';
import { BatteryFull, LogIn, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BatteryFull className="h-6 w-6 text-battery-blue" />
          <h1 className="text-xl font-bold text-battery-dark">BatteryWise</h1>
        </Link>
        <nav className="hidden md:block">
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
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-battery-blue">
                <User className="h-4 w-4 mr-1" /> Profile
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 hover:text-battery-blue"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-battery-blue">
                  <LogIn className="h-4 w-4 mr-1" /> Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" size="sm" className="bg-battery-blue text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
