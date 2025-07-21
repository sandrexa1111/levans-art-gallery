import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StandardHeaderProps {
  badge?: {
    icon?: ReactNode;
    text: string;
  };
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const StandardHeader = ({
  badge,
  title,
  subtitle,
  backgroundImage,
  gradientFrom = 'primary',
  gradientTo = 'primary/70'
}: StandardHeaderProps) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-20 left-10 w-96 h-96 bg-${gradientFrom} rounded-full blur-3xl`} />
        <div className={`absolute bottom-20 right-10 w-80 h-80 bg-${gradientTo} rounded-full blur-3xl`} />
      </div>

      {/* Featured artwork background if provided */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <img
            src={backgroundImage}
            alt="Featured artwork background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
              {badge.icon}
              {badge.text}
            </div>
          )}
          
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};