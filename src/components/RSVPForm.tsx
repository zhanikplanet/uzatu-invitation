import React, { useState, useEffect } from 'react';
import { RSVPResponse } from '../types';

export const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'couple' | 'no'>('yes');
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<RSVPResponse[]>([]);

  // Load responses from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('uzatu_rsvp_responses');

    if (saved) {
      try {
        setResponses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse RSVP responses', e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    // TELEGRAM
    const TELEGRAM_BOT_TOKEN =
      '8428721933:AAG3Bl1t1gKnATnPUyNNT5xs5ghV5CdG29c';

    const TELEGRAM_CHAT_ID = '8251442133';

    // Красивый текст ответа
    let statusText = '';

    if (attendance === 'yes') {
      statusText = '✅ Келемін';
    }

    if (attendance === 'couple') {
      statusText = '👩‍❤️‍👨 Жұбыммен келемін';
    }

    if (attendance === 'no') {
      statusText = '❌ Өкінішке орай, қатыса алмаймын';
    }

    const message = `
🔔 Жаңа жауап (Ұзату той)

👤 Қонақ: ${name.trim()}
📌 Жауабы: ${statusText}
⏰ Уақыты: ${new Date().toLocaleString('kk-KZ')}
    `.trim();

    // Отправка в Telegram
    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );
    } catch (error) {
      console.error('Ошибка Telegram:', error);
    }

    // Сохранение в localStorage
    const newResponse: RSVPResponse = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      attendance,
      timestamp: new Date().toLocaleDateString('kk-KZ', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [...responses, newResponse];

    setResponses(updated);

    localStorage.setItem(
      'uzatu_rsvp_responses',
      JSON.stringify(updated)
    );

    setSubmitted(true);
    setName('');
  };

  return (
    <div id="rsvp-section" className="w-full max-w-sm mx-auto px-4 my-8">
      <div className="relative bg-[#FCFAF6] border border-[#DFBA81]/30 rounded-2xl p-6 shadow-md overflow-hidden">
        
        {/* Ornament */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 opacity-10 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full stroke-[#DFBA81]"
            fill="none"
            strokeWidth="1"
          >
            <circle cx="50" cy="50" r="40" />
            <path d="M50,10 L50,90 M10,50 L90,50" />
          </svg>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Header */}
            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#9E7C4F] font-semibold">
                Жауап парағы
              </span>

              <h3 className="font-serif text-2xl text-[#8C6239] font-medium">
                Сауалнама
              </h3>

              <p className="text-xs text-[#9E7C4F] italic">
                Тойға келетініңізді растауыңызды сұраймыз
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#8C6239] tracking-wider uppercase font-sans">
                Аты-жөніңіз:
              </label>

              <p className="text-[10px] text-[#A68864] leading-relaxed">
                (Жұбыңызбен келетін болсаңыз, есіміңізді бірге жазуыңызды өтінеміз)
              </p>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Есіміңіз"
                required
                className="w-full px-4 py-3 bg-white border border-[#DFBA81]/40 rounded-xl text-sm focus:outline-none focus:border-[#C5A074] focus:ring-1 focus:ring-[#C5A074] placeholder-[#A68864]/50 text-[#8C6239] transition-colors font-sans font-medium shadow-inner"
              />
            </div>

            {/* Attendance */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#8C6239] tracking-wider uppercase font-sans">
                Достық ниетіңіз:
              </label>

              <div className="space-y-2">

                {/* Yes */}
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DFBA81]/25 hover:border-[#DFBA81]/60 transition-colors cursor-pointer group shadow-sm">
                  <input
                    type="radio"
                    name="attendance"
                    checked={attendance === 'yes'}
                    onChange={() => setAttendance('yes')}
                    className="w-4 h-4 accent-[#8C6239] cursor-pointer"
                  />

                  <span className="text-xs font-medium text-[#8C6239] font-sans group-hover:translate-x-0.5 transition-transform">
                    Келемін
                  </span>
                </label>

                {/* Couple */}
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DFBA81]/25 hover:border-[#DFBA81]/60 transition-colors cursor-pointer group shadow-sm">
                  <input
                    type="radio"
                    name="attendance"
                    checked={attendance === 'couple'}
                    onChange={() => setAttendance('couple')}
                    className="w-4 h-4 accent-[#8C6239] cursor-pointer"
                  />

                  <span className="text-xs font-medium text-[#8C6239] font-sans group-hover:translate-x-0.5 transition-transform">
                    Жұбыммен келемін
                  </span>
                </label>

                {/* No */}
                <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DFBA81]/25 hover:border-[#DFBA81]/60 transition-colors cursor-pointer group shadow-sm">
                  <input
                    type="radio"
                    name="attendance"
                    checked={attendance === 'no'}
                    onChange={() => setAttendance('no')}
                    className="w-4 h-4 accent-[#8C6239] cursor-pointer"
                  />

                  <span className="text-xs font-medium text-[#8C6239]/80 font-sans group-hover:translate-x-0.5 transition-transform">
                    Өкінішке орай, қатыса алмаймын
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#9E7C4F] via-[#C5A074] to-[#8C6239] text-[#FFF] hover:shadow-lg hover:brightness-105 active:scale-98 text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 font-sans shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              ЖІБЕРУ
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
              <span className="text-rose-500 font-bold text-2xl font-serif">
                ♥
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-xl font-semibold text-[#8C6239]">
                Рақмет!
              </h4>

              <p className="text-xs text-[#9E7C4F] max-w-xs mx-auto px-4 leading-relaxed leading-5">
                Жауабыңыз ойдағыдай қабылданды. Ақжанның қыз ұзату тойында сізді асыға күтеміз!
              </p>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-4 py-2 text-[10px] font-bold tracking-wider uppercase border border-[#DFBA81]/40 rounded-lg text-[#8C6239] hover:bg-[#DFBA81]/10 bg-white shadow-sm transition-colors cursor-pointer"
            >
              Қайта жауап беру
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
