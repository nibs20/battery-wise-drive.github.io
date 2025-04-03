
import React from 'react';
import { Calendar, AlertTriangle, Clock } from 'lucide-react';
import { predictBatteryHealth } from '@/utils/batteryPrediction';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

interface BatteryPredictionProps {
  efficiency: number;
  drivingScore: number;
}

const BatteryPrediction = ({ efficiency, drivingScore }: BatteryPredictionProps) => {
  const prediction = predictBatteryHealth(efficiency, drivingScore);
  
  // Determine color based on health status
  const getStatusColor = () => {
    switch (prediction.healthStatus) {
      case 'excellent': return 'text-battery-green';
      case 'good': return 'text-battery-teal';
      case 'fair': return 'text-battery-blue';
      case 'poor': return 'text-battery-warning';
      case 'critical': return 'text-battery-danger';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`h-5 w-5 ${getStatusColor()}`} />
          <span className="font-medium text-gray-700">Battery Projection</span>
        </div>
        <div className={`text-sm font-medium ${getStatusColor()} capitalize`}>
          {prediction.healthStatus}
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Estimated Replacement:</span>
        </div>
        <span className="text-sm font-medium">{prediction.replacementDate}</span>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-sm text-gray-600">Expected Lifespan:</span>
        <span className="text-sm font-medium">
          {prediction.estimatedLifespan} months
        </span>
      </div>

      {prediction.riskFactors.length > 0 && (
        <Alert variant="destructive" className="mt-4 bg-amber-50 border-amber-200 text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-amber-800">Risk Factors Detected</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              {prediction.riskFactors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-center mt-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">
              How is this calculated?
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 text-sm">
            <p className="mb-2">Your battery prediction is calculated based on:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Current battery efficiency ({efficiency}%)</li>
              <li>Your driving habits score ({drivingScore}/10)</li>
              <li>Industry average battery degradation rates</li>
              <li>Typical electric vehicle battery lifespan patterns</li>
            </ul>
            <p className="mt-2 text-xs text-gray-600">
              Improve your driving habits to extend your battery's lifespan.
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default BatteryPrediction;
