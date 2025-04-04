
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import OptionsMenu from './OptionsMenu';
import ChatInterface from './ChatInterface';
import { useChatLogic } from './useChatLogic';

interface MobileChatBotProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}

const MobileChatBot: React.FC<MobileChatBotProps> = ({ open, setOpen, className }) => {
  const {
    activeOption,
    messages,
    inputValue,
    setInputValue,
    handleOptionClick,
    handleSendMessage
  } = useChatLogic();

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className={cn("fixed bottom-6 right-6 rounded-full p-4 shadow-lg", className)}
      >
        <MessageCircle className="size-6" />
        <span className="sr-only">Open chat</span>
      </Button>
      
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>BatteryWise Assistant</DrawerTitle>
            <DrawerDescription>
              What would you like help with today?
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 pb-8">
            {!activeOption ? (
              <OptionsMenu onOptionClick={handleOptionClick} />
            ) : (
              <ChatInterface 
                messages={messages}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSendMessage={handleSendMessage}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileChatBot;
