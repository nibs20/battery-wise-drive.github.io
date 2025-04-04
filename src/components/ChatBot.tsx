
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, HelpCircle, MailQuestion, PhoneCall } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-mobile'; 
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type SupportOption = 'query' | 'complain' | 'customersupport';

interface ChatBotProps {
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<SupportOption | null>(null);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hello! How can I help you with your battery today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOptionClick = (option: SupportOption) => {
    setActiveOption(option);
    
    let responseMessage = "";
    switch(option) {
      case 'query':
        responseMessage = "What would you like to know about your battery or our service?";
        break;
      case 'complain':
        responseMessage = "I'm sorry you're having trouble. Please describe your issue, and we'll try to resolve it quickly.";
        break;
      case 'customersupport':
        responseMessage = "Our customer support team is ready to assist you. What can we help you with today?";
        break;
    }
    
    setMessages([...messages, { text: responseMessage, isUser: false }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: inputValue, isUser: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        query: [
          "That's a great question about battery health. Our recommendation is to keep your battery between 20% and 80% for optimal longevity.",
          "Based on your driving patterns, your battery should maintain good health for approximately 8-10 years with proper care.",
          "The most significant factors affecting battery degradation are extreme temperatures and rapid charging cycles."
        ],
        complain: [
          "I'm sorry to hear about your experience. Our service team will review this and get back to you within 24 hours.",
          "Thank you for bringing this to our attention. Your feedback helps us improve our service.",
          "We apologize for the inconvenience. A support ticket has been created and a specialist will contact you shortly."
        ],
        customersupport: [
          "Our specialists are available Monday through Friday, 8am-8pm. Would you like us to call you back?",
          "I can connect you with a battery specialist who can provide more detailed assistance. Would you prefer a call or email?",
          "Thank you for contacting customer support. We've added your request to our queue and will respond as soon as possible."
        ]
      };
      
      // Select a random response based on active option
      if (activeOption) {
        const randomResponse = botResponses[activeOption][Math.floor(Math.random() * botResponses[activeOption].length)];
        setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      }
    }, 1000);
    
    setInputValue('');
  };

  if (isDesktop) {
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
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Button onClick={() => handleOptionClick('query')} className="flex justify-start gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>General Battery Query</span>
                </Button>
                <Button onClick={() => handleOptionClick('complain')} className="flex justify-start gap-2" variant="outline">
                  <MailQuestion className="h-5 w-5" />
                  <span>File a Complaint</span>
                </Button>
                <Button onClick={() => handleOptionClick('customersupport')} className="flex justify-start gap-2" variant="secondary">
                  <PhoneCall className="h-5 w-5" />
                  <span>Customer Support</span>
                </Button>
              </div>
            ) : (
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
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
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
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

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
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Button onClick={() => handleOptionClick('query')} className="flex justify-start gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>General Battery Query</span>
                </Button>
                <Button onClick={() => handleOptionClick('complain')} className="flex justify-start gap-2" variant="outline">
                  <MailQuestion className="h-5 w-5" />
                  <span>File a Complaint</span>
                </Button>
                <Button onClick={() => handleOptionClick('customersupport')} className="flex justify-start gap-2" variant="secondary">
                  <PhoneCall className="h-5 w-5" />
                  <span>Customer Support</span>
                </Button>
              </div>
            ) : (
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
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
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
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatBot;
