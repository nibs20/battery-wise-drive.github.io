
import React from 'react';
import { Zap, Thermometer, Clock, Car } from 'lucide-react';

interface FactorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FactorCard = ({ icon, title, description }: FactorCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const FactorsSection = () => {
  return (
    <section className="py-12" id="factors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Understanding Battery Factors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Multiple factors affect your battery's health and longevity. Learning about these can help you make better driving decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FactorCard
            icon={<Zap className="h-6 w-6 text-battery-blue" />}
            title="Current Draw"
            description="High current draw during rapid acceleration puts strain on your battery and reduces its lifespan."
          />
          <FactorCard
            icon={<Thermometer className="h-6 w-6 text-battery-blue" />}
            title="Temperature"
            description="Extreme temperatures affect battery performance. Both very hot and cold conditions can reduce capacity."
          />
          <FactorCard
            icon={<Clock className="h-6 w-6 text-battery-blue" />}
            title="Charging Cycles"
            description="Complete discharge and rapid charging stress battery cells. Proper charging habits extend battery life."
          />
          <FactorCard
            icon={<Car className="h-6 w-6 text-battery-blue" />}
            title="Driving Style"
            description="Frequent aggressive acceleration and heavy loads demand more from your battery system."
          />
        </div>
      </div>
    </section>
  );
};

export default FactorsSection;
