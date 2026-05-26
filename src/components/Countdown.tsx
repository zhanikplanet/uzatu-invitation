import React, { useState, useEffect } from 'react';
import { CountdownState } from '../types';

export const Countdown: React.FC = () => {
  const calculateTimeLeft = (): CountdownState => {
    // September 28, 2026 at 17:00:00
    const targetDate = new Date('2026-09-28T17:00:00').getTime();
    const difference = targetDate - new Date().getTime();

    let timeLeft: CountdownState = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<CountdownState>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeItems = [
    { value: timeLeft.days, label: 'күн', key: 'days' },
    { value: timeLeft.hours, label: 'сағат', key: 'hours' },
    { value: timeLeft.minutes, label: 'минут', key: 'minutes' },
    { value: timeLeft.seconds, label: 'секунд', key: 'seconds' },
  ];

  return (
    <div id="countdown-timer-container" className="flex justify-center items-center gap-4 sm:gap-6 my-6">
      {timeItems.map((item) => (
        <div key={item.key} className="flex flex-col items-center">
          {/* Circular frame containing count */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-white/70 shadow-md border border-[#DFBA81]/40 backdrop-blur-sm group hover:border-[#C5A074] transition-colors duration-300">
            {/* Elegant outer glow ring */}
            <div className="absolute inset-1 rounded-full border border-dashed border-[#C5A074]/30 group-hover:scale-105 transition-transform duration-300"></div>
            
            <span className="font-serif text-xl sm:text-2xl font-semibold text-[#8C6239] num-anim">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-2 text-[11px] sm:text-xs tracking-wider uppercase text-[#9E7C4F] font-sans font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
