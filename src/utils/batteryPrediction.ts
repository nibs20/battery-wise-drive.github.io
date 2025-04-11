
type BatteryPrediction = {
  estimatedLifespan: number; // in months
  replacementDate: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  riskFactors: string[];
  recommendations: string[];
};

type TemperatureRange = 'freezing' | 'cold' | 'optimal' | 'warm' | 'hot';

/**
 * Calculates battery health prediction based on current efficiency, driving score, and environmental factors
 * 
 * Example calculation:
 * - Base lifespan: 36 months (3 years)
 * - If efficiency is 75%, efficiency factor = (75/100) × 12 = 9 months
 * - If driving score is 8/10, score factor = (8/10) × 12 = 9.6 months
 * - If average temperature is 'optimal', temp factor = 6 months bonus
 * - Total lifespan = 36 + 9 + 9.6 + 6 = 60.6 months (rounded to 61 months)
 */
export const predictBatteryHealth = (
  efficiency: number,
  drivingScore: number,
  temperature: TemperatureRange = 'optimal',
  chargingCycles: number = 150
): BatteryPrediction => {
  // Calculate estimated lifespan in months based on current stats
  // This is a simplified model - in a real app this would use more complex algorithms
  const baseLifespan = 36; // 3 years base lifespan
  const efficiencyFactor = (efficiency / 100) * 12;
  const scoreFactor = (drivingScore / 10) * 12;
  
  // Temperature impact
  let tempFactor = 0;
  switch(temperature) {
    case 'freezing': tempFactor = -6; break; // Severe negative impact
    case 'cold': tempFactor = -3; break;    // Moderate negative impact
    case 'optimal': tempFactor = 6; break;  // Positive impact
    case 'warm': tempFactor = 0; break;     // Neutral impact
    case 'hot': tempFactor = -4; break;     // Significant negative impact
  }
  
  // Charging cycles impact (simplified)
  const cyclesFactor = Math.max(-12, Math.min(6, (500 - chargingCycles) / 100));
  
  const estimatedLifespan = Math.round(baseLifespan + efficiencyFactor + scoreFactor + tempFactor + cyclesFactor);
  
  // Calculate replacement date
  const today = new Date();
  const replacementDate = new Date(today);
  replacementDate.setMonth(today.getMonth() + estimatedLifespan);
  
  // Determine health status
  let healthStatus: BatteryPrediction['healthStatus'] = 'critical';
  if (efficiency >= 80 && drivingScore >= 8) healthStatus = 'excellent';
  else if (efficiency >= 65 && drivingScore >= 6) healthStatus = 'good';
  else if (efficiency >= 50 && drivingScore >= 4) healthStatus = 'fair';
  else if (efficiency >= 30 && drivingScore >= 2) healthStatus = 'poor';
  
  // Determine risk factors
  const riskFactors: string[] = [];
  if (efficiency < 60) riskFactors.push('Low battery efficiency');
  if (drivingScore < 5) riskFactors.push('Driving habits need improvement');
  if (efficiency < 40) riskFactors.push('High risk of imminent failure');
  if (efficiency < 30 && drivingScore < 3) riskFactors.push('Urgent maintenance recommended');
  if (temperature === 'freezing' || temperature === 'hot') riskFactors.push('Extreme temperature exposure');
  if (chargingCycles > 400) riskFactors.push('High number of charging cycles');
  
  // Generate personalized recommendations
  const recommendations: string[] = [];
  
  // Efficiency-based recommendations
  if (efficiency < 60) {
    recommendations.push('Consider our BatteryBoost™ rejuvenation service to improve efficiency');
    recommendations.push('Schedule a diagnostic check at your nearest service center');
  }
  
  // Temperature-based recommendations
  if (temperature === 'freezing') {
    recommendations.push('Use our ThermalGuard™ battery blanket to protect against cold temperatures');
    recommendations.push('Pre-condition your vehicle while plugged in before driving in cold weather');
  } else if (temperature === 'hot') {
    recommendations.push('Install our CoolFlow™ battery ventilation system for hot climates');
    recommendations.push('Park in shaded areas or use a car cover to reduce heat exposure');
  }
  
  // Charging recommendations
  if (chargingCycles > 300) {
    recommendations.push('Optimize charging with our SmartCharge™ controller to reduce cycle wear');
  }
  
  // Driving habits recommendations
  if (drivingScore < 6) {
    recommendations.push('Try our EcoDrive™ assistant to develop battery-friendly driving habits');
  }
  
  return {
    estimatedLifespan,
    replacementDate: replacementDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    }),
    healthStatus,
    riskFactors,
    recommendations
  };
};

// Helper function to determine temperature range based on degrees
export const getTemperatureRange = (tempCelsius: number): TemperatureRange => {
  if (tempCelsius < -10) return 'freezing';
  if (tempCelsius < 10) return 'cold';
  if (tempCelsius < 30) return 'optimal';
  if (tempCelsius < 35) return 'warm';
  return 'hot';
};

// Calculate optimal charging level based on environmental factors
export const getOptimalChargingLevel = (
  tempCelsius: number,
  plannedUsage: 'daily' | 'longTrip' | 'storage' = 'daily'
): { min: number; max: number; reason: string } => {
  const tempRange = getTemperatureRange(tempCelsius);
  
  switch (plannedUsage) {
    case 'longTrip':
      return {
        min: 90,
        max: 100,
        reason: 'Maximizing range for long trip'
      };
    
    case 'storage':
      return {
        min: 40,
        max: 60,
        reason: 'Optimal level for long-term storage to minimize degradation'
      };
      
    case 'daily':
    default:
      switch (tempRange) {
        case 'freezing':
          return {
            min: 50,
            max: 80,
            reason: 'Higher minimum charge recommended for cold weather operation'
          };
        case 'hot':
          return {
            min: 20,
            max: 70,
            reason: 'Lower maximum charge recommended to reduce heat-related stress'
          };
        default:
          return {
            min: 20,
            max: 80,
            reason: 'Standard recommended charging range for daily use'
          };
      }
  }
};
