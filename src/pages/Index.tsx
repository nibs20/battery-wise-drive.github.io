
import React from 'react';
import Header from '@/components/Header';
import BatteryDashboard from '@/components/BatteryDashboard';
import DrivingTips from '@/components/DrivingTips';
import FactorsSection from '@/components/FactorsSection';
import { Button } from '@/components/ui/button';
import { BatteryCharging } from 'lucide-react';

const Index = () => {
  // Mock data for the app
  const userData = {
    drivingScore: 7,
    batteryEfficiency: 78,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero section */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Maximize Your Battery Life</h1>
              <p className="text-xl opacity-90 mb-6">
                Monitor your driving habits and get personalized recommendations 
                to extend your battery's lifespan and efficiency.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Monitoring
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full border-8 border-blue-400 opacity-30 animate-ping"></div>
                <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <BatteryCharging className="h-20 w-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main dashboard */}
      <BatteryDashboard />
      
      {/* Tips Section */}
      <section className="py-12 bg-gray-100" id="tips">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Battery Optimization Tips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Personalized recommendations based on your driving patterns to help extend your battery life.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            <DrivingTips drivingScore={userData.drivingScore} />
          </div>
        </div>
      </section>

      {/* Educational content about battery factors */}
      <FactorsSection />
      
      {/* Footer */}
      <footer className="bg-battery-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BatteryCharging className="h-5 w-5 text-battery-blue" />
              <span className="font-bold text-lg">BatteryWise</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; 2025 BatteryWise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
