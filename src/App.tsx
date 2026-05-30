import React from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Music,
  Share2,
  ChevronDown,
  Info,
  Sparkles
} from 'lucide-react';
import {
  GoldGradient,
  KazakhOrnamentCorner,
  KazakhOrnamentDivider,
  KazakhOrnamentCircle
} from './components/Ornaments';
import { AudioPlayer } from './components/AudioPlayer';
import { Countdown } from './components/Countdown';
import { MapWidget } from './components/MapWidget';
import { RSVPForm } from './components/RSVPForm';

// Bride image path from the environment generator
const brideImg = '/uzatu-invitation/uzatu.jpeg';

export default function App() {
  // Animating configurations
  const variantFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const variantScaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ақжан — Қыз Ұзату Шақыртуы',
          text: 'Ақжанның қыз ұзату тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болыңыздар!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing invitation', err);
      }
    } else {
      // Copy to clipboard fallback
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Шакырту сілтемесі көшірілді!');
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF5EC] flex items-center justify-center p-0 sm:p-4 md:p-8 font-sans selection:bg-[#DFBA81]/30 selection:text-[#8C6239] relative overflow-hidden">

      {/* Background elegant watercolor decor for desktop users */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-200/20 rounded-full filter blur-3xl pointer-events-none hidden lg:block"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DFBA81]/10 rounded-full filter blur-3xl pointer-events-none hidden lg:block"></div>

      {/* Gold Gradient SVG helper */}
      <GoldGradient />

      {/* Background floral decoration for desktop corners */}
      <div className="absolute top-0 left-0 p-6 hidden lg:flex flex-col gap-1 max-w-xs text-[#8C6239]/40 pointer-events-none font-serif">
        <span className="text-xl tracking-widest font-bold">САЙТ ШАҚЫРТУ</span>
        <span className="text-xs tracking-wider uppercase">Керемет салтанатты естелік</span>
      </div>

      <div className="absolute top-0 right-0 p-6 hidden lg:flex flex-col gap-1 text-right max-w-xs text-[#8C6239]/40 pointer-events-none font-serif">
        <span className="text-xl tracking-widest font-bold">&mdash; Ақжан &mdash;</span>
        <span className="text-xs tracking-wider uppercase">Қыз Ұзату Шақыртуы</span>
      </div>

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Main Container: Mobile Frame Mockup on Desktop, full-screen on Mobile */}
      <div
        id="app-frame"
        className="relative w-full h-full max-w-md bg-[#FAF6EE] md:rounded-[36px] overflow-y-auto overflow-x-hidden shadow-[0_25px_60px_-15px_rgba(140,98,57,0.25)] border-0 md:border-8 border-[#FCFAF6] flex flex-col items-center flex-1 lg:max-h-[92vh] scroll-smooth"
      >
        {/* Intricate Inner Golden Frame with padding */}
        <div className="absolute inset-3 border-2 border-[#DFBA81]/20 pointer-events-none rounded-[16px] md:rounded-[28px] z-10"></div>
        <div className="absolute inset-4 border border-dashed border-[#DFBA81]/15 pointer-events-none rounded-[12px] md:rounded-[24px] z-10"></div>

        {/* Traditional Corner Ornaments (Absolute positioned inside the frames) */}
        <KazakhOrnamentCorner className="absolute top-6 left-6 w-12 h-12 opacity-80 z-20" />
        <KazakhOrnamentCorner className="absolute top-6 right-6 w-12 h-12 opacity-80 z-20 scale-x-[-1]" />
        <KazakhOrnamentCorner className="absolute bottom-6 left-6 w-12 h-12 opacity-80 z-20 scale-y-[-1]" />
        <KazakhOrnamentCorner className="absolute bottom-6 right-6 w-12 h-12 opacity-80 z-20 scale-x-[-1] scale-y-[-1]" />

        {/* Delicate Sakura/Peony Floral Branches overlays (soft watercolor style) */}
        <div className="absolute top-4 left-4 w-28 h-28 pointer-events-none opacity-40 mix-blend-multiply bg-[radial-gradient(ellipse_at_top_left,#FFD3D3_0%,transparent_70%)] rounded-fullFilter blur-sm"></div>
        <div className="absolute top-4 right-4 w-28 h-28 pointer-events-none opacity-40 mix-blend-multiply bg-[radial-gradient(ellipse_at_top_right,#FFD3D3_0%,transparent_70%)] rounded-fullFilter blur-sm"></div>
        <div className="absolute bottom-4 left-4 w-28 h-28 pointer-events-none opacity-40 mix-blend-multiply bg-[radial-gradient(ellipse_at_bottom_left,#FFD3D3_0%,transparent_70%)] rounded-fullFilter blur-sm"></div>

        {/* -------------------------------- SECTION 1: HERO / SPLASH -------------------------------- */}
        <div className="w-full min-h-[92vh] flex flex-col items-center justify-between px-6 py-12 relative z-10">
          <div className="pt-8 text-center space-y-1">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#A68864] font-semibold">
              Сайт Шақырту
            </span>
            <div className="h-[1px] w-8 bg-[#DFBA81]/50 mx-auto"></div>
          </div>

          {/* Centered Image with Elegant Curved Frame & Medallion Background */}
          <motion.div
            variants={variantScaleIn}
            initial="hidden"
            animate="visible"
            className="relative my-4 flex justify-center items-center w-64 h-80"
          >
            {/* Spinning decorative orbit behind the photo */}
            <KazakhOrnamentCircle className="absolute inset-0 w-full h-full opacity-35 animate-spin-slow pointer-events-none" />

            {/* Premium Gold Vault Arched Frame */}
            <div className="absolute inset-4 rounded-[120px_120px_20px_20px] border-4 border-[#FCFAF6] shadow-xl overflow-hidden bg-[#E2D9CD]">
              {/* Inner thin gold borders */}
              <div className="absolute inset-1 rounded-[116px_116px_16px_16px] border border-[#DFBA81]/60"></div>

              <img
                src={brideImg}
                alt="Ұзату Қыз Сәукелесімен"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 select-none"
              />
            </div>

            {/* Mini floating butterfly/floral elements styled purely in CSS */}
            <span className="absolute top-12 left-2 text-rose-300 text-lg opacity-60 animate-bounce">❀</span>
            <span className="absolute bottom-16 right-2 text-rose-300 text-lg opacity-60 animate-bounce delay-300">❀</span>
          </motion.div>

          <div className="text-center space-y-3 pb-4">
            {/* Elegant Calligraphic Script Header */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif italic text-5xl sm:text-6xl text-[#8C6239] drop-shadow-sm font-medium pr-1 tracking-normal"
            >
              Ақжан
            </motion.h1>

            <span className="text-[11px] tracking-[0.4em] text-[#9E7C4F] font-bold block bg-[#EADCC7]/50 max-w-max mx-auto px-4 py-1 rounded-full uppercase">
              Қыз Ұзату
            </span>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-serif italic text-lg text-[#8C6239] pt-2"
            >
              Құрметті қонақтар!
            </motion.p>
          </div>

          {/* Scroll Down Hint */}
          <div className="flex flex-col items-center gap-1 opacity-70 animate-bounce mt-4 cursor-pointer" onClick={() => {
            const el = document.getElementById('invitation-content');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="text-[9px] uppercase tracking-widest text-[#9E7C4F] font-semibold">Сырғытыңыз</span>
            <ChevronDown className="w-4 h-4 text-[#C5A074]" />
          </div>
        </div>

        {/* -------------------------------- SECTION 2: THE INVITATION -------------------------------- */}
        <motion.div
          id="invitation-content"
          variants={variantFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full px-8 py-12 text-center space-y-6 relative z-10"
        >
          <KazakhOrnamentDivider />

          <div className="space-y-4">
            <h2 className="font-serif italic text-3xl text-[#8C6239] font-medium">
              Құрметті қонақтар!
            </h2>

            <p className="font-serif text-lg leading-relaxed text-[#8C6239] px-2">
              ҚҰРМЕТТІ АҒАЙЫН-ТУЫС, БАУЫРЛАР,<br />
              ҚҰДА-ЖЕКЖАТ, НАҒАШЫ-ЖИЕН,<br />
              БӨЛЕЛЕР, ДОС-ЖАРАН,<br />
              ӘРІПТЕСТЕР ЖӘНЕ КӨРШІЛЕР!
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9E7C4F] font-black">
              сіздерді аяулы қызымыз
            </p>
            <h3 className="font-serif italic text-4xl text-[#8C6239] font-semibold my-3 drop-shadow-xs">
              Ақжанның
            </h3>
            <p className="text-sm tracking-wide leading-relaxed text-[#9E7C4F] px-4 font-sans font-medium">
              ұзату тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.
            </p>
          </div>

          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#DFBA81]/50 to-transparent mx-auto"></div>
        </motion.div>

        {/* -------------------------------- SECTION 3: CALENDAR & TIME -------------------------------- */}
        <motion.div
          variants={variantFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full px-6 py-12 text-center space-y-6 relative z-10 bg-[#FAF6EE]/90"
        >
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest uppercase text-[#9E7C4F] font-bold">Уақыты мен күні</span>
            <h3 className="font-serif text-3xl text-[#8C6239] font-semibold mb-2">Той салтанаты:</h3>
            <p className="text-sm font-semibold tracking-wide text-[#8C6239] font-sans uppercase">
              18 ТАМЫЗ 2026 ЖЫЛ
            </p>
          </div>

          {/* Premium Custom Calendar August 2026 */}
          <div className="max-w-xs mx-auto bg-white/80 backdrop-blur-sm border border-[#DFBA81]/30 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-[#DFBA81]/60 transition-colors">
            {/* August Header */}
            <div className="text-center font-serif text-base font-bold text-[#8C6239] border-b border-[#DFBA81]/15 pb-2 mb-3 tracking-wider uppercase">
              Тамыз 2026
            </div>

            {/* Calendar Days Title (kk/ru layout) */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold tracking-wider text-[#9E7C4F] mb-2 font-sans">
              <span>ПН</span>
              <span>ВТ</span>
              <span>СР</span>
              <span>ЧТ</span>
              <span>ПТ</span>
              <span>СБ</span>
              <span className="text-rose-500">ВС</span>
            </div>

            {/* August 2026 Grid (Aug 1st is Saturday) */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs text-[#8C6239] font-sans font-semibold">
              {/* Row 1: Empty days from July 2026 */}
              <span className="text-[#A68864]/30 py-1 font-normal">27</span>
              <span className="text-[#A68864]/30 py-1 font-normal">28</span>
              <span className="text-[#A68864]/30 py-1 font-normal">29</span>
              <span className="text-[#A68864]/30 py-1 font-normal">30</span>
              <span className="text-[#A68864]/30 py-1 font-normal">31</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">1</span>
              <span className="py-1 rounded-md text-rose-400 hover:bg-[#FDFBF7]">2</span>

              {/* Row 2 */}
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">3</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">4</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">5</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">6</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">7</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">8</span>
              <span className="py-1 rounded-md text-rose-400 hover:bg-[#FDFBF7]">9</span>

              {/* Row 3 */}
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">10</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">11</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">12</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">13</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">14</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">15</span>
              <span className="py-1 rounded-md text-rose-400 hover:bg-[#FDFBF7]">16</span>

              {/* Row 4: Highlighted Tuesday 18 */}
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">17</span>

              {/* Highlighted Tuesday 18 */}
              <div className="relative flex items-center justify-center">
                {/* Gold ring around Tuesday 18th */}
                <span className="absolute w-7 h-7 bg-transparent rounded-full border-2 border-[#8C6239] animate-pulse-ring pointer-events-none z-0"></span>
                <span className="absolute w-6 h-6 bg-[#8C6239]/15 rounded-full pointer-events-none z-0"></span>
                <span className="relative z-10 text-[#8C6239] font-bold font-serif text-sm">18</span>
              </div>

              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">19</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">20</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">21</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">22</span>
              <span className="py-1 rounded-md text-rose-400 hover:bg-[#FDFBF7]">23</span>

              {/* Row 5 */}
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">24</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">25</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">26</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">27</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">28</span>
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">29</span>
              <span className="py-1 rounded-md text-rose-400 hover:bg-[#FDFBF7]">30</span>

              {/* Row 6: Just 31st day */}
              <span className="py-1 rounded-md hover:bg-[#FDFBF7]">31</span>
              <span className="text-[#A68864]/30 py-1 font-normal">1</span>
              <span className="text-[#A68864]/30 py-1 font-normal">2</span>
              <span className="text-[#A68864]/30 py-1 font-normal">3</span>
              <span className="text-[#A68864]/30 py-1 font-normal">4</span>
              <span className="text-[#A68864]/30 py-1 font-normal">5</span>
              <span className="text-[#A68864]/30 py-1 font-normal text-rose-400/30">6</span>
            </div>
          </div>

          {/* Time text indicator details */}
          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto py-2 px-4 rounded-xl border border-[#DFBA81]/15 bg-white/40 backdrop-blur-xs text-xs tracking-wider text-[#8C6239] font-sans font-semibold">
            <Clock className="w-4 h-4 text-[#C5A074]" />
            сағат 17:00-де басталады
          </div>
        </motion.div>

        {/* -------------------------------- SECTION 4: ADDRESS & VENUE -------------------------------- */}
        <motion.div
          variants={variantFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full px-6 py-12 text-center space-y-5 relative z-10"
        >
          <KazakhOrnamentDivider />

          <div className="space-y-2">
            <span className="text-[10px] tracking-widest uppercase text-[#9E7C4F] font-bold block">Салтанат орны</span>
            <h3 className="font-serif text-3xl text-[#8C6239] font-semibold">Мекен-жайымыз:</h3>

            <div className="space-y-1">
              <p className="font-serif italic text-2xl text-[#8C6239] font-medium leading-tight uppercase tracking-wide">
                «AQPEIL»
              </p>
              <p className="text-xs uppercase tracking-wider text-[#9E7C4F] font-extrabold pb-1">
                мейрамханасы
              </p>
              <p className="text-sm font-semibold text-[#8C6239] leading-relaxed max-w-xs mx-auto font-sans px-4">
                Талдықорған,<br />
                И. Жансугурова, 5Б<br />
                <span className="text-[11px] font-normal text-gray-500 block mt-1">(Халықаралық әл-Фараби колледжінің жанында)</span>
              </p>
            </div>
          </div>

          {/* Active Map Widget & 2GIS Route Button */}
          <div className="space-y-3">
            <MapWidget />

            <a
              href="https://2gis.kz/almaty/geo/70000001101735389"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#24C562] text-white font-sans text-xs font-bold tracking-wider uppercase transition-transform active:scale-95 shadow-sm cursor-pointer mx-auto"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              2GIS картасымен ашу
            </a>
          </div>

          <div className="py-4 space-y-2 max-w-xs mx-auto border-t border-[#DFBA81]/15 mt-6">
            <span className="text-[10px] uppercase tracking-widest text-[#9E7C4F] font-semibold block">Той иелері:</span>
            <p className="font-serif italic text-2xl text-[#8C6239] font-medium">
              Асхат &mdash; Асия
            </p>
          </div>
        </motion.div>
        {/* -------------------------------- SECTION 5: RSVP FORM -------------------------------- */}
        <motion.div
          variants={variantFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full py-12 relative z-10 text-center space-y-4"
        >
          <div className="space-y-1 px-4">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#9E7C4F] font-bold block">
              Тілектер мен қатысу
            </span>
            <h3 className="font-serif text-3xl text-[#8C6239] font-semibold font-medium">
              Қуанышымызға ортақ болыңыздар!
            </h3>
          </div>

          <RSVPForm />
        </motion.div>

        {/* -------------------------------- SECTION 6: COUNTDOWN TIMER -------------------------------- */}
        <motion.div
          variants={variantFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full px-6 py-12 text-center space-y-6 relative z-10 bg-gradient-to-t from-[#F5EFE4] to-[#FAF6EE]/30"
        >
          <div className="space-y-1">
            <div className="h-[1px] w-12 bg-[#DFBA81]/50 mx-auto mb-2"></div>
            <h3 className="font-serif text-3xl text-[#8C6239] font-semibold italic">Тойға дейін:</h3>
            <p className="text-[10px] tracking-widest uppercase text-[#9E7C4F] font-bold">
              Ақжан ұзатуына қалған уақыт
            </p>
          </div>

          <Countdown />

          {/* Invitation Sharing & Backlink Block */}
          <div className="pt-6 pb-2 space-y-4">
            <p className="text-xs text-[#9E7C4F] italic uppercase tracking-wider font-semibold font-sans">
              Той салтанатында кездескенше!
            </p>

            <button
              onClick={handleShare}
              className="px-6 py-2.5 bg-white hover:bg-[#FCFAF6] border border-[#DFBA81]/40 rounded-full text-xs font-semibold text-[#8C6239] tracking-wider uppercase transition-colors shadow-sm active:scale-95 duration-200 inline-flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A074]" />
              Сілтемені Бөлісу
            </button>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
