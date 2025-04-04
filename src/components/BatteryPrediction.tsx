
import React from 'react';
import { Calendar, AlertTriangle, Clock, Calculator } from 'lucide-react';
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
  
  // Detailed calculation example
  const baseLifespan = 36; // 3 years base lifespan
  const efficiencyFactor = (efficiency / 100) * 12;
  const scoreFactor = (drivingScore / 10) * 12;
  const totalLifespan = baseLifespan + efficiencyFactor + scoreFactor;
  
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
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
              <Calculator className="h-3 w-3" />
              How is this calculated?
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4">
            <h4 className="font-semibold text-sm mb-2">Your Battery Prediction Calculation</h4>
            
            <div className="bg-gray-50 p-3 rounded-md mb-3 text-sm">
              <p className="font-medium text-xs text-gray-500 mb-1">Input Values:</p>
              <div className="grid grid-cols-2 gap-1">
                <span>Battery Efficiency:</span><span className="font-medium">{efficiency}%</span>
                <span>Driving Score:</span><span className="font-medium">{drivingScore}/10</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="font-medium text-xs text-gray-500">Calculation Steps:</p>
              
              <div className="grid grid-cols-3 gap-1 text-xs border-b pb-1">
                <span>Base Lifespan:</span>
                <span className="col-span-2 font-mono">{baseLifespan} months</span>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-xs border-b pb-1">
                <span>Efficiency Bonus:</span>
                <span className="col-span-2 font-mono">
                  ({efficiency}% ÷ 100) × 12 = {efficiencyFactor.toFixed(1)} months
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-xs border-b pb-1">
                <span>Driving Bonus:</span>
                <span className="col-span-2 font-mono">
                  ({drivingScore}/10) × 12 = {scoreFactor.toFixed(1)} months
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-xs font-medium">
                <span>Total Lifespan:</span>
                <span className="col-span-2 font-mono">
                  {baseLifespan} + {efficiencyFactor.toFixed(1)} + {scoreFactor.toFixed(1)} = {totalLifespan.toFixed(1)} months
                </span>
              </div>
              
              <div className="mt-3 pt-2 border-t text-xs text-gray-600">
                <p>The final value is rounded to {prediction.estimatedLifespan} months. Your replacement date is calculated by adding this to today's date.</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default BatteryPrediction;
