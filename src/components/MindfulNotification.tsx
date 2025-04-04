
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  BatteryCharging, 
  AlertTriangle, 
  Zap, 
  ThumbsUp,
  Car,
  Leaf,
  BatteryMedium,
  TimerReset
} from 'lucide-react';

interface MindfulNotificationProps {
  drivingScore: number;
  efficiency: number;
  isActive?: boolean;
  frequencyInMinutes?: number;
}

// Sample tips for different categories
const chargingTips = [
  "Try to keep your battery between 20% and 80% for optimal lifespan",
  "Avoid frequent fast charging which can increase battery temperature",
  "Charge your vehicle when batteries are below 30% for maximum efficiency",
  "Consider charging overnight when electricity rates are often lower",
  "Don't let your battery sit at 100% charge for extended periods"
];

const drivingTips = [
  "Gentle acceleration helps preserve battery health",
  "Use regenerative braking to recapture energy",
  "Maintain a consistent speed for optimal efficiency",
  "Reduce high-speed driving to minimize battery drain",
  "Pre-condition your vehicle while plugged in to save battery"
];

const maintenanceTips = [
  "Regular battery system checks can prevent unexpected issues",
  "Keep your battery cool - avoid parking in direct sunlight when possible",
  "Update your vehicle's software to benefit from efficiency improvements",
  "Check for optimal tire pressure to reduce unnecessary battery strain",
  "Consider a professional battery health check annually"
];

const categoryIcons = {
  charging: <BatteryCharging className="h-5 w-5 text-battery-blue" />,
  driving: <Car className="h-5 w-5 text-battery-teal" />,
  maintenance: <TimerReset className="h-5 w-5 text-battery-green" />,
  warning: <AlertTriangle className="h-5 w-5 text-battery-warning" />,
  success: <ThumbsUp className="h-5 w-5 text-battery-green" />,
  eco: <Leaf className="h-5 w-5 text-green-500" />
};

const MindfulNotification = ({ 
  drivingScore, 
  efficiency, 
  isActive = true,
  frequencyInMinutes = 2
}: MindfulNotificationProps) => {
  const { toast } = useToast();
  const [lastToastTime, setLastToastTime] = useState(0);
  
  // Determine which tips are most relevant based on user metrics
  const getPrioritizedTips = () => {
    if (efficiency < 50) {
      return {
        category: 'charging',
        tips: chargingTips,
        title: "Battery Care Tip"
      };
    } else if (drivingScore < 6) {
      return {
        category: 'driving',
        tips: drivingTips,
        title: "Eco-Driving Tip"
      };
    } else {
      // Rotate through all categories for users doing well
      const categories = [
        {
          category: 'charging',
          tips: chargingTips,
          title: "Charging Optimization"
        },
        {
          category: 'driving',
          tips: drivingTips,
          title: "Eco-Driving Insight"
        },
        {
          category: 'maintenance',
          tips: maintenanceTips,
          title: "Battery Maintenance"
        }
      ];
      return categories[Math.floor(Math.random() * categories.length)];
    }
  };
  
  useEffect(() => {
    if (!isActive) return;

    // Display initial notification based on metrics
    const showInitialFeedback = () => {
      if (drivingScore < 5) {
        toast({
          title: "Driving Habit Alert",
          description: "Your driving patterns are affecting battery health. Try smoother acceleration.",
          duration: 6000,
          action: (
            <div className="flex items-center">
              {categoryIcons.warning}
            </div>
          )
        });
        setLastToastTime(Date.now());
      } else if (drivingScore > 8) {
        toast({
          title: "Excellent Driving Habits",
          description: "Your eco-friendly driving is helping extend your battery's lifespan!",
          duration: 5000,
          action: (
            <div className="flex items-center">
              {categoryIcons.success}
            </div>
          )
        });
        setLastToastTime(Date.now());
      }
    };
    
    // Delayed initial feedback to avoid overwhelming the user on load
    const initialTimer = setTimeout(showInitialFeedback, 3000);
    
    // Display periodic notifications
    const showNotification = () => {
      const now = Date.now();
      // Only show a toast if enough time has passed
      if (now - lastToastTime < frequencyInMinutes * 60000) return;
      
      const { category, tips, title } = getPrioritizedTips();
      const tip = tips[Math.floor(Math.random() * tips.length)];
      
      toast({
        title,
        description: tip,
        duration: 5000,
        action: (
          <div className="flex items-center">
            {categoryIcons[category as keyof typeof categoryIcons]}
          </div>
        )
      });
      
      setLastToastTime(now);
    };
    
    // Set interval for periodic tips
    const intervalId = setInterval(showNotification, frequencyInMinutes * 60000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, [drivingScore, efficiency, isActive, toast, frequencyInMinutes]);
  
  // This component doesn't render anything visible
  return null;
};

export default MindfulNotification;
