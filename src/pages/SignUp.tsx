
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BatteryFull } from 'lucide-react';

const SignUp = () => {
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a prototype - no actual auth logic
    window.localStorage.setItem('userLoggedIn', 'true');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <BatteryFull className="h-8 w-8 text-battery-blue" />
            <span className="font-bold text-2xl text-battery-dark">BatteryWise</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="text-gray-600 mt-2">Get started with BatteryWise</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>

              <Button type="submit" className="w-full">Create account</Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-battery-blue font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
