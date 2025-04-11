
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, ThermometerSun, Battery, Clock, AlertTriangle } from 'lucide-react';

const batteryFAQs = [
  {
    question: "What is the optimal charging level for my EV battery?",
    answer: "For everyday use, it's best to keep your EV battery between 20% and 80% charge. Regularly charging to 100% or letting it drop below 10% can accelerate battery degradation. For long trips, charging to 100% occasionally is acceptable.",
    icon: <Battery className="h-5 w-5 text-battery-blue" />
  },
  {
    question: "How does temperature affect my battery performance?",
    answer: "Temperature significantly impacts battery performance. Extreme cold can reduce range by up to 40%, while extreme heat accelerates degradation. Ideal operating temperature is between 60°F-80°F (15°C-27°C). When possible, park in temperature-controlled environments.",
    icon: <ThermometerSun className="h-5 w-5 text-amber-500" />
  },
  {
    question: "What is battery degradation and how can I minimize it?",
    answer: "Battery degradation is the natural loss of capacity over time. To minimize degradation: avoid frequent fast charging, maintain battery levels between 20-80%, park in moderate temperatures, avoid aggressive acceleration and braking, and follow the manufacturer's recommended maintenance schedule.",
    icon: <AlertTriangle className="h-5 w-5 text-orange-500" />
  },
  {
    question: "How often should I fully charge my battery?",
    answer: "Contrary to common belief, most modern batteries don't need regular full charges. In fact, frequent 100% charges can increase degradation. It's recommended to fully charge only before long trips or about once a month for battery management system calibration.",
    icon: <Clock className="h-5 w-5 text-purple-500" />
  },
  {
    question: "Is fast charging bad for my battery?",
    answer: "Occasional fast charging is fine, but frequent use can accelerate battery degradation due to increased heat generation. For daily use, standard charging is preferable whenever time permits. Reserve fast charging for road trips or emergency situations.",
    icon: <Battery className="h-5 w-5 text-battery-blue" />
  },
  {
    question: "What's the typical lifespan of an EV battery?",
    answer: "Most modern EV batteries are designed to last 8-10 years or 100,000-150,000 miles before degrading to 70-80% of their original capacity. However, with proper care, many batteries exceed these estimates. Battery longevity varies based on battery chemistry, climate, and driving habits.",
    icon: <Clock className="h-5 w-5 text-green-500" />
  },
  {
    question: "Should I keep my EV plugged in when not in use?",
    answer: "For short periods (a few days), there's no harm in leaving your vehicle unplugged if the battery level is between 30-80%. For extended periods, it's better to leave it plugged in with charge limit set to 50-60%, allowing the battery management system to maintain optimal cell balance.",
    icon: <Battery className="h-5 w-5 text-battery-blue" />
  },
  {
    question: "How does driving style affect battery health?",
    answer: "Aggressive driving significantly impacts battery health. High-speed driving, rapid acceleration, and hard braking increase battery temperature and energy consumption. Smooth, consistent driving with gentle acceleration and regenerative braking helps maximize battery life and range.",
    icon: <AlertTriangle className="h-5 w-5 text-orange-500" />
  },
  {
    question: "Can I use my EV in extreme weather conditions?",
    answer: "Yes, but with precautions. In extreme cold, pre-condition your vehicle while plugged in and expect reduced range. In extreme heat, avoid parking in direct sunlight, use climate control strategically, and try to charge during cooler hours to reduce thermal stress on the battery.",
    icon: <ThermometerSun className="h-5 w-5 text-red-500" />
  },
  {
    question: "How accurate are the range estimates on my dashboard?",
    answer: "Range estimates vary in accuracy depending on driving conditions and habits. They typically use recent driving data to project future range. For more reliable estimates, use the vehicle for several days in similar conditions. Remember that climate control, speed, and terrain significantly impact actual range.",
    icon: <HelpCircle className="h-5 w-5 text-gray-500" />
  }
];

const FAQSection = () => {
  return (
    <section className="py-12 bg-gray-50" id="faqs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert answers to the most common questions about electric vehicle batteries.
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto shadow-md">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {batteryFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="flex items-center gap-2 text-left">
                    <span className="flex items-center gap-2">
                      {faq.icon}
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;
