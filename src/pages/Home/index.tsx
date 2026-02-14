
import React, { useState } from 'react';
import { Smile, Layers, Sparkles, Code, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useISTTime } from '../../hooks/useSeattleTime';
import ServiceModal from '../../components/ServiceModal';
import ScrambledText from '../../components/ScrambledText';
import ServiceCard from '../../components/ServiceCard';

const MainContent: React.FC = () => {
  const istTime = useISTTime();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <>
      <div className="flex-1 w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto z-10 relative">
        {/* HERO SECTION */}
        <main className="flex flex-col justify-center px-6 md:px-12 min-h-[85vh] text-white relative pb-32 md:pb-40 pt-24 md:pt-32">

          {/* Location & Time */}
          <div className="flex items-center space-x-3 text-sm md:text-base 2xl:text-xl font-mono opacity-80 mb-8 md:mb-12">
            <span>Based in D&NH</span>
            <span className="opacity-50">-</span>
            <span className="font-semibold tabular-nums">{istTime}</span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-white/40 to-transparent mb-8 md:mb-12"></div>

          {/* Hero Headline */}
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] 2xl:text-[10rem] font-medium tracking-tighter leading-none mb-2 drop-shadow-lg">
            <ScrambledText
              radius={100}
              duration={0.6}
              scrambleChars=".:"
            >
              Hi, This is Yuvraj
            </ScrambledText>
          </h1>

          <p className="text-base md:text-2xl text-white/50 uppercase tracking-wide mb-24 md:mb-32 2xl:mb-40 pl-1">
            <ScrambledText
              radius={100}
              duration={0.6}
              scrambleChars=".:"
            >
              Product Designer | UX/UI Designer
            </ScrambledText>
          </p>

          {/* Footer Info */}
          <div className="flex flex-col space-y-3 w-full text-base md:text-xl 2xl:text-2xl tracking-wide">

            {/* Row 1 */}
            <div className="flex items-center">
              <span className="w-24 md:w-32 2xl:w-40 opacity-70 font-sans shrink-0">Currently</span>
              <span className="opacity-70 mr-3">→</span>
              <span className="font-bold">Open to Work / Seeking Opportunities</span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center">
              <span className="w-24 md:w-32 2xl:w-40 opacity-70 font-sans shrink-0">Education</span>
              <span className="opacity-70 mr-3">→</span>
              <span className="font-bold">NITian 🎓</span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center">
              <span className="w-24 md:w-32 2xl:w-40 opacity-70 font-sans shrink-0">Delivering</span>
              <span className="opacity-70 mr-3">→</span>
              <span className="font-bold flex items-center">
                Smiles <Smile size={20} strokeWidth={2.5} className="ml-2 2xl:w-8 2xl:h-8" />
              </span>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-6 md:left-12 flex flex-col gap-2 opacity-40 animate-pulse">
            <span className="text-xs 2xl:text-sm font-mono uppercase tracking-widest">Scroll for Services</span>
            <ChevronDown size={20} className="2xl:w-8 2xl:h-8" />
          </div>
        </main>

        {/* SERVICES SECTION */}
        <section className="px-6 md:px-12 py-24 md:py-32 2xl:py-48 text-white">
          <div className="flex items-center mb-16 opacity-80">
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-medium tracking-tight">Services</h2>
            <span className="ml-4 text-2xl 2xl:text-3xl">↓</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8">
            <ServiceCard
              index={0}
              title="UX/UI Design SaaS"
              description="Designing seamless experiences to engage users and drive results."
              icon={Layers}
              onClick={() => handleServiceClick('UX/UI Design SaaS')}
            />
            <ServiceCard
              index={1}
              title="Re-Design SaaS"
              description="Creating stunning, user-centric redesigning that represent your brand."
              icon={Sparkles}
              onClick={() => handleServiceClick('Re-Design SaaS')}
            />
            <ServiceCard
              index={2}
              title="Vibe Coding"
              description="Translating creative vision into pixel-perfect reality with zero friction."
              icon={Code}
              onClick={() => handleServiceClick('Vibe Coding')}
            />
          </div>
        </section>
      </div>

      {/* Service Inquiry Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        initialService={selectedService || ''}
      />
    </>
  );
};

export default MainContent;
