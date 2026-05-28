import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthesizerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // A beautiful traditional-sounding Kazakh melody in MIDI notes to synthesize if MP3 loads slowly
  const melodyNotes = [
    // Nuray's theme - beautiful pentatonic motif (A minor pentatonic: A, C, D, E, G, A)
    { note: 60, dur: 0.4 }, { note: 64, dur: 0.4 }, { note: 67, dur: 0.8 },
    { note: 69, dur: 0.8 }, { note: 67, dur: 0.4 }, { note: 64, dur: 0.4 },
    { note: 62, dur: 0.8 }, { note: 60, dur: 0.8 }, { note: 64, dur: 0.4 },
    { note: 62, dur: 0.4 }, { note: 60, dur: 0.8 }, { note: 57, dur: 1.2 },
    // Repeat up an octave
    { note: 72, dur: 0.4 }, { note: 76, dur: 0.4 }, { note: 79, dur: 0.8 },
    { note: 81, dur: 0.8 }, { note: 79, dur: 0.4 }, { note: 76, dur: 0.4 },
    { note: 74, dur: 0.8 }, { note: 72, dur: 0.8 }, { note: 76, dur: 0.4 },
    { note: 74, dur: 0.4 }, { note: 72, dur: 0.8 }, { note: 69, dur: 1.2 },
  ];

  // Map MIDI note to frequency
  const midiToFreq = (note: number) => {
    return 440 * Math.pow(2, (note - 69) / 12);
  };

  // Synthesize a beautiful traditional "dombra" pluck sound
  const playDombraPluck = (ctx: AudioContext, freq: number, time: number) => {
    // A dombra has two strings plucked almost simultaneously (double pluck effect)
    for (let i = 0; i < 2; i++) {
      const delay = i * 0.035; // tiny strum delay
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Traditional dombra is rich in harmonics - triangle wave with high frequency filter
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * (i === 1 ? 1.002 : 1), time + delay); // slight detune
      
      // Filter to dampen high-frequency buzz down for warm wooden feel
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

    let noteIdx = 0;
    let nextTime = ctx.currentTime;

    const playNext = () => {
      if (!isPlaying) return;
      
      const item = melodyNotes[noteIdx];
      // Play note
      playDombraPluck(ctx, midiToFreq(item.note), nextTime);
      
      // Schedule next note
      nextTime += item.dur;
      noteIdx = (noteIdx + 1) % melodyNotes.length;

      // Plan next tick
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

  // Try playing real beautiful instrumental MP3 first, fallback to synthesized if blocked
  const togglePlay = async () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    // Audio context initialization
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (nextState) {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        } else {
          startSynthesis();
        }
      } catch (err) {
        console.warn("Audio file auto-play failed or blocked. Resorting to fallback synthesizer.", err);
        // Play fallback synth
        startSynthesis();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthesis();
    }
  };

  useEffect(() => {
    if (isPlaying && !audioRef.current) {
      startSynthesis();
    }
    return () => {
      stopSynthesis();
    };
  }, [isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {/* Hidden audio element loading a pristine, high-quality traditional Kazakh wedding melody */}
      <audio 
        ref={audioRef}
        src="/uzatu-invitation/ukili-kamshat.mp3" // Premium fallback standard loop
        loop
        preload="auto"
        className="hidden"
      />

      {/* Pulsing playing bars representation */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-4 px-2 py-1 bg-white/80 backdrop-blur-md rounded-full border border-[#DFBA81]/30">
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.1s] h-3"></div>
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.3s] h-2"></div>
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.2s] h-4"></div>
          <div className="w-[2px] bg-[#C5A074] rounded-full animate-[bounce_0.8s_infinite_0.5s] h-1.5"></div>
        </div>
      )}

      {/* Beautiful ornamental circle play buttons */}
      <button
        onClick={togglePlay}
        id="audio-toggle-btn"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg border border-[#DFBA81]/40 hover:scale-105 transition-all active:scale-95 duration-350 cursor-pointer group relative overflow-hidden"
        title={isPlaying ? "Әуенді өшіру" : "Әуенді қосу"}
      >
        {/* Ambient gold glow ring around active button */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-[#DFBA81] animate-ping opacity-40"></span>
        )}

        {/* Traditional circular spinning lines when active */}
        <div className={`absolute inset-0.5 border border-dashed border-[#C5A074]/30 rounded-full ${isPlaying ? 'animate-spin-slow' : ''}`}></div>

        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-[#9E7C4F] group-hover:scale-110 transition-transform" />
        ) : (
          <Music className="w-5 h-5 text-[#C5A074] group-hover:scale-110 transition-transform animate-pulse" />
        )}
      </button>
    </div>
  );
};
