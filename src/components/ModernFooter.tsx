import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Heart } from 'lucide-react';
export const ModernFooter = () => {
  return <footer className="bg-card border-t border-border/20 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center space-y-12" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <div className="space-y-6">
            <h3 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground">
              Levan <span className="text-primary">Mosiashvili</span>
            </h3>
            <p className="text-muted-foreground italic text-lg font-inter">
              Georgian Artist • Painter • Cultural Ambassador
            </p>
          </div>

          <div className="flex justify-center space-x-8">
            <motion.a href="https://www.facebook.com/levanmosiashviliart" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border" whileHover={{
            scale: 1.1,
            y: -4
          }} whileTap={{
            scale: 0.9
          }}>
              <Facebook size={24} className="text-foreground" />
            </motion.a>
            <motion.a href="#" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border" whileHover={{
            scale: 1.1,
            y: -4
          }} whileTap={{
            scale: 0.9
          }}>
              <Instagram size={24} className="text-foreground" />
            </motion.a>
            <motion.a href="mailto:info@levanmosiashvili.com" className="p-4 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border" whileHover={{
            scale: 1.1,
            y: -4
          }} whileTap={{
            scale: 0.9
          }}>
              <Mail size={24} className="text-foreground" />
            </motion.a>
          </div>

          <div className="border-t border-border/30 pt-12 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm font-inter">© 2025 Levan Mosiashvili. All rights reserved.</p>
            <motion.p className="text-muted-foreground text-sm flex items-center gap-2 font-inter" whileHover={{
            scale: 1.02
          }}>
              Made with <Heart size={16} className="text-primary animate-pulse" /> by Sandro
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>;
};