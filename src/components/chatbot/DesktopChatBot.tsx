
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import OptionsMenu from './OptionsMenu';
import ChatInterface from './ChatInterface';
import { useChatLogic } from './useChatLogic';

interface DesktopChatBotProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
}

const DesktopChatBot: React.FC<DesktopChatBotProps> = ({ open, setOpen, className }) => {
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
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>BatteryWise Assistant</DialogTitle>
            <DialogDescription>
              What would you like help with today?
            </DialogDescription>
          </DialogHeader>
          
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DesktopChatBot;
