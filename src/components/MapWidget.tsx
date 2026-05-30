import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export const MapWidget: React.FC = () => {
  const address = "Алматы қаласы, Ибрагим Кулланулы көшесі, 132/1, «AQPEIL» мейрамханасы";

  // Real active maps URLs for navigation to Aqpeil Restaurant in Almaty
  const mapLinks = {
    twoGis: "https://2gis.kz/almaty/geo/70000001101735389",
    yandex: "https://yandex.kz/maps/?text=Алматы%2C+Ибрагим+Кулланулы%2C+132/1+Aqpeil",
    google: "https://maps.google.com/?q=Aqpeil+Алматы+Кулланулы+132/1"
  };
  return (
    <div id="location-map-widget" className="w-full max-w-sm mx-auto px-4 my-4">
      {/* Decorative premium map preview frame */}
      <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-[#DFBA81]/40 shadow-md bg-[#F4EFE6] group">
        {/* Customized SVG vector representing a minimalist aesthetic luxury gold map design */}
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" fill="none">
          {/* Stylized streets */}
          <path d="M-10,40 L410,40" stroke="#DFBA81" strokeWidth="4" />
          <path d="M-10,140 L410,140" stroke="#DFBA81" strokeWidth="6" />
          <path d="M100,-10 L100,210" stroke="#DFBA81" strokeWidth="5" />
          <path d="M280,-10 L280,210" stroke="#DFBA81" strokeWidth="4" strokeDasharray="5,3" />

          {/* Secondary streets */}
          <path d="M30,30 L150,150" stroke="#C5A074" strokeWidth="2.5" />
          <path d="M250,30 L350,180" stroke="#C5A074" strokeWidth="2" />

          {/* Parks & River */}
          <rect x="120" y="60" width="140" height="60" rx="10" fill="#E8DEC9" />
          <path d="M-10,180 Q100,160 200,190 T410,170" stroke="#DFBA81" strokeWidth="3" fill="none" />

          {/* Compass Rose */}
          <g transform="translate(45, 100) scale(0.6)">
            <circle cx="20" cy="20" r="18" stroke="#C5A074" strokeWidth="1" />
            <path d="M20,2 L24,16 L20,20 L16,16 Z" fill="#C5A074" />
            <path d="M20,38 L24,24 L20,20 L16,24 Z" fill="#9E7C4F" />
            <path d="M38,20 L24,24 L20,20 L24,16 Z" fill="#C5A074" />
            <path d="M2,20 L16,24 L20,20 L16,16 Z" fill="#9E7C4F" />
          </g>
        </svg>

        {/* Ambient pulse around the location pin */}
        <div className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="absolute w-8 h-8 rounded-full bg-[#8C6239]/20 animate-ping"></span>
          <span className="absolute w-12 h-12 rounded-full bg-[#DFBA81]/15 animate-pulse-ring"></span>

          {/* Elegant active red-gold pin */}
          <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#8C6239] text-white shadow-lg border-2 border-white transform hover:scale-110 transition-transform duration-300">
            <MapPin className="w-5 h-5 text-[#F5E3B3] animate-[bounce_1.5s_infinite]" />
          </div>

          {/* Mini location label on the map */}
          <span className="mt-1.5 px-2 py-0.5 rounded-md bg-white/95 text-[10px] font-semibold text-[#8C6239] tracking-wider uppercase border border-[#DFBA81]/30 shadow-sm font-sans whitespace-nowrap">
            AQPEIL
          </span>
        </div>

        {/* Hover backdrop overlay with call-to-action */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-[#DFBA81]/40 rounded-full text-xs font-semibold text-[#8C6239] tracking-wider flex items-center gap-1 shadow-md">
            <Navigation className="w-3.5 h-3.5 animate-pulse" /> Навигацияны ашу
          </span>
        </div>
      </div>

      {/* Structured luxury map button items */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {/* 2GIS */}
        <a
          href={mapLinks.twoGis}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3.5 bg-white/90 shadow-sm rounded-xl border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-50/20 active:scale-95 transition-all text-center group"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold font-sans text-xs group-hover:scale-110 transition-transform">
            2GIS
          </div>
          <span className="mt-2 text-[11px] font-semibold text-[#8C6239] font-sans">
            2GIS-пен ашу
          </span>
        </a>

        {/* Yandex */}
        <a
          href={mapLinks.yandex}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3.5 bg-white/90 shadow-sm rounded-xl border-amber-500/20 hover:border-amber-600 hover:bg-amber-50/20 active:scale-95 transition-all text-center group"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-black font-sans text-base group-hover:scale-110 transition-transform">
            Y
          </div>
          <span className="mt-2 text-[11px] font-semibold text-[#8C6239] font-sans">
            Яндекс Карта
          </span>
        </a>

        {/* Google Maps */}
        <a
          href={mapLinks.google}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-3.5 bg-white/90 shadow-sm rounded-xl border-blue-500/20 hover:border-blue-600 hover:bg-blue-50/20 active:scale-95 transition-all text-center group"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <span className="mt-2 text-[11px] font-semibold text-[#8C6239] font-sans">
            Google Maps
          </span>
        </a>
      </div>
    </div>
  );
};