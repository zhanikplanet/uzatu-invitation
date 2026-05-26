import React, { useState, useEffect } from 'react';
import { RSVPResponse } from '../types';
import { Check, ClipboardList, Trash2, Users } from 'lucide-react';

export const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'couple' | 'no'>('yes');
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  // Load responses from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('uzatu_rsvp_responses');
    if (saved) {
      try {
        setResponses(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse RSVP responses", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newResponse: RSVPResponse = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      attendance,
      timestamp: new Date().toLocaleDateString('kk-KZ', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [...responses, newResponse];
    setResponses(updated);
    localStorage.setItem('uzatu_rsvp_responses', JSON.stringify(updated));
    setSubmitted(true);
    setName('');
  };

  const removeResponse = (id: string) => {
    const updated = responses.filter(r => r.id !== id);
    setResponses(updated);
    localStorage.setItem('uzatu_rsvp_responses', JSON.stringify(updated));
  };

  // Stats calculate
  const stats = responses.reduce((acc, curr) => {
    if (curr.attendance === 'yes') acc.solo += 1;
    else if (curr.attendance === 'couple') acc.couple += 2; // couples are 2 attendees
    else acc.no += 1;
    return acc;
  }, { solo: 0, couple: 0, no: 0 });

  const totalAttendees = stats.solo + stats.couple;

  return (
    <div id="rsvp-section" className="w-full max-w-sm mx-auto px-4 my-8">
      {/* RSVP Content */}
      <div className="relative bg-[#FCFAF6] border border-[#DFBA81]/30 rounded-2xl p-6 shadow-md overflow-hidden">
        {/* Subtle background Kazakh ornament backdrop */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#DFBA81]" fill="none" strokeWidth="1">
            <circle cx="50" cy="50" r="40" />
            <path d="M50,10 L50,90 M10,50 L90,50" />
          </svg>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Attendance Options */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#8C6239] tracking-wider uppercase font-sans">
                Достық ниетіңіз:
              </label>
              
              <div className="space-y-2">
                {/* Option 1: Solo */}
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

                {/* Option 2: Couple */}
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

                {/* Option 3: Decline */}
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
              <span className="text-rose-500 font-bold text-2xl font-serif">♥</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-serif text-xl font-semibold text-[#8C6239]">
                Рақмет!
              </h4>
              <p className="text-xs text-[#9E7C4F] max-w-xs mx-auto px-4 leading-relaxed leading-5">
                Жауабыңыз ойдағыдай қабылданды. Нұрайдың қыз ұзату тойында сізді асыға күтеміз!
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

      {/* Hidden Collapsible Panel for Hosts to View Collected Responses */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DFBA81]/20 bg-white/70 backdrop-blur-sm shadow-sm hover:bg-[#FCFAF6] hover:border-[#DFBA81]/40 transition-colors text-[10px] font-bold tracking-wider uppercase text-[#9E7C4F] cursor-pointer"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          {showAdmin ? 'Жауаптарды жасыру' : 'Той иелері үшін (Жауаптар)'}
          <span className="bg-[#8C6239] text-white text-[9px] px-1.5 py-0.5 rounded-full font-sans font-bold ml-1">
            {responses.length}
          </span>
        </button>

        {showAdmin && (
          <div className="w-full mt-3 bg-white border border-[#DFBA81]/30 rounded-2xl p-4 shadow-lg space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between border-b border-[#DFBA81]/10 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C6239] uppercase font-sans">
                <Users className="w-4 h-4 text-[#C5A074]" /> Статистика
              </div>
              <span className="text-[10px] font-bold text-[#A68864] uppercase tracking-wider">
                Келетіндер: <strong className="text-emerald-600 font-sans">{totalAttendees} адам</strong>
              </span>
            </div>

            {/* Micro Stats Display */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-emerald-50/50 rounded-xl border border-emerald-500/10">
                <span className="block text-[10px] text-emerald-700/80 font-semibold uppercase leading-tight">Келеді</span>
                <span className="font-serif text-sm font-bold text-emerald-800 font-sans">{stats.solo}</span>
              </div>
              <div className="p-2 bg-teal-50/50 rounded-xl border border-teal-500/10">
                <span className="block text-[10px] text-teal-700/80 font-semibold uppercase leading-tight">Жұбымен</span>
                <span className="font-serif text-sm font-bold text-teal-800 font-sans">{stats.couple / 2}</span>
              </div>
              <div className="p-2 bg-rose-50/50 rounded-xl border border-rose-500/10">
                <span className="block text-[10px] text-rose-700/80 font-semibold uppercase leading-tight">Келмейді</span>
                <span className="font-serif text-sm font-bold text-rose-800 font-sans">{stats.no}</span>
              </div>
            </div>

            {/* Responses List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {responses.length === 0 ? (
                <p className="text-center text-[10px] italic text-[#A68864]/70 py-4">
                  Әзірге жауаптар жоқ
                </p>
              ) : (
                responses.map((resp) => (
                  <div key={resp.id} className="flex items-center justify-between p-2.5 bg-[#FCFAF6] rounded-xl border border-[#DFBA81]/15 text-xs group">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <p className="font-semibold text-[#8C6239] font-sans break-all">
                        {resp.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#A68864]">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          resp.attendance === 'no' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}></span>
                        <span>
                          {resp.attendance === 'yes' && 'Келеді (1 адам)'}
                          {resp.attendance === 'couple' && 'Жұбымен бірге (2 адам)'}
                          {resp.attendance === 'no' && 'Қатыса алмайды'}
                        </span>
                        <span className="text-[9px] text-[#A68864]/50">• {resp.timestamp}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeResponse(resp.id)}
                      className="text-rose-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50/80 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Өшіру"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
