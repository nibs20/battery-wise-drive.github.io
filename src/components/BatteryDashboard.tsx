
import React, { useState } from 'react';
import InfoCard from './InfoCard';
import DrivingScore from './DrivingScore';
import BatteryEfficiency from './BatteryEfficiency';
import DrivingTips from './DrivingTips';
import BatteryPrediction from './BatteryPrediction';
import MindfulNotification from './MindfulNotification';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BellRing, Clock } from 'lucide-react';

// Mock data for the dashboard
const dashboardData = {
  drivingScore: 7,
  batteryEfficiency: 78,
  lastUpdated: new Date().toLocaleString()
};

const BatteryDashboard = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState(2); // minutes
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Battery Health Dashboard</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
              <Label htmlFor="notifications" className="text-xs flex items-center gap-1 text-gray-600">
                <BellRing className="h-3 w-3" />
                Mindful Tips
              </Label>
            </div>
            
            {notificationsEnabled && (
              <div className="flex items-center gap-2 w-40">
                <Clock className="h-3 w-3 text-gray-500" />
                <Slider
                  defaultValue={[notificationFrequency]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setNotificationFrequency(value[0])}
                  className="w-24"
                />
                <span className="text-xs text-gray-500">{notificationFrequency} min</span>
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              Last updated: {dashboardData.lastUpdated}
            </div>
          </div>
        </div>

        {notificationsEnabled && (
          <MindfulNotification 
            drivingScore={dashboardData.drivingScore}
            efficiency={dashboardData.batteryEfficiency}
            isActive={notificationsEnabled}
            frequencyInMinutes={notificationFrequency}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard title="Driving Score" hoverable>
            <DrivingScore score={dashboardData.drivingScore} />
          </InfoCard>
          
          <InfoCard title="Battery Status" hoverable>
            <BatteryEfficiency efficiency={dashboardData.batteryEfficiency} />
          </InfoCard>

          <InfoCard 
            title="Battery Prediction" 
            variant={dashboardData.batteryEfficiency < 50 ? "warning" : "default"}
            hoverable
          >
            <BatteryPrediction
              efficiency={dashboardData.batteryEfficiency}
              drivingScore={dashboardData.drivingScore}
            />
          </InfoCard>

          <div className="lg:col-span-3 md:col-span-2 col-span-1">
            <InfoCard 
              title="Recommendations" 
              className="h-full"
              variant={dashboardData.drivingScore < 5 ? "warning" : "highlighted"}
            >
              <DrivingTips drivingScore={dashboardData.drivingScore} />
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatteryDashboard;
