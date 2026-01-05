import { ArrowRight, CheckCircle } from "lucide-react";
import worldMap from "../../../assets/world-map.svg";
import { useEffect, useRef, useState } from "react";
import manIcon from "../../../assets/man.svg";
import shipIcon from "../../../assets/ship.svg";

export function Hero() {
  const hubs = {    
    na_hub: { x: 260, y: 215, label: "North America" },
    canada: { x: 240, y: 150 },
    mexico: { x: 205, y: 240 },
    usa_east: { x: 305, y: 210 },
    eu_hub: { x: 570, y: 175, label: "Europe" },
    uk: { x: 495, y: 145 },
    africa_west: { x: 500, y: 255, label: "Africa" },
    africa_east: { x: 555, y: 345 },
    middle_east: { x: 610, y: 220, label: "Middle East" },
    asia_hub: { x: 700, y: 250, label: "Asia" },
    india: { x: 720, y: 80 },
    japan: { x: 785, y: 190 },
    thailand: { x: 500, y: 290 },
    australia: { x: 760, y: 320, label: "Australia" },
    indonesia: { x: 810, y: 400 }
  };

  const branches = [
    { d: `M ${hubs.na_hub.x} ${hubs.na_hub.y} Q 230 160 ${hubs.canada.x} ${hubs.canada.y}`, delay: "0s" },
    { d: `M ${hubs.na_hub.x} ${hubs.na_hub.y} Q 220 220 ${hubs.mexico.x} ${hubs.mexico.y}`, delay: "0.2s" },
    { d: `M ${hubs.na_hub.x} ${hubs.na_hub.y} Q 280 190 ${hubs.usa_east.x} ${hubs.usa_east.y}`, delay: "0.1s" },
    { d: `M ${hubs.usa_east.x} ${hubs.usa_east.y} Q 380 140 ${hubs.eu_hub.x} ${hubs.eu_hub.y}`, delay: "0.5s" },
    { d: `M ${hubs.eu_hub.x} ${hubs.eu_hub.y} Q 495 140 ${hubs.uk.x} ${hubs.uk.y}`, delay: "1.2s" },
    { d: `M ${hubs.eu_hub.x} ${hubs.eu_hub.y} Q 540 200 ${hubs.middle_east.x} ${hubs.middle_east.y}`, delay: "1.4s" },
    { d: `M ${hubs.eu_hub.x} ${hubs.eu_hub.y} Q 490 260 ${hubs.africa_west.x} ${hubs.africa_west.y}`, delay: "1.6s" },
    { d: `M ${hubs.eu_hub.x} ${hubs.eu_hub.y} Q 650 160 ${hubs.asia_hub.x} ${hubs.asia_hub.y}`, delay: "2s" },
    { d: `M ${hubs.asia_hub.x} ${hubs.asia_hub.y} Q 730 230 ${hubs.india.x} ${hubs.india.y}`, delay: "3s" },
    { d: `M ${hubs.asia_hub.x} ${hubs.asia_hub.y} Q 830 190 ${hubs.japan.x} ${hubs.japan.y}`, delay: "3.2s" },
    { d: `M ${hubs.asia_hub.x} ${hubs.asia_hub.y} Q 780 260 ${hubs.thailand.x} ${hubs.thailand.y}`, delay: "3.4s" },
    { d: `M ${hubs.thailand.x} ${hubs.thailand.y} Q 820 320 ${hubs.indonesia.x} ${hubs.indonesia.y}`, delay: "3.8s" },
    { d: `M ${hubs.indonesia.x} ${hubs.indonesia.y} Q 830 370 ${hubs.australia.x} ${hubs.australia.y}`, delay: "4.2s" },
  ];

  const shipRef = useRef(null);
  const pathRef = useRef(null);
  const heroRef = useRef(null);
  const leftTickRef = useRef(null);
  const rightTickRef = useRef(null);
  const rightPointRef = useRef(null);

  const [leftTickColor, setLeftTickColor] = useState("#000");
  const [rightTickColor, setRightTickColor] = useState("#000");

  useEffect(() => {
    const ship = shipRef.current;
    const path = pathRef.current;
    const hero = heroRef.current;
    const leftTick = leftTickRef.current;
    const rightTick = rightTickRef.current;

    if (!ship || !path || !hero || !leftTick || !rightTick) return;

    const pathLength = path.getTotalLength();

    const handleScroll = () => {
      const heroRect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const scrollInHero = -heroRect.top;

      const progress = Math.min(Math.max(scrollInHero / (heroHeight / 4), 0), 1);
      const point = path.getPointAtLength(pathLength * progress);

      // Move ship (placed slightly below the man icon)
      ship.style.transform = `translate(${point.x - 24}px, ${point.y - 24 + 20}px)`;

      // Update tick colors based on position
      if (point.x >= 160) {
        setLeftTickColor("#22c55e");
      } else {
        setLeftTickColor("#000");
      }

      if (point.x >= 760) {
        setRightTickColor("#22c55e");
      } else {
        setRightTickColor("#000");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative pt-16 md:pt-24 pb-0 overflow-hidden bg-white">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '45px 45px' }} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pazagoFlow {
          0% { stroke-dashoffset: 100%; opacity: 0; }
          10% { opacity: 1; }
          60% { stroke-dashoffset: 0%; opacity: 1; }
          75% { stroke-dashoffset: 0%; opacity: 0; }
          100% { stroke-dashoffset: 0%; opacity: 0; }
        }
        @keyframes nodePulse {
          0% { r: 1.5; opacity: 1; }
          50% { r: 3.5; opacity: 0.7; }
          100% { r: 1.5; opacity: 1; }
        }
        .flow-path {
          stroke-dasharray: 100%;
          stroke-dashoffset: 100%;
          animation: pazagoFlow 7s ease-in-out infinite;
        }
        .node-active {
        opacity:0;
          fill: #035f1dff;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 1));
          animation: nodePulse 2s infinite ease-in-out;
        }
      `}} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium uppercase tracking-wider">100% Free Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight mb-4 md:mb-6">
            Global Inspections.
            <br />
            <span className="text-black/40">Simplified.</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-black/60 mb-8 md:mb-10 max-w-[600px] mx-auto">
            Qualty.AI connects global traders with certified inspectors in one seamless platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16">
            <button className="bg-black text-white px-5 md:px-7 py-3 md:py-3.5 rounded-lg hover:bg-black/90 transition-all inline-flex items-center gap-2 group font-medium text-sm md:text-base">
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="border border-black/10 text-black px-5 md:px-7 py-3 md:py-3.5 rounded-lg hover:bg-black/[0.02] transition-all font-medium text-sm md:text-base">
              Explore Marketplace
            </button>
          </div>
        </div>
      </div>
{/* Visual stats */}
          <div className="grid grid-cols-3 gap-8 max-w-[600px] mx-auto pt-8 md:pt-12 border-t border-black/5 justify-items-center">
            <div>
              <div className="text-2xl md:text-3xl tracking-tight mb-1">150+</div>
              <div className="text-sm text-black/40">Countries</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl tracking-tight mb-1">10K+</div>
              <div className="text-sm text-black/40">Inspectors</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl tracking-tight mb-1">50K+</div>
              <div className="text-sm text-black/40">Inspections</div>
            </div>
          </div>
      {/* Ship animation above globe */}
     <div className="relative w-full h-[120px] md:h-[180px] pb-0 mb-0 pointer-events-none select-none">
  <svg viewBox="0 0 1000 180" className="absolute inset-0 w-full h-full">
    {/* Invisible path */}
    <path ref={pathRef} d="M 200 100 Q 500 20 800 100" fill="none" />

    {/* Person icons */}
    <image
      href={manIcon}
      x={160}
      y={60}
      width={100}
      height={100}
      className="origin-center scale-125 sm:scale-100"
    />

    <image
      ref={rightPointRef}
      href={manIcon}
      x={760}
      y={60}
      width={100}
      height={100}
      className="origin-center scale-125 sm:scale-100"
    />

    {/* Ticks using Lucide */}
    <CheckCircle
      ref={leftTickRef}
      size={32}
      color={leftTickColor}
      x={194}
      y={20}
      className="absolute origin-center scale-125 sm:scale-100"
    />

    <CheckCircle
      ref={rightTickRef}
      size={32}
      color={rightTickColor}
      x={794}
      y={20}
      className="absolute origin-center scale-125 sm:scale-100"
    />

    {/* Ship icon */}
    <image
      ref={shipRef}
      href={shipIcon}
      width={120}
      height={120}
      x={10}
      y={1}
      transform="scale(-1,1)"
      className="origin-center scale-125 sm:scale-100"
    />
  </svg>
</div>


      <div className="relative  md:mt-12 flex justify-center pointer-events-none select-none">
        {/* GREEN GLASS GLOBE: border-green-500/20 and green gradient */}
        <div className="relative w-[100vw] md:w-[85vw] aspect-[2/1] rounded-[100%] border-t border-green-500/30 bg-gradient-to-b from-green-500/[0.08] via-transparent to-transparent overflow-hidden backdrop-blur-[2px]">
          
          <div className="absolute top-[-60px] md:top-[-120px] lg:top-[-180px] left-1/2 -translate-x-1/2 w-[90%] md:w-[80%]">
            <img 
              src={worldMap} 
              alt="World Map" 
              className="w-full h-auto brightness-[0.2] saturate-50 opacity-30 mix-blend-multiply" 
            />

            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              {branches.map((b, i) => (
                <path key={`base-${i}`} d={b.d} stroke="#000000ff" strokeWidth="0.6" fill="none" />
              ))}

              {branches.map((b, i) => (
                <path
                  key={`flow-${i}`}
                  d={b.d}
                  stroke="#22c55e"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  className="flow-path"
                  style={{ animationDelay: b.delay }}
                />
              ))}

              {Object.entries(hubs).map(([name, pos]) => (
                <circle 
                  key={name} 
                  cx={pos.x} 
                  cy={pos.y} 
                  r="2.5" 
                  className="node-active" 
                  style={{ animationDelay: `${Math.random() * 2}s` }}
                />
              ))}
            </svg>

            {Object.entries(hubs).map(([name, pos]) => (
              pos.label && (
                <div 
  key={`label-${name}`}
  className="absolute hidden md:flex items-center justify-center"
  style={{ 
    left: `${(pos.x / 1000) * 100}%`, 
    top: `${(pos.y / 500) * 100}%`,
    transform: 'translate(-50%, -150%)' 
  }}
>

                  <div className="bg-white/90 backdrop-blur-md border border-green-500/10 px-2.5 py-1 rounded-md shadow-lg shadow-green-500/5">
                    <span className="text-[9px] font-bold text-black-900/80 whitespace-nowrap uppercase tracking-wider leading-none">
                      {pos.label}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Fade Mask */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, transparent 40%, white 95%)' }}></div>
        </div>
      </div>
    </section>
  );
}
