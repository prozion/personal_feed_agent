import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, MessageSquare, Zap } from 'lucide-react';

const mockChartData = [
  { time: '00:00', tokens: 1200, cost: 0.12, posts: 45 },
  { time: '04:00', tokens: 800, cost: 0.08, posts: 20 },
  { time: '08:00', tokens: 4500, cost: 0.45, posts: 150 },
  { time: '12:00', tokens: 6200, cost: 0.62, posts: 210 },
  { time: '16:00', tokens: 5100, cost: 0.51, posts: 180 },
  { time: '20:00', tokens: 3400, cost: 0.34, posts: 120 },
  { time: '23:59', tokens: 1500, cost: 0.15, posts: 60 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-800 rounded-lg">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className={`flex items-center text-xs font-medium px-2 py-1 rounded ${
        trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}>
        {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">System Overview</h2>
        <div className="flex gap-2">
           <select className="bg-gray-900 border border-gray-800 text-sm text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500">
             <option>Last 24 Hours</option>
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Useful Posts Ratio" 
          value="18.5%" 
          change="+2.4%" 
          icon={Activity} 
          trend="up" 
        />
        <StatCard 
          title="Token Usage (Daily)" 
          value="45,230" 
          change="-5.1%" 
          icon={Zap} 
          trend="down" 
        />
        <StatCard 
          title="Est. Daily Cost" 
          value="$1.45" 
          change="-0.30" 
          icon={DollarSign} 
          trend="down" 
        />
        <StatCard 
          title="Messages Processed" 
          value="3,402" 
          change="+12.5%" 
          icon={MessageSquare} 
          trend="up" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Token Consumption & Cost</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Throughput Volume</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#374151', opacity: 0.2}}
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                />
                <Bar dataKey="posts" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};