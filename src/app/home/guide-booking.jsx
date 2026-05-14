
 import React, { useRef } from "react"; 
 import { motion, useScroll, useTransform } from "framer-motion"; 
 import Lottie from "lottie-react"; 
 import { 
   CalendarRange, 
   MapPinned, 
   BedDouble, 
   Plane, 
   Compass, 
   ArrowRight, 
   Sparkles, 
 } from "lucide-react"; 
  
 /* ── Brand tokens ─────────────────────────────────────────────────────────── */ 
 const BRAND = { 
   yellow: "#FFF085", 
   blue: "#003E93", 
   white: "#FFFFFF", 
 }; 
  
 /* ── Tiny inline Lottie JSON (self-contained, no external fetch) ──────────── */ 
 const lottiePulse = (rgba) => ({ 
   v: "5.7.4", 
   fr: 30, 
   ip: 0, 
   op: 60, 
   w: 200, 
   h: 200, 
   nm: "pulse", 
   ddd: 0, 
   assets: [], 
   layers: [ 
     { 
       ddd: 0, 
       ind: 1, 
       ty: 4, 
       nm: "ring", 
       sr: 1, 
       ks: { 
         o: { 
           a: 1, 
           k: [ 
             { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.4], y: [0] } }, 
             { t: 30, s: [55], i: { x: [0.4], y: [1] }, o: { x: [0.4], y: [0] } }, 
             { t: 60, s: [0] }, 
           ], 
         }, 
         r: { a: 0, k: 0 }, 
         p: { a: 0, k: [100, 100, 0] }, 
         a: { a: 0, k: [0, 0, 0] }, 
         s: { 
           a: 1, 
           k: [ 
             { t: 0, s: [40, 40, 100], i: { x: [0.4], y: [1] }, o: { x: [0.4], y: [0] } }, 
             { t: 60, s: [130, 130, 100] }, 
           ], 
         }, 
       }, 
       shapes: [ 
         { 
           ty: "gr", 
           it: [ 
             { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] }, d: 1 }, 
             { ty: "st", c: { a: 0, k: rgba }, o: { a: 0, k: 100 }, w: { a: 0, k: 6 }, lc: 1, lj: 1 }, 
             { 
               ty: "tr", 
               p: { a: 0, k: [0, 0] }, 
               a: { a: 0, k: [0, 0] }, 
               s: { a: 0, k: [100, 100] }, 
               r: { a: 0, k: 0 }, 
               o: { a: 0, k: 100 }, 
             }, 
           ], 
         }, 
       ], 
       ip: 0, 
       op: 60, 
       st: 0, 
       bm: 0, 
     }, 
     { 
       ddd: 0, 
       ind: 2, 
       ty: 4, 
       nm: "core", 
       sr: 1, 
       ks: { 
         o: { a: 0, k: 100 }, 
         r: { a: 0, k: 0 }, 
         p: { a: 0, k: [100, 100, 0] }, 
         a: { a: 0, k: [0, 0, 0] }, 
         s: { 
           a: 1, 
           k: [ 
             { t: 0, s: [85, 85, 100], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } }, 
             { t: 30, s: [105, 105, 100], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } }, 
             { t: 60, s: [85, 85, 100] }, 
           ], 
         }, 
       }, 
       shapes: [ 
         { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } }, 
         { ty: "fl", c: { a: 0, k: rgba }, o: { a: 0, k: 100 } }, 
       ], 
       ip: 0, 
       op: 60, 
       st: 0, 
       bm: 0, 
     }, 
   ], 
 }); 
  
 const RGB = { 
   yellowSoft: [1, 0.941, 0.521, 1], // #FFF085 
   blueLight: [0.42, 0.6, 0.95, 1],  // #6B99F2 
 }; 
  
 /* ── Motion presets ───────────────────────────────────────────────────────── */ 
 const fadeUp = { 
   hidden: { opacity: 0, y: 28 }, 
   show: (i = 0) => ({ 
     opacity: 1, 
     y: 0, 
     transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }, 
   }), 
 }; 
  
 const fadeIn = { 
   hidden: { opacity: 0 }, 
   show: { opacity: 1, transition: { duration: 0.8 } }, 
 }; 
  
 /* ── Step Card (reusable) ─────────────────────────────────────────────────── */ 
 const StepCard = ({ index, title, description, lottieData, iconBg, iconColor, Icon, last }) => { 
   return ( 
     <motion.div 
       variants={fadeUp} 
       custom={index} 
       whileHover={{ y: -4 }} 
       transition={{ type: "spring", stiffness: 220, damping: 18 }} 
       className="relative group" 
     > 
       <div className="relative flex items-start gap-5 rounded-2xl border border-white/60 bg-white/70 p-5 sm:p-6 shadow-[0_8px_30px_-12px_rgba(0,62,147,0.18)] backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(0,62,147,0.28)]"> 
         {/* Step index pill */} 
         <div 
           className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold tracking-wide ring-4 ring-white" 
           style={{ backgroundColor: BRAND.blue, color: BRAND.white }} 
         > 
           0{index + 1} 
         </div> 
  
         {/* Premium icon chip */} 
         <div className="relative shrink-0"> 
           {/* Soft outer halo */} 
           <div 
             className="absolute -inset-1.5 rounded-[1.4rem] opacity-50 blur-md" 
             style={{ background: iconBg }} 
             aria-hidden="true" 
           /> 
           {/* Lottie pulse behind */} 
           <div className="absolute inset-0 grid place-items-center"> 
             <Lottie 
               animationData={lottieData} 
               loop 
               autoplay 
               style={{ width: 72, height: 72, opacity: 0.65 }} 
               rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }} 
             /> 
           </div> 
           {/* Icon chip */} 
           <div 
             className="relative grid h-14 w-14 place-items-center rounded-2xl shadow-[0_10px_24px_-8px_rgba(0,62,147,0.45)] ring-1 ring-white/40" 
             style={{ background: iconBg }} 
           > 
             {/* glossy highlight */} 
             <span 
               className="pointer-events-none absolute inset-x-1 top-1 h-3 rounded-full bg-white/40 blur-[2px]" 
               aria-hidden="true" 
             /> 
             <Icon 
               size={26} 
               strokeWidth={2.4} 
               className="relative z-10 drop-shadow-sm" 
               style={{ color: iconColor }} 
             /> 
           </div> 
         </div> 
  
         <div className="flex-1 min-w-0"> 
           <h3 
             className="text-base sm:text-lg font-semibold tracking-tight" 
             style={{ color: BRAND.blue, fontFamily: "'Open Sans', system-ui, sans-serif" }} 
           > 
             {title} 
           </h3> 
           <p 
             className="mt-1.5 text-sm leading-relaxed text-slate-600" 
             style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }} 
           > 
             {description} 
           </p> 
         </div> 
       </div> 
  
       {/* Connecting dotted line between cards */} 
       {!last && ( 
         <div 
           className="absolute left-[34px] top-full h-7 w-px" 
           style={{ 
             backgroundImage: `linear-gradient(to bottom, ${BRAND.blue}55 50%, transparent 0)`, 
             backgroundSize: "1px 6px", 
             backgroundRepeat: "repeat-y", 
           }} 
           aria-hidden="true" 
         /> 
       )} 
     </motion.div> 
   ); 
 }; 
  
 /* ── Floating decorative badge ───────────────────────────────────────────── */ 
 const FloatBadge = ({ children, className = "", delay = 0, duration = 4 }) => ( 
   <motion.div 
     initial={{ y: 0 }} 
     animate={{ y: [-6, 6, -6] }} 
     transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }} 
     className={`absolute z-20 flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-3 py-2 text-xs font-medium text-slate-700 shadow-[0_10px_30px_-8px_rgba(0,62,147,0.25)] ring-1 ring-black/5 ${className}`} 
   > 
     {children} 
   </motion.div> 
 ); 
  
 /* ── Main Section ─────────────────────────────────────────────────────────── */ 
 export default function HowItWorks() { 
   const sectionRef = useRef(null); 
   const { scrollYProgress } = useScroll({ 
     target: sectionRef, 
     offset: ["start end", "end start"], 
   }); 
   const travellerY = useTransform(scrollYProgress, [0, 1], [40, -40]); 
  
   const steps = [ 
     { 
       title: "Select Dates", 
       description: "Choose your check-in and check-out dates for your perfect trip.", 
       lottieData: lottiePulse(RGB.yellowSoft), 
       iconBg: `linear-gradient(135deg, ${BRAND.yellow} 0%, #FFE34D 100%)`, 
       iconColor: BRAND.blue, 
       Icon: CalendarRange, 
     }, 
     { 
       title: "Pick Destination", 
       description: "Search hotels by city, beach, mountains, or your dream location.", 
       lottieData: lottiePulse(RGB.blueLight), 
       iconBg: `linear-gradient(135deg, ${BRAND.blue} 0%, #2563EB 100%)`, 
       iconColor: BRAND.white, 
       Icon: MapPinned, 
     }, 
     { 
       title: "Choose Rooms", 
       description: "Select the number of rooms and guests — then you're ready to book.", 
       lottieData: lottiePulse(RGB.yellowSoft), 
       iconBg: `linear-gradient(135deg, ${BRAND.yellow} 0%, #FFE34D 100%)`, 
       iconColor: BRAND.blue, 
       Icon: BedDouble, 
     }, 
   ]; 
  
   return ( 
     <section 
       ref={sectionRef} 
       className="relative isolate overflow-hidden bg-white  mb-10 py-10" 
       style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }} 
     > 
       {/* Google font (Open Sans) */} 
       <link 
         rel="stylesheet" 
         href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap" 
       /> 
  
       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"> 
         <motion.div 
           initial="hidden" 
           whileInView="show" 
           viewport={{ once: true, amount: 0.2 }} 
           variants={fadeIn} 
           className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16" 
         > 
           {/* ── LEFT: Visual ────────────────────────────────────────────── */} 
           <div className="relative lg:col-span-6"> 
             <motion.div 
               style={{ y: travellerY }} 
               className="relative mx-auto aspect-[4/5] w-full max-w-md sm:max-w-lg" 
             > 
               {/* Soft pill backdrop */} 
               <div 
                 className="absolute inset-x-6 bottom-6 top-10 rounded-[3rem] shadow-[0_30px_80px_-30px_rgba(0,62,147,0.35)]" 
                 style={{ 
                   background: `linear-gradient(160deg, ${BRAND.yellow} 0%, #FFF8C9 55%, #ffffff 100%)`, 
                 }} 
                 aria-hidden="true" 
               /> 
               <div 
                 className="absolute inset-x-10 bottom-10 top-14 rounded-[2.5rem] border border-white/70" 
                 aria-hidden="true" 
               /> 
  
               {/* Airplane curved path (SVG) */} 
               <svg 
                 className="absolute -top-6 left-0 h-full w-full" 
                 viewBox="0 0 400 500" 
                 fill="none" 
                 aria-hidden="true" 
               > 
                 <motion.path 
                   d="M20 80 C 120 30, 260 60, 360 150 S 320 380, 200 460" 
                   stroke={BRAND.blue} 
                   strokeWidth="1.5" 
                   strokeDasharray="2 8" 
                   strokeLinecap="round" 
                   initial={{ pathLength: 0, opacity: 0 }} 
                   whileInView={{ pathLength: 1, opacity: 0.45 }} 
                   viewport={{ once: true }} 
                   transition={{ duration: 2.2, ease: "easeInOut" }} 
                 /> 
               </svg> 
  
               {/* Hotel image */} 
               <img 
                 src="https://customer-assets.emergentagent.com/job_travel-booking-flow-1/artifacts/cm8aympm_i-want-this-kind-of-premium-hotel-image-_VyrIbP1sW3685iXm19SDDg_trAwKSE-RvOeQ7T39lFw-w_sd.jpeg" 
                 alt="Premium hotel suite with ocean view and elegant interior" 
                 loading="lazy" 
                 className="absolute inset-x-0 bottom-0 mx-auto h-[90%] w-[88%] rounded-[2.25rem] object-cover shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]" 
               /> 
  
               {/* Floating airplane icon */} 
               <motion.div 
                 initial={{ x: 0, y: 0, rotate: 18 }} 
                 animate={{ x: [0, 14, 0], y: [0, -10, 0], rotate: [18, 22, 18] }} 
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                 className="absolute right-6 top-10 grid h-12 w-12 place-items-center rounded-full bg-white shadow-lg ring-1 ring-black/5" 
                 aria-hidden="true" 
               > 
                 <Plane size={20} style={{ color: BRAND.blue }} /> 
               </motion.div> 
  
               {/* Floating badges */} 
               <FloatBadge className="left-2 top-24" delay={0.5} duration={5}> 
                 <Compass size={14} style={{ color: BRAND.blue }} /> 
                 <span>Premium stays</span> 
               </FloatBadge> 
  
               <FloatBadge className="-bottom-2 right-4" delay={0.2} duration={4.5}> 
                 <Sparkles size={14} style={{ color: BRAND.blue }} /> 
                 <span>Best rates guaranteed</span> 
               </FloatBadge> 
  
               {/* Brand favicon badge */} 
               <motion.div 
                 initial={{ y: 0 }} 
                 animate={{ y: [-4, 4, -4] }} 
                 transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} 
                 className="absolute bottom-10 left-2 z-20 flex items-center gap-2 rounded-2xl bg-white/95 px-2.5 py-2 shadow-[0_10px_30px_-8px_rgba(0,62,147,0.3)] ring-1 ring-black/5 backdrop-blur" 
               > 
                 <img 
                   src="/assets/bookingcom-icon-logo.svg" 
                   alt="Brand logo" 
                   className="h-6 w-6 rounded-md object-contain" 
                 /> 
                 <span 
                   className="text-[10px] font-semibold uppercase tracking-[0.14em]" 
                   style={{ color: BRAND.blue }} 
                 > 
                   Booking.com 
                 </span> 
               </motion.div> 
  
               {/* Tiny floating dot decorations */} 
               <motion.div 
                 className="absolute -left-4 top-1/3 h-3 w-3 rounded-full" 
                 style={{ backgroundColor: BRAND.blue }} 
                 animate={{ y: [-4, 4, -4] }} 
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
               /> 
               <motion.div 
                 className="absolute right-2 top-1/2 h-2 w-2 rounded-full" 
                 style={{ backgroundColor: BRAND.blue, opacity: 0.5 }} 
                 animate={{ y: [4, -4, 4] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
               /> 
             </motion.div> 
           </div> 
  
           {/* ── RIGHT: Heading + steps + CTA ───────────────────────────── */} 
           <div className="lg:col-span-6"> 
             <span 
               className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide" 
               style={{ 
                 borderColor: `${BRAND.blue}22`, 
                 color: BRAND.blue, 
                 backgroundColor: `${BRAND.yellow}55`, 
               }} 
             > 
               <span 
                 className="h-1.5 w-1.5 rounded-full" 
                 style={{ backgroundColor: BRAND.blue }} 
               /> 
               How it works 
             </span> 
  
             <h2 
               className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" 
               style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }} 
             > 
               Book Your{" "} 
               <span className="relative inline-block"> 
                 <span className="relative z-10">Perfect Stay</span> 
                 <span 
                   className="absolute inset-x-0 -bottom-1 h-3 -z-0 rounded-md" 
                   style={{ backgroundColor: BRAND.yellow }} 
                   aria-hidden="true" 
                 /> 
               </span>{" "} 
               In Minutes 
             </h2> 
  
             <p 
               className="mt-4 max-w-md text-base text-slate-500 sm:text-lg" 
             > 
               Simple steps to find and book hotels effortlessly. 
             </p> 
  
             {/* Steps list */} 
             <motion.ol 
               initial="hidden" 
               whileInView="show" 
               viewport={{ once: true, amount: 0.2 }} 
               variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } } }} 
               className="mt-10 flex flex-col gap-7" 
             > 
               {steps.map((s, i) => ( 
                 <StepCard 
                   key={s.title} 
                   index={i} 
                   title={s.title} 
                   description={s.description} 
                   lottieData={s.lottieData} 
                   iconBg={s.iconBg} 
                   iconColor={s.iconColor} 
                   Icon={s.Icon} 
                   last={i === steps.length - 1} 
                 /> 
               ))} 
             </motion.ol> 
  
           </div> 
         </motion.div> 
       </div> 
     </section> 
   ); 
 }
