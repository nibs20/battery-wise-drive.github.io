
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const InfoCard = ({ title, children, className }: InfoCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-md border border-gray-100",
      className
    )}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default InfoCard;
