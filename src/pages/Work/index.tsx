
import React, { useRef } from 'react';
import { SIDE_PROJECTS } from '../../constants';
import { ArrowUpRight, Quote, Calendar, User, Mail, Plus, Heart, Sparkles } from 'lucide-react';


import StarBorder from '../../components/StarBorder';
import ProjectModal from '../../components/ProjectModal';



const ProjectCard: React.FC<{ project: any, index: number, onOpenPopup: (projects: any[]) => void }> = ({ project, index, onOpenPopup }) => {
  const isEven = index % 2 === 0;


  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showIframe = project.isIframe && !isMobile;

  if (project.isPopup) {
    return (
      <div
        className="group w-full mb-16 md:mb-24"
        style={{
          opacity: 0,
          animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.15 + 0.1}s`
        }}
      >
        <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#1a1512] group-hover:border-white/20 transition-all duration-500">

          {/* Background Gradient/Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

            {/* Text Content */}
            <div className="flex-1 flex flex-col items-start text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-mono uppercase tracking-widest text-white/50 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#D69452]" />
                Archive
              </div>

              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-[#D69452] transition-colors">
                {project.title}
              </h3>

              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-white/40 font-mono">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{project.date}</span>
                </div>
              </div>
            </div>

            {/* Action & Visuals */}
            <div className="flex flex-col items-end gap-6 z-10 w-full md:w-auto">
              {/* Button */}
              <button
                onClick={() => onOpenPopup && onOpenPopup(project.subProjects || [])}
                className="w-full md:w-auto px-8 py-4 bg-white text-black hover:bg-[#D69452] hover:text-black rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 transform group-hover:translate-x-2"
              >
                <span>View Collection</span>
                <ArrowUpRight size={20} strokeWidth={2.5} />
              </button>

              {/* Hint */}
              <div className="hidden md:flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-widest">
                <div className="w-8 h-px bg-white/20" />
                Contains {project.subProjects?.length || 0} projects
              </div>
            </div>

            {/* Decorative 'Stack' Visual behind (optional, CSS only) */}
            <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-[#D69452]/5 to-transparent pointer-events-none" />

          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 mb-16 md:mb-24`}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.15 + 0.1}s`
      }}
    >
      {/* 1. IMAGE BLOCK (Dominant Visual) */}
      {/* Mobile: Order 1 (Always top) | Desktop: Alternates */}
      <div className={`
        relative h-[250px] md:h-[450px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-[#1a1512] group-hover:border-white/20 transition-all duration-500
        col-span-1 md:col-span-7 lg:col-span-8
        order-1 ${isEven ? 'md:order-1' : 'md:order-2'}
      `}>

        {/* @ts-ignore - isIframe exists on some projects */}
        {showIframe ? (
          <div className="w-full h-full relative">
            <iframe
              src={project.link}
              title={project.title}
              className="w-[150%] h-[150%] border-0 pointer-events-none absolute top-0 left-0 scale-[0.666] origin-top-left"
              style={{ filter: 'grayscale(0.2)' }}
              tabIndex={-1}
            />
            {/* Overlay to prevent interaction and add consistent styling */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-colors duration-500" />
          </div>
        ) : (
          <>
            <img
              // @ts-ignore - mobileImage is optional
              src={isMobile && project.mobileImage ? project.mobileImage : project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          </>
        )}
      </div>

      {/* 2. INFO GRID (The "Bento" Details) */}
      {/* Mobile: Order 2 (Always bottom) | Desktop: Alternates */}
      <div className={`
        flex flex-col gap-3 md:gap-4 h-full
        col-span-1 md:col-span-5 lg:col-span-4
        order-2 ${isEven ? 'md:order-2' : 'md:order-1'}
      `}>
        {/* A. Title & Description Block */}
        <div className="relative flex-1 p-5 md:p-8 bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col justify-center backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-300">

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight text-white group-hover:text-[#D69452] transition-colors">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm md:text-lg leading-relaxed line-clamp-4">
            {project.description}
          </p>
        </div>

        {/* B. Metadata Row */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {/* Role */}
          <div className="p-4 md:p-5 bg-white/5 border border-white/10 rounded-[1.2rem] md:rounded-[1.5rem] flex flex-col justify-center hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2 opacity-50">
              <User size={14} />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">Role</span>
            </div>
            <span className="font-medium text-sm md:text-base text-white/90 truncate" title={project.role}>{project.role}</span>
          </div>

          {/* Date */}
          <div className="p-4 md:p-5 bg-white/5 border border-white/10 rounded-[1.2rem] md:rounded-[1.5rem] flex flex-col justify-center hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2 opacity-50">
              <Calendar size={14} />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">Date</span>
            </div>
            <span className="font-medium text-sm md:text-base text-white/90">{project.date}</span>
          </div>
        </div>

        {/* C. Action Button */}
        {/* @ts-ignore - comingSoon property exists on some projects */}
        {project.comingSoon ? (
          <div className="group/btn relative p-4 md:p-5 bg-white/5 border border-white/10 text-white/40 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-between font-medium cursor-not-allowed">
            <span className="text-base md:text-lg">Coming Soon</span>
            <div className="bg-white/5 p-2 rounded-full">
              <ArrowUpRight size={18} strokeWidth={2.5} className="md:w-5 md:h-5 opacity-50" />
            </div>
          </div>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative p-4 md:p-5 bg-[#D69452] hover:bg-[#ffb066] text-[#0f0a06] rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-between font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-base md:text-lg">View Project</span>
            <div className="bg-[#0f0a06]/10 p-2 rounded-full group-hover/btn:bg-[#0f0a06]/20 transition-colors rotate-0 group-hover/btn:rotate-45 duration-300">
              <ArrowUpRight size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "Siddharth Manjrekar",
    role: "Startup Founder of Frover",
    text: "Yuvi transformed our clumsy MVP into a sleek, user-friendly product. His 'vibe coding' isn't just a buzzword; he actually understands the soul of the product and delivered beyond expectations.",
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af19493dfeddb339b5b3553958c2d735b2607c630d9d7be10543978d5f92e5db4511a891a4247afa58a02a92557930d9017f2a5607f09b488c8a031643d8c4fa8bf3761"
  },
  {
    name: "Venkat Grandhi",
    role: "Techinal Staff, NITGOA",
    text: "Rarely do you find a designer who understands code this well. Handing off designs was a breeze, and the final output was pixel-perfect. Highly recommended for complex SaaS projects.",
    image: "https://previews.jumpshare.com/thumb/815bc01b796dd6f1733c957c5af1949328a0ed3dc1589e32e577cf2db2820231afbd067e9c8d202e70de4ec96f5bb6309aeda062b0953de2473f0d32c7287be096b065f6a1d54572fab6019041b59c9e"
  },
  {
    name: "You?",
    role: "Future Collaborator",
    text: "I would be truly grateful to work with you. Let's build something extraordinary together, and this space will be waiting to feature your success story.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop"
  }
];

const Work: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalProjects, setModalProjects] = React.useState<any[]>([]);

  const handleOpenPopup = (projects: any[]) => {
    setModalProjects(projects);
    setIsModalOpen(true);
  };

  return (
    <>
      <main className="flex-1 flex flex-col justify-start px-6 md:px-12 relative z-10 text-white w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto pt-12 md:pt-24 pb-20 2xl:pt-32">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 2xl:mb-24 animate-fade-in">
          <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-medium tracking-tight mb-6">Work.</h1>
          <div className="w-16 h-1 2xl:w-24 2xl:h-1.5 bg-white/20"></div>
        </div>

        {/* Cards Container - Vertical Stack for Bento Rows */}
        <div className="flex flex-col w-full mb-32">
          {SIDE_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpenPopup={handleOpenPopup} />
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="animate-fade-in pb-12">
          <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-8 2xl:mb-12">/ Kind Words</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-10">
            {TESTIMONIALS.map((t, i) => {
              const isCTA = t.role === 'Future Collaborator';

              if (isCTA) {
                return (
                  <StarBorder key={i} as="div" className="h-full" color="#D69452" speed="4s">
                    <div className="group relative h-full bg-[#D69452]/5 hover:bg-[#D69452]/10 transition-colors duration-500 p-8 2xl:p-10 flex flex-col items-center text-center justify-between">

                      {/* Decorative Icon */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D69452]/20 to-transparent flex items-center justify-center mb-6 ring-1 ring-[#D69452]/30 group-hover:scale-110 transition-transform duration-500">
                        <Sparkles size={28} className="text-[#D69452]" fill="currentColor" fillOpacity={0.2} />
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center">
                        <h3 className="text-xl font-bold text-white mb-4">
                          Your Success Story
                        </h3>
                        <p className="text-white/70 text-base leading-relaxed mb-8 italic">
                          "I would be truly happy to work with you. It would be an honor to share our success here as my next favorite testimonial."
                        </p>
                      </div>

                      <a
                        href="mailto:contact@yuvi.design"
                        className="w-full py-4 bg-gradient-to-r from-[#D69452]/10 to-[#D69452]/20 hover:from-[#D69452] hover:to-[#ffb066] border border-[#D69452]/30 hover:border-transparent text-[#D69452] hover:text-[#0f0a06] font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        <Heart size={18} className="group-hover/btn:fill-current" />
                        <span>Let's Create Magic</span>
                      </a>
                    </div>
                  </StarBorder>
                );
              }

              return (
                <StarBorder key={i} as="div" className="h-full" color="#D69452" speed="8s">
                  <div className="p-8 2xl:p-10 flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="mb-6 opacity-30 text-white group-hover:opacity-60 transition-opacity">
                      <Quote size={32} className="2xl:w-10 2xl:h-10" />
                    </div>

                    {/* Text */}
                    <p className="text-white/70 text-lg 2xl:text-2xl leading-relaxed font-light mb-8 flex-1 italic">
                      "{t.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium 2xl:text-xl">{t.name}</div>
                        <div className="text-white/40 text-sm 2xl:text-base">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </StarBorder>
              );
            })}
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={modalProjects}
      />
    </>
  );
};

export default Work;
