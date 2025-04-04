
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChatMessage } from './types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputValue,
  setInputValue,
  onSendMessage
}) => {
  return (
    <div className="flex flex-col h-[400px]">
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "p-3 rounded-lg max-w-[80%]",
                message.isUser ? 
                  "bg-primary text-primary-foreground ml-auto" : 
                  "bg-muted text-muted-foreground"
              )}
            >
              {message.text}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={onSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatInterface;
