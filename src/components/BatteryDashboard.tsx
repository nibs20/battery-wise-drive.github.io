
import React from 'react';
import InfoCard from './InfoCard';
import DrivingScore from './DrivingScore';
import BatteryEfficiency from './BatteryEfficiency';
import DrivingTips from './DrivingTips';

// Mock data for the dashboard
const dashboardData = {
  drivingScore: 7,
  batteryEfficiency: 78,
  lastUpdated: new Date().toLocaleString()
};

const BatteryDashboard = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Battery Health Dashboard</h2>
          <div className="text-xs text-gray-500">
            Last updated: {dashboardData.lastUpdated}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard title="Driving Score">
            <DrivingScore score={dashboardData.drivingScore} />
          </InfoCard>
          
          <InfoCard title="Battery Status">
            <BatteryEfficiency efficiency={dashboardData.batteryEfficiency} />
          </InfoCard>

          <div className="lg:col-span-1 md:col-span-2 col-span-1">
            <InfoCard title="Recommendations" className="h-full">
              <DrivingTips drivingScore={dashboardData.drivingScore} />
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatteryDashboard;
