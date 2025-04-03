
import React from 'react';
import { Check, Zap, AlertTriangle, PlugZap } from 'lucide-react';

interface Tip {
  icon: React.ReactNode;
  title: string;
  description: string;
  good?: boolean;
}

interface DrivingTipsProps {
  drivingScore: number;
}

const DrivingTips = ({ drivingScore }: DrivingTipsProps) => {
  const goodTips: Tip[] = [
    {
      icon: <Check className="h-5 w-5 text-battery-green" />,
      title: "Gradual Acceleration",
      description: "Your smooth acceleration pattern helps reduce battery strain.",
      good: true
    },
    {
      icon: <Check className="h-5 w-5 text-battery-green" />,
      title: "Optimal Speed Range",
      description: "You maintain speeds that maximize battery efficiency.",
      good: true
    },
    {
      icon: <Check className="h-5 w-5 text-battery-green" />,
      title: "Regenerative Braking",
      description: "You're effectively using regenerative braking to recharge the battery.",
      good: true
    }
  ];

  const improvementTips: Tip[] = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-battery-warning" />,
      title: "Reduce Rapid Acceleration",
      description: "Quick starts draw high current and cause battery stress.",
      good: false
    },
    {
      icon: <Zap className="h-5 w-5 text-battery-warning" />,
      title: "Limit High-Power Accessories",
      description: "Heavy use of power-consuming accessories strains your battery.",
      good: false
    },
    {
      icon: <PlugZap className="h-5 w-5 text-battery-warning" />,
      title: "Improve Charging Habits",
      description: "Letting your battery drain completely reduces its lifespan.",
      good: false
    }
  ];

  // Show more good tips for higher scores, more improvement tips for lower scores
  const goodTipsToShow = drivingScore >= 7 ? 3 : drivingScore >= 5 ? 2 : 1;
  const improvementTipsToShow = drivingScore <= 3 ? 3 : drivingScore <= 5 ? 2 : 1;

  const displayedGoodTips = goodTips.slice(0, goodTipsToShow);
  const displayedImprovementTips = improvementTips.slice(0, improvementTipsToShow);

  return (
    <div className="space-y-6">
      {displayedGoodTips.length > 0 && (
        <div>
          <h4 className="text-base font-medium text-battery-green mb-3">What You're Doing Well</h4>
          <ul className="space-y-3">
            {displayedGoodTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                <div className="mt-0.5">{tip.icon}</div>
                <div>
                  <p className="font-medium text-gray-800">{tip.title}</p>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {displayedImprovementTips.length > 0 && (
        <div>
          <h4 className="text-base font-medium text-amber-600 mb-3">Areas for Improvement</h4>
          <ul className="space-y-3">
            {displayedImprovementTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 bg-amber-50 p-3 rounded-lg">
                <div className="mt-0.5">{tip.icon}</div>
                <div>
                  <p className="font-medium text-gray-800">{tip.title}</p>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DrivingTips;
