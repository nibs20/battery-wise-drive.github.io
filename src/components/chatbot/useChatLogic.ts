
import { useState } from 'react';
import { ChatMessage, SupportOption } from './types';

export function useChatLogic() {
  const [activeOption, setActiveOption] = useState<SupportOption | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hello! How can I help you with your battery today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');

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

  return {
    activeOption,
    messages,
    inputValue,
    setInputValue,
    handleOptionClick,
    handleSendMessage
  };
}
