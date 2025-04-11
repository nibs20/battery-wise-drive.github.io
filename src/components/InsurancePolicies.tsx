
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Star, ExternalLink, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface InsuranceCompany {
  name: string;
  logo: React.ReactNode;
  baseRate: number;
  discountFactor: number;
  coverageDescription: string;
  specialFeatures: string[];
  recommendedFor: string;
  color: string;
}

interface InsurancePoliciesProps {
  drivingScore: number;
}

const calculateMonthlyRate = (baseRate: number, discountFactor: number, drivingScore: number): number => {
  // Higher driving score means better discount
  const discountPercentage = (drivingScore / 10) * discountFactor;
  const discountedRate = baseRate * (1 - discountPercentage);
  return Math.round(discountedRate);
};

const getBestValueInsurer = (insuranceCompanies: InsuranceCompany[], drivingScore: number): string => {
  let bestValue = { name: '', value: Infinity };
  
  insuranceCompanies.forEach(company => {
    const rate = calculateMonthlyRate(company.baseRate, company.discountFactor, drivingScore);
    const valueRatio = rate / company.discountFactor; // Lower is better
    
    if (valueRatio < bestValue.value) {
      bestValue = { name: company.name, value: valueRatio };
    }
  });
  
  return bestValue.name;
};

const insuranceCompanies: InsuranceCompany[] = [
  {
    name: 'EcoDrive Insurance',
    logo: <Shield className="h-6 w-6 text-green-600" />,
    baseRate: 120,
    discountFactor: 0.40, // Up to 40% discount for perfect drivers
    coverageDescription: 'Comprehensive coverage specialized for electric vehicles with battery replacement guarantee.',
    specialFeatures: ['Battery replacement coverage', 'Roadside charging assistance', 'Green driver rewards'],
    recommendedFor: 'Environmentally conscious drivers with good driving habits',
    color: 'bg-green-100 border-green-200'
  },
  {
    name: 'PowerShield',
    logo: <Shield className="h-6 w-6 text-blue-600" />,
    baseRate: 105,
    discountFactor: 0.30, // Up to 30% discount
    coverageDescription: 'Balanced coverage with strong focus on battery protection and technical assistance.',
    specialFeatures: ['24/7 technical support', 'Home charger coverage', 'Loaner vehicle program'],
    recommendedFor: 'Tech-savvy drivers who want reliable support',
    color: 'bg-blue-100 border-blue-200'
  },
  {
    name: 'ValueCharge',
    logo: <Shield className="h-6 w-6 text-purple-600" />,
    baseRate: 95,
    discountFactor: 0.25, // Up to 25% discount
    coverageDescription: 'Budget-friendly insurance with essential coverage for electric vehicles.',
    specialFeatures: ['Pay-per-mile option', 'Basic battery coverage', 'Affordable premiums'],
    recommendedFor: 'Budget-conscious drivers looking for essential coverage',
    color: 'bg-purple-100 border-purple-200'
  },
  {
    name: 'EliteDrive Prestige',
    logo: <Shield className="h-6 w-6 text-amber-600" />,
    baseRate: 150,
    discountFactor: 0.35, // Up to 35% discount
    coverageDescription: 'Premium coverage with concierge service and extensive benefits for luxury electric vehicles.',
    specialFeatures: ['Concierge service', 'Premium charging network access', 'Guaranteed replacement value'],
    recommendedFor: 'Luxury vehicle owners wanting premium service',
    color: 'bg-amber-100 border-amber-200'
  },
  {
    name: 'SafeCharge Insurance',
    logo: <Shield className="h-6 w-6 text-red-600" />,
    baseRate: 110,
    discountFactor: 0.28, // Up to 28% discount
    coverageDescription: 'Safety-focused insurance with accident prevention benefits and recovery services.',
    specialFeatures: ['Accident prevention rewards', 'Family protection plan', 'Safety equipment discounts'],
    recommendedFor: 'Safety-conscious drivers and families',
    color: 'bg-red-100 border-red-200'
  }
];

const InsurancePolicies: React.FC<InsurancePoliciesProps> = ({ drivingScore }) => {
  const bestValue = getBestValueInsurer(insuranceCompanies, drivingScore);
  
  const handleGetQuote = (companyName: string) => {
    toast({
      title: "Quote Requested",
      description: `Your insurance quote from ${companyName} has been requested. You'll receive details shortly.`,
      duration: 5000,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-battery-blue" />
          Insurance Policy Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Based on your driving score of <span className="font-semibold text-battery-blue">{drivingScore}/10</span>, 
            we've found insurance policies that may offer you favorable rates and coverage.
          </p>
        </div>
        
        <div className="space-y-4">
          {insuranceCompanies.map((company) => {
            const monthlyRate = calculateMonthlyRate(company.baseRate, company.discountFactor, drivingScore);
            const isBestValue = company.name === bestValue;
            
            return (
              <div 
                key={company.name} 
                className={`p-4 rounded-lg border ${company.color} relative`}
              >
                {isBestValue && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-battery-blue text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" /> Best Value
                    </Badge>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-full bg-white shadow-sm">
                      {company.logo}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{company.coverageDescription}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {company.specialFeatures.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-white">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-500 flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <Info className="h-3 w-3 mr-1" />
                                <span>Recommended for:</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">{company.recommendedFor}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Monthly premium</div>
                      <div className="text-2xl font-bold">${monthlyRate}</div>
                      <div className="text-xs text-green-600">
                        Save up to {Math.round(company.discountFactor * 100)}% with good driving
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => handleGetQuote(company.name)}
                    >
                      Get Quote <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-xs text-gray-500 italic">
          * Rates are estimates based on your driving score and may vary. Contact insurers directly for accurate quotes.
        </div>
      </CardContent>
    </Card>
  );
};

export default InsurancePolicies;
