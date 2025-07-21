import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Palette, Award, Users } from 'lucide-react';
import { useRef } from 'react';
export const HomeSection = () => {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section ref={ref} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden hero-gradient">
      {/* Artistic background elements */}
      <motion.div className="absolute inset-0 opacity-15" style={{
      y
    }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/25 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/15 rounded-full blur-2xl" />
      </motion.div>

      {/* Featured artwork overlay with stronger contrast */}
      <motion.div className="absolute inset-0 opacity-20" style={{
      y: y,
      opacity
    }}>
        <img src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png" alt="Featured artwork background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content with enhanced visibility */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="space-y-10">
            <motion.div className="space-y-6" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }}>
              <motion.div className="inline-flex items-center gap-3 px-6 py-3 bg-card/90 backdrop-blur-md border border-primary/30 rounded-full text-foreground text-sm font-inter shadow-lg" whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(68, 124, 179, 0.15)"
            }}>
                <Award size={16} className="text-primary" />
                Contemporary Georgian Master Artist
              </motion.div>
              
              <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.9] tracking-tight drop-shadow-2xl">
                <motion.div initial={{
                opacity: 0,
                rotateX: 90
              }} animate={{
                opacity: 1,
                rotateX: 0
              }} transition={{
                duration: 0.8,
                delay: 0.6
              }} className="text-shadow-lg">
                  Levan
                </motion.div>
                <motion.div initial={{
                opacity: 0,
                rotateX: 90
              }} animate={{
                opacity: 1,
                rotateX: 0
              }} transition={{
                duration: 0.8,
                delay: 0.8
              }} className="text-primary drop-shadow-2xl">
                  Mosiashvili
                </motion.div>
              </h1>
            </motion.div>
            
            <motion.p className="text-xl md:text-2xl text-foreground/90 max-w-2xl font-inter font-light leading-relaxed drop-shadow-lg" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1
          }}>
              Where Georgian heritage meets contemporary vision. Discover paintings that capture 
              the soul of tradition while embracing the spirit of modern artistic expression.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-6 pt-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1.2
          }}>
              <motion.button onClick={() => scrollToSection('gallery')} className="btn-primary flex items-center justify-center gap-3 text-lg py-6 px-10 group shadow-xl" whileHover={{
              scale: 1.02,
              y: -2
            }} whileTap={{
              scale: 0.98
            }}>
                
                Explore Artworks
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button onClick={() => scrollToSection('about')} className="px-10 py-6 border-2 border-primary/50 bg-card/50 text-foreground rounded-lg font-medium font-inter transition-all duration-300 hover:bg-primary/20 hover:border-primary/70 flex items-center justify-center gap-3 text-lg backdrop-blur-md shadow-lg" whileHover={{
              scale: 1.02,
              y: -2
            }} whileTap={{
              scale: 0.98
            }}>
                <Users size={20} />
                Meet the Artist
              </motion.button>
            </motion.div>

            {/* Stats with enhanced visibility */}
            <motion.div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary/20" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1.4
          }}>
              <div className="text-center">
                <div className="font-playfair text-3xl font-semibold text-primary drop-shadow-lg">20+</div>
                <div className="text-sm text-foreground/80 font-inter">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl font-semibold text-primary drop-shadow-lg">100+</div>
                <div className="text-sm text-foreground/80 font-inter">Artworks Created</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl font-semibold text-primary drop-shadow-lg">50+</div>
                <div className="text-sm text-foreground/80 font-inter">Exhibitions</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Artwork */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="relative">
            <motion.div className="relative group cursor-pointer" whileHover={{
            scale: 1.02
          }} onClick={() => scrollToSection('gallery')}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-primary/20">
                <img src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png" alt="Featured artwork" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-playfair text-2xl font-medium text-foreground mb-2 drop-shadow-lg">Featured Artwork</h3>
                  <p className="text-foreground/90 font-inter drop-shadow-md">Click to explore the full collection</p>
                </div>
              </div>
              
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-3xl -z-10 group-hover:border-primary/50 transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};