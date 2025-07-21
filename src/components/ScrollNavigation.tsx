import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(4, 4, 4, 0.8)", "rgba(4, 4, 4, 0.95)"]
  );

  const navItems = [
    { id: 'home', label: 'Home', isScroll: true },
    { id: 'gallery', label: 'Gallery', isScroll: true },
    { id: 'blog', label: 'Blog', isScroll: false, path: '/blog' },
    { id: 'about', label: 'About', isScroll: true },
    { id: 'contact', label: 'Contact', isScroll: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.filter(item => item.isScroll).map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems.filter(item => item.isScroll)[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item: any) => {
    if (item.isScroll) {
      scrollToSection(item.id);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 header-nav"
      style={{ backgroundColor }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="font-playfair text-2xl font-medium text-primary cursor-pointer"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Levan Mosiashvili
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12">
            {navItems.map((item) => {
              if (item.isScroll) {
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`px-4 py-3 text-base font-medium font-inter transition-all duration-300 relative ${
                      activeSection === item.id
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              } else {
                return (
                  <Link
                    key={item.id}
                    to={item.path!}
                    className="px-4 py-3 text-base font-medium font-inter transition-all duration-300 text-muted-foreground hover:text-primary"
                  >
                    <motion.span
                      whileHover={{ y: -1 }}
                      whileTap={{ y: 0 }}
                      className="block"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                );
              }
            })}
          </div>

          <div className="flex items-center space-x-6">
            {/* Subtle Admin Link - only visible on hover */}
            <motion.a
              href="/admin"
              className="hidden md:block opacity-0 hover:opacity-100 transition-opacity duration-300 text-xs text-muted-foreground hover:text-primary"
              whileHover={{ scale: 1.05 }}
            >
              •
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-full bg-secondary/60 hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-border/30"
        >
          <div className="py-6 space-y-3">
            {navItems.map((item) => {
              if (item.isScroll) {
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-4 py-3 text-lg font-medium font-inter transition-colors rounded-md ${
                      activeSection === item.id
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    whileHover={{ x: 6 }}
                    whileTap={{ x: 0 }}
                  >
                    {item.label}
                  </motion.button>
                );
              } else {
                return (
                  <Link
                    key={item.id}
                    to={item.path!}
                    className="block w-full text-left px-4 py-3 text-lg font-medium font-inter transition-colors rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.span
                      whileHover={{ x: 6 }}
                      whileTap={{ x: 0 }}
                      className="block"
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                );
              }
            })}
            {/* Mobile Admin Link */}
            <motion.a
              href="/admin"
              className="block w-full text-left px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              whileHover={{ x: 6 }}
            >
              Admin
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};