import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthesizerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Мелодия домбры
  const melodyNotes = [
    { note: 60, dur: 0.4 }, { note: 64, dur: 0.4 }, { note: 67, dur: 0.8 },
    { note: 69, dur: 0.8 }, { note: 67, dur: 0.4 }, { note: 64, dur: 0.4 },
    { note: 62, dur: 0.8 }, { note: 60, dur: 0.8 }, { note: 64, dur: 0.4 },
    { note: 62, dur: 0.4 }, { note: 60, dur: 0.8 }, { note: 57, dur: 1.2 },
    { note: 72, dur: 0.4 }, { note: 76, dur: 0.4 }, { note: 79, dur: 0.8 },
    { note: 81, dur: 0.8 }, { note: 79, dur: 0.4 }, { note: 76, dur: 0.4 },
    { note: 74, dur: 0.8 }, { note: 72, dur: 0.8 }, { note: 76, dur: 0.4 },
    { note: 74, dur: 0.4 }, { note: 72, dur: 0.8 }, { note: 69, dur: 1.2 },
  ];

  const midiToFreq = (note: number) => 440 * Math.pow(2, (note - 69) / 12);

  const playDombraPluck = (ctx: AudioContext, freq: number, time: number) => {
    for (let i = 0; i < 2; i++) {
      const delay = i * 0.035;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * (i === 1 ? 1.002 : 1), time + delay);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, time + delay);
      filter.frequency.exponentialRampToValueAtTime(150, time + delay + 0.3);

      gain.gain.setValueAtTime(0, time + delay);
      gain.gain.linearRampToValueAtTime(0.25, time + delay + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time + delay);
      osc.stop(time + delay + 0.8);
    }
  };

  const startSynthesis = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    stopSynthesis(); // Убираем старые таймеры перед запуском

    let noteIdx = 0;
    let nextTime = ctx.currentTime;

    const playNext = () => {
      const item = melodyNotes[noteIdx];
      playDombraPluck(ctx, midiToFreq(item.note), nextTime);
      
      nextTime += item.dur;
      noteIdx = (noteIdx + 1) % melodyNotes.length;

      const delayMs = item.dur * 1000;
      synthesizerIntervalRef.current = setTimeout(playNext, delayMs);
    };

    playNext();
  };

  const stopSynthesis = () => {
    if (synthesizerIntervalRef.current) {
      clearTimeout(synthesizerIntervalRef.current);
      synthesizerIntervalRef.current = null;
    }
  };

  // Единая функция для принудительного старта (и для автоплея, и для кнопки)
  const playAudioTrack = async () => {
    setIsPlaying(true);
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    try {
      if (audioRef.current) {
        await audioRef.current.play();
      } else {
        startSynthesis();
      }
    } catch (err) {
      console.warn("MP3 заблокирован браузером. Запускаем встроенный синтезатор домбры.", err);
      startSynthesis();
    }
  };

  // Функция для остановки
  const pauseAudioTrack = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthesis();
  };

  // Ручное управление по клику на кнопку
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudioTrack();
    } else {
      playAudioTrack();
    }
  };

  // АВТОПЛЕЙ ХАК ДЛЯ ПРОДАКШЕНА
  useEffect(() => {
    const attemptAutoplay = async () => {
      // Пробуем запуститься мгновенно
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
          removeAllListeners(); // Если завелось сразу, убираем «слушателей»
        }
      } catch (e) {
        console.log("Браузер ждет взаимодействия с экраном для включения музыки...");
      }
    };

    // Активация при любом первом движении гостя на сайте
    const handleUserInteraction = () => {
      playAudioTrack();
      removeAllListeners(); // Активировали один раз и забыли
    };

    const removeAllListeners = () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
    };

    // Запуск проверки
    attemptAutoplay();

    // Вешаем страховку на любые действия пользователя
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('mousemove', handleUserInteraction, { passive: true });

    return () => {
      removeAllListeners();
      stopSynthesis();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <audio 
        ref={audioRef}
        src="/uzatu-invitation/ukili-kamshat.mp3" 
        loop
        preload="auto"
        className="hidden"
      />

      {/* Анимированные пульсирующие полоски звука */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-4 px-2 py-1 bg-white/80 backdrop-blur-md rounded-full border border-[#DFBA81]/30">
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.1s] h-3"></div>
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.3s] h-2"></div>
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.2s] h-4"></div>
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.5s] h-1.5"></div>
        </div>
      )}

      {/* Кнопка управления */}
      <button
        onClick={togglePlay}
        id="audio-toggle-btn"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg border border-[#DFBA81]/40 hover:scale-105 transition-all active:scale-95 duration-350 cursor-pointer group relative overflow-hidden"
        title={isPlaying ? "Әуенді өшіру" : "Әуенді қосу"}
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-[#DFBA81] animate-ping opacity-40"></span>
        )}

        <div className={`absolute inset-0.5 border border-dashed border-[#C5A074]/30 rounded-full ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}></div>

        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#9E7C4F] group-hover:scale-110 transition-transform" />
        ) : (
          <Music className="w-5 h-5 text-[#C5A074] group-hover:scale-110 transition-transform animate-pulse" />
        )}
      </button>
    </div>
  );
};