
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Clock, Car, ThermometerSun, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserDetailsProps {
  userData: {
    name: string;
    vehicleModel: string;
    batteryCapacity: number;
    averageChargingTime: string;
    drivingDistance: string;
    preferredTemperature: string;
    chargingCycles: number;
  };
}

const UserDetails: React.FC<UserDetailsProps> = ({ userData }) => {
  // Get initials from the name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-battery-blue/10 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Avatar className="h-10 w-10 border-2 border-battery-blue/20">
            <AvatarFallback className="bg-battery-blue text-white">
              {getInitials(userData.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-battery-blue">User Profile</div>
            <div className="text-sm font-normal text-gray-600">{userData.name}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Vehicle:</span> 
            <span className="text-gray-700">{userData.vehicleModel}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Battery className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Battery:</span> 
            <span className="text-gray-700">{userData.batteryCapacity} kWh</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Avg. Charging:</span> 
            <span className="text-gray-700">{userData.averageChargingTime}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Daily Drive:</span> 
            <span className="text-gray-700">{userData.drivingDistance}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <ThermometerSun className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Optimal Temp:</span> 
            <span className="text-gray-700">{userData.preferredTemperature}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Battery className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Charging Cycles:</span> 
            <span className="text-gray-700">{userData.chargingCycles} cycles</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
