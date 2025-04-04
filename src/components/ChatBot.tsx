
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopChatBot from './chatbot/DesktopChatBot';
import MobileChatBot from './chatbot/MobileChatBot';

interface ChatBotProps {
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileChatBot open={open} setOpen={setOpen} className={className} />;
  }

  return <DesktopChatBot open={open} setOpen={setOpen} className={className} />;
};

export default ChatBot;
