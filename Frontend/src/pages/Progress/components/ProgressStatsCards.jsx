import React from 'react';
import Card from '../../../components/ui/Card';
import { TrendingUp, Clock, Eye, Mic } from 'lucide-react';

export function ProgressStatsCards() {
  const stats = [
    {
      title: 'Average Overall Score',
      value: '79.2',
      unit: '/ 100',
      change: '+14.5%',
      changeText: 'vs first session',
      isPositive: true,
      gradient: 'from-[#6e4876] via-[#8c60a2] to-[#cd6775]',
      isGradientCard: true,
    },
    {
      title: 'Total Practice Time',
      value: '4.8',
      unit: 'hrs',
      change: '8 Sessions',
      changeText: 'completed',
      icon: Clock,
      color: 'text-[#8c60a2] bg-[#8c60a2]/10',
    },
    {
      title: 'Eye Contact Consistency',
      value: '84%',
      unit: '',
      change: '+22%',
      changeText: 'gaze stability',
      icon: Eye,
      color: 'text-[#fa846e] bg-[#fa846e]/10',
    },
    {
      title: 'Speech Fluency Index',
      value: '91%',
      unit: '',
      change: '2.1 avg',
      changeText: 'fillers / session',
      icon: Mic,
      color: 'text-[#cd6775] bg-[#cd6775]/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item, idx) => {
        if (item.isGradientCard) {
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-gradient-to-r ${item.gradient} text-white shadow-md shadow-[#6e4876]/20 flex flex-col justify-between min-h-[135px]`}
            >
              <div>
                <p className="text-xs font-semibold text-purple-100 uppercase tracking-wider">
                  {item.title}
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
                    {item.value}
                  </span>
                  <span className="text-xs font-semibold text-purple-200">{item.unit}</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-purple-100 mt-3 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{item.change} {item.changeText}</span>
              </p>
            </div>
          );
        }

        const Icon = item.icon;
        return (
          <Card key={idx} className="border border-[#ede3f0] flex flex-col justify-between min-h-[135px] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#6e5975] uppercase tracking-wider">
                  {item.title}
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                    {item.value}
                  </span>
                  {item.unit && <span className="text-xs font-semibold text-[#a08ba7]">{item.unit}</span>}
                </div>
              </div>

              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs font-semibold text-[#6e4876] mt-3 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{item.change}</span>
              <span className="text-[#a08ba7] font-normal">{item.changeText}</span>
            </p>
          </Card>
        );
      })}
    </div>
  );
}

export default ProgressStatsCards;
