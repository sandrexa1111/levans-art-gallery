import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="section-spacing min-h-screen flex items-center bg-background">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center space-y-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-5xl md:text-7xl font-semibold text-foreground">
              About the <span className="text-primary">Artist</span>
            </h2>
          </motion.div>
          
          <motion.blockquote 
            className="text-2xl md:text-4xl lg:text-5xl font-playfair italic text-foreground/80 leading-relaxed max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "Art is the bridge between the soul of Georgia and the hearts of those who witness its beauty. 
            Through every brushstroke, I aim to capture not just the visual splendor of our landscapes, 
            but the emotional depth that defines our heritage."
          </motion.blockquote>
          
          <motion.p 
            className="text-foreground font-semibold text-2xl font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            — Levan Mosiashvili
          </motion.p>

          <motion.div 
            className="mt-24 text-left max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-8">
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                Born in 1971 in Tbilisi, Levan Mosiashvili is a self-taught Georgian artist whose journey 
                spans from biological sciences to becoming an internationally recognized painter. His artistic 
                evolution encompasses distinct periods that reflect his cultural heritage and international 
                influences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-4">Georgian Periods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Primitivism</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Animalistic</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Cityscape</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-4">French Periods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Modern</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Cubism</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">Abstract</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-foreground/70 font-inter leading-relaxed">
                In 2008, after winning numerous international art competitions, Levan became the first 
                Georgian to receive the prestigious French talent passport. His paintings now grace private 
                collections and galleries across five continents, and his recent work was recognized as one 
                of the most successful paintings of the year at Art New York 2023.
              </p>
            </div>

            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium text-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg group"
              >
                Discover the Full Story
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
