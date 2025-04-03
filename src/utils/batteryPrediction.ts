
type BatteryPrediction = {
  estimatedLifespan: number; // in months
  replacementDate: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  riskFactors: string[];
};

/**
 * Calculates battery health prediction based on current efficiency and driving score
 */
export const predictBatteryHealth = (
  efficiency: number,
  drivingScore: number
): BatteryPrediction => {
  // Calculate estimated lifespan in months based on current stats
  // This is a simplified model - in a real app this would use more complex algorithms
  const baseLifespan = 36; // 3 years base lifespan
  const efficiencyFactor = (efficiency / 100) * 12;
  const scoreFactor = (drivingScore / 10) * 12;
  
  const estimatedLifespan = Math.round(baseLifespan + efficiencyFactor + scoreFactor);
  
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
  
  return {
    estimatedLifespan,
    replacementDate: replacementDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    }),
    healthStatus,
    riskFactors
  };
};
