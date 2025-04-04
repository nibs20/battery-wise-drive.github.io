
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, MailQuestion, PhoneCall } from 'lucide-react';
import { SupportOption } from './types';

interface OptionsMenuProps {
  onOptionClick: (option: SupportOption) => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ onOptionClick }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-2">
      <Button onClick={() => onOptionClick('query')} className="flex justify-start gap-2">
        <HelpCircle className="h-5 w-5" />
        <span>General Battery Query</span>
      </Button>
      <Button onClick={() => onOptionClick('complain')} className="flex justify-start gap-2" variant="outline">
        <MailQuestion className="h-5 w-5" />
        <span>File a Complaint</span>
      </Button>
      <Button onClick={() => onOptionClick('customersupport')} className="flex justify-start gap-2" variant="secondary">
        <PhoneCall className="h-5 w-5" />
        <span>Customer Support</span>
      </Button>
    </div>
  );
};

export default OptionsMenu;
