
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ThermometerSun, Battery, Info, ShoppingBag } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getOptimalChargingLevel, getTemperatureRange } from '@/utils/batteryPrediction';
import { toast } from '@/hooks/use-toast';

interface BatteryRecommendationsProps {
  efficiency: number;
  drivingScore: number;
  recommendations: string[];
}

const BatteryRecommendations = ({
  efficiency,
  drivingScore,
  recommendations
}: BatteryRecommendationsProps) => {
  const [temperature, setTemperature] = useState(20); // Default 20°C
  const [plannedUsage, setPlannedUsage] = useState<'daily' | 'longTrip' | 'storage'>('daily');
  
  const optimalCharging = getOptimalChargingLevel(temperature, plannedUsage);
  const tempRange = getTemperatureRange(temperature);
  
  // Get temperature condition description and icon
  const getTempDetails = () => {
    switch(tempRange) {
      case 'freezing':
        return { 
          icon: <ThermometerSun className="h-5 w-5 text-blue-500" />,
          description: 'Freezing temperatures severely reduce battery performance and range.'
        };
      case 'cold':
        return { 
          icon: <ThermometerSun className="h-5 w-5 text-blue-300" />,
          description: 'Cold temperatures moderately impact battery performance.'
        };
      case 'optimal':
        return { 
          icon: <ThermometerSun className="h-5 w-5 text-green-500" />,
          description: 'Ideal temperature range for battery operation.'
        };
      case 'warm':
        return { 
          icon: <ThermometerSun className="h-5 w-5 text-amber-500" />,
          description: 'Slightly elevated temperatures with minimal impact.'
        };
      case 'hot':
        return { 
          icon: <ThermometerSun className="h-5 w-5 text-red-500" />,
          description: 'Hot temperatures accelerate battery degradation.'
        };
    }
  };
  
  const tempDetails = getTempDetails();
  
  const handleProductPurchase = (product: string) => {
    toast({
      title: "Product Added to Cart",
      description: `${product} has been added to your cart.`,
      duration: 5000,
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Environment-based recommendations */}
      <Card className="border-battery-blue/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ThermometerSun className="h-5 w-5 text-battery-blue" />
            Environmental Charging Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Temperature slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="temperature">Temperature ({temperature}°C)</Label>
                <div className="flex items-center text-sm gap-1 text-gray-500">
                  {tempDetails.icon}
                  <span className="capitalize">{tempRange}</span>
                </div>
              </div>
              <Slider
                id="temperature"
                min={-20}
                max={45}
                step={1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <p className="text-sm text-gray-500 italic">{tempDetails.description}</p>
            </div>
            
            {/* Usage scenario */}
            <div>
              <Label className="block mb-2">Planned Usage</Label>
              <RadioGroup
                value={plannedUsage}
                onValueChange={(val) => setPlannedUsage(val as 'daily' | 'longTrip' | 'storage')}
                className="flex flex-wrap gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily Commute</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="longTrip" id="longTrip" />
                  <Label htmlFor="longTrip">Long Trip</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="storage" id="storage" />
                  <Label htmlFor="storage">Storage</Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Recommendation result */}
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Recommended Charging Levels</h4>
                  <p className="text-green-700 text-sm">Keep your battery between <strong>{optimalCharging.min}%</strong> and <strong>{optimalCharging.max}%</strong></p>
                  <p className="text-sm text-green-600 mt-1 italic">{optimalCharging.reason}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Product recommendations */}
      {recommendations.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2 bg-amber-50 border-b border-amber-100">
            <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Personalized Product Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => {
                // Extract the product name from the recommendation text
                const productMatch = recommendation.match(/our\s([^™]+)™/);
                const hasProduct = !!productMatch;
                const productName = hasProduct ? `${productMatch[1]}™` : '';
                
                return (
                  <div key={index} className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-start gap-2">
                      {hasProduct ? (
                        <ShoppingBag className="h-5 w-5 text-battery-blue mt-0.5" />
                      ) : (
                        <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                      )}
                      <p className="text-sm text-gray-700">{recommendation}</p>
                    </div>
                    {hasProduct && (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="whitespace-nowrap text-xs"
                        onClick={() => handleProductPurchase(productName)}
                      >
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BatteryRecommendations;
