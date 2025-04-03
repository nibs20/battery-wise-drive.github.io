
import React from 'react';
import { AlertTriangle, BatteryCharging, BatteryMedium } from 'lucide-react';

interface BatteryEfficiencyProps {
  efficiency: number;
}

const BatteryEfficiency = ({ efficiency }: BatteryEfficiencyProps) => {
  // Determine battery status
  const getBatteryStatus = () => {
    if (efficiency >= 80) return 'Excellent';
    if (efficiency >= 60) return 'Good';
    if (efficiency >= 40) return 'Fair';
    if (efficiency >= 20) return 'Poor';
    return 'Critical';
  };

  const getStatusColor = () => {
    if (efficiency >= 80) return 'text-battery-green';
    if (efficiency >= 60) return 'text-battery-teal';
    if (efficiency >= 40) return 'text-battery-blue';
    if (efficiency >= 20) return 'text-battery-warning';
    return 'text-battery-danger';
  };

  const getBatteryColor = () => {
    if (efficiency >= 80) return 'bg-battery-green';
    if (efficiency >= 60) return 'bg-battery-teal';
    if (efficiency >= 40) return 'bg-battery-blue';
    if (efficiency >= 20) return 'bg-battery-warning';
    return 'bg-battery-danger';
  };

  const status = getBatteryStatus();
  const statusColor = getStatusColor();
  const batteryColor = getBatteryColor();

  const showWarning = efficiency < 40;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {efficiency >= 50 ? (
            <BatteryMedium className={`h-5 w-5 ${statusColor}`} />
          ) : (
            <BatteryCharging className={`h-5 w-5 ${statusColor}`} />
          )}
          <span className="font-medium text-gray-700">Battery Efficiency</span>
        </div>
        <div className={`text-sm font-medium ${statusColor}`}>{status}</div>
      </div>

      <div className="battery-container">
        <div 
          className={`battery-level ${batteryColor}`}
          style={{ width: `${efficiency}%` }}
        />
        <div className="battery-nub"></div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {showWarning && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-battery-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Your battery efficiency is low. Consider maintenance or replacement soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default BatteryEfficiency;
