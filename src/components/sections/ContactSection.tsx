import { motion } from 'framer-motion';
import { Mail, Instagram, MapPin, Phone } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="section-spacing min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center mb-20 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-5xl md:text-7xl font-semibold">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto font-inter leading-relaxed">
            Interested in purchasing a piece or commissioning custom artwork? 
            Let's discuss how we can bring Georgian art into your space.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-playfair text-3xl md:text-4xl font-semibold">Contact Information</h3>
            
            <div className="space-y-8">
              <motion.div 
                className="flex items-center gap-6 p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-all duration-300"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-full">
                  <Mail className="text-primary" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-lg font-dm-sans">Email</p>
                  <a href="mailto:lmosiashvili@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors font-inter">
                    lmosiashvili@hotmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-6 p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-all duration-300"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-full">
                  <Phone className="text-primary" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-lg font-dm-sans">Phone</p>
                  <a href="tel:+995599565923" className="text-muted-foreground hover:text-primary transition-colors font-inter">
                    599 56 59 23
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-6 p-6 bg-card/50 border border-border/50 rounded-xl hover:bg-card/70 transition-all duration-300"
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-full">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-lg font-dm-sans">Location</p>
                  <p className="text-muted-foreground font-inter">Tbilisi, Georgia</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-8 space-y-6">
              <h4 className="font-semibold text-xl font-dm-sans">Follow My Work</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.instagram.com/mosiashvililevan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-secondary/50 border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={24} className="text-primary" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card/30 border border-border/50 rounded-2xl p-10 backdrop-blur-sm"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-playfair text-3xl md:text-4xl font-semibold mb-10">Send a Message</h3>
            <form className="space-y-8">
              <div className="space-y-3">
                <label htmlFor="name" className="block text-sm font-medium font-dm-sans">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-6 py-4 border border-border/50 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-inter"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-medium font-dm-sans">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-6 py-4 border border-border/50 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-inter"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="message" className="block text-sm font-medium font-dm-sans">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-6 py-4 border border-border/50 rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none font-inter"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full btn-primary text-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
