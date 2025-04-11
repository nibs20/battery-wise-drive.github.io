
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Battery, TrendingUp, Clock, ThermometerSun, Zap } from 'lucide-react';

// Mock data for the graph
const weeklyData = [
  { day: 'Mon', charge: 85, temperature: 70, efficiency: 92, consumption: 12 },
  { day: 'Tue', charge: 75, temperature: 65, efficiency: 89, consumption: 15 },
  { day: 'Wed', charge: 90, temperature: 68, efficiency: 94, consumption: 10 },
  { day: 'Thu', charge: 65, temperature: 72, efficiency: 87, consumption: 18 },
  { day: 'Fri', charge: 80, temperature: 75, efficiency: 91, consumption: 14 },
  { day: 'Sat', charge: 95, temperature: 71, efficiency: 96, consumption: 8 },
  { day: 'Sun', charge: 70, temperature: 69, efficiency: 88, consumption: 16 }
];

const monthlyData = [
  { week: 'Week 1', charge: 82, temperature: 70, efficiency: 91, consumption: 48 },
  { week: 'Week 2', charge: 78, temperature: 68, efficiency: 89, consumption: 52 },
  { week: 'Week 3', charge: 85, temperature: 72, efficiency: 93, consumption: 45 },
  { week: 'Week 4', charge: 80, temperature: 71, efficiency: 90, consumption: 50 }
];

const chartConfig = {
  charge: {
    label: "Battery Charge (%)",
    theme: {
      light: "#4f46e5",
      dark: "#818cf8"
    }
  },
  temperature: {
    label: "Temperature (°F)",
    theme: {
      light: "#ef4444",
      dark: "#f87171"
    }
  },
  efficiency: {
    label: "Efficiency (%)",
    theme: {
      light: "#10b981",
      dark: "#34d399"
    }
  },
  consumption: {
    label: "Energy Used (kWh)",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24"
    }
  }
};

const UsageGraph = () => {
  const [activeDataset, setActiveDataset] = useState('weekly');
  const [graphType, setGraphType] = useState('line');
  
  const data = activeDataset === 'weekly' ? weeklyData : monthlyData;
  const xAxisKey = activeDataset === 'weekly' ? 'day' : 'week';
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-battery-blue/10 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-battery-blue" />
          Usage Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="weekly" className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="weekly" onClick={() => setActiveDataset('weekly')}>Weekly</TabsTrigger>
              <TabsTrigger value="monthly" onClick={() => setActiveDataset('monthly')}>Monthly</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setGraphType('line')} 
                className={`px-3 py-1 text-xs rounded ${graphType === 'line' ? 'bg-battery-blue text-white' : 'bg-gray-100'}`}
              >
                Line
              </button>
              <button 
                onClick={() => setGraphType('bar')} 
                className={`px-3 py-1 text-xs rounded ${graphType === 'bar' ? 'bg-battery-blue text-white' : 'bg-gray-100'}`}
              >
                Bar
              </button>
              <button 
                onClick={() => setGraphType('area')} 
                className={`px-3 py-1 text-xs rounded ${graphType === 'area' ? 'bg-battery-blue text-white' : 'bg-gray-100'}`}
              >
                Area
              </button>
            </div>
          </div>
          
          <TabsContent value="weekly" className="h-[300px]">
            <ChartContainer className="h-full" config={chartConfig}>
              {graphType === 'line' && (
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 20]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="charge" 
                    stroke="var(--color-charge)" 
                    yAxisId="left" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="var(--color-efficiency)" 
                    yAxisId="left" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="var(--color-consumption)" 
                    yAxisId="right" 
                    strokeWidth={2} 
                  />
                  <Legend />
                </LineChart>
              )}
              
              {graphType === 'bar' && (
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 20]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="charge" fill="var(--color-charge)" yAxisId="left" />
                  <Bar dataKey="efficiency" fill="var(--color-efficiency)" yAxisId="left" />
                  <Bar dataKey="consumption" fill="var(--color-consumption)" yAxisId="right" />
                  <Legend />
                </BarChart>
              )}
              
              {graphType === 'area' && (
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 20]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="charge" 
                    stroke="var(--color-charge)" 
                    fill="var(--color-charge)" 
                    fillOpacity={0.3}
                    yAxisId="left" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="var(--color-efficiency)" 
                    fill="var(--color-efficiency)" 
                    fillOpacity={0.3}
                    yAxisId="left" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="var(--color-consumption)" 
                    fill="var(--color-consumption)" 
                    fillOpacity={0.3}
                    yAxisId="right" 
                  />
                  <Legend />
                </AreaChart>
              )}
            </ChartContainer>
          </TabsContent>
          
          <TabsContent value="monthly" className="h-[300px]">
            <ChartContainer className="h-full" config={chartConfig}>
              {graphType === 'line' && (
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[40, 60]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="charge" 
                    stroke="var(--color-charge)" 
                    yAxisId="left" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="var(--color-efficiency)" 
                    yAxisId="left" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="var(--color-consumption)" 
                    yAxisId="right" 
                    strokeWidth={2} 
                  />
                  <Legend />
                </LineChart>
              )}
              
              {graphType === 'bar' && (
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[40, 60]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="charge" fill="var(--color-charge)" yAxisId="left" />
                  <Bar dataKey="efficiency" fill="var(--color-efficiency)" yAxisId="left" />
                  <Bar dataKey="consumption" fill="var(--color-consumption)" yAxisId="right" />
                  <Legend />
                </BarChart>
              )}
              
              {graphType === 'area' && (
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" domain={[40, 60]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="charge" 
                    stroke="var(--color-charge)" 
                    fill="var(--color-charge)" 
                    fillOpacity={0.3}
                    yAxisId="left" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="var(--color-efficiency)" 
                    fill="var(--color-efficiency)" 
                    fillOpacity={0.3}
                    yAxisId="left" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="var(--color-consumption)" 
                    fill="var(--color-consumption)" 
                    fillOpacity={0.3}
                    yAxisId="right" 
                  />
                  <Legend />
                </AreaChart>
              )}
            </ChartContainer>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Battery className="h-4 w-4 text-battery-blue" />
              <span>Avg. Charge</span>
            </div>
            <div className="mt-1 text-xl font-semibold">78%</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Consumption</span>
            </div>
            <div className="mt-1 text-xl font-semibold">13.3 kWh</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-purple-500" />
              <span>Charge Time</span>
            </div>
            <div className="mt-1 text-xl font-semibold">2.4 hrs</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ThermometerSun className="h-4 w-4 text-red-500" />
              <span>Avg. Temp</span>
            </div>
            <div className="mt-1 text-xl font-semibold">70°F</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageGraph;
