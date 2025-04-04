
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'warning';
  hoverable?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

const InfoCard = ({ 
  title, 
  children, 
  className, 
  variant = 'default', 
  hoverable = false,
  onClick,
  interactive = false
}: InfoCardProps) => {
  const variantClasses = {
    default: "bg-white border-gray-100",
    highlighted: "bg-blue-50 border-blue-100",
    warning: "bg-amber-50 border-amber-100"
  };

  return (
    <div 
      className={cn(
        "rounded-xl p-6 shadow-md border",
        variantClasses[variant],
        hoverable && "transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        interactive && "cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-blue-300",
        className
      )}
      role="region"
      aria-label={title}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default InfoCard;
