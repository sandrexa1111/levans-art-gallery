import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette } from 'lucide-react';
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Gallery',
    path: '/gallery'
  }, {
    name: 'Blog',
    path: '/blog'
  }, {
    name: 'About',
    path: '/about'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  const isActive = (path: string) => location.pathname === path;
  console.log('Navigation render - current path:', location.pathname);
  return <nav className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-lg shadow-background/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            
            <span className="font-playfair text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
              Levan Mosiashvili
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`relative px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${isActive(item.path) ? 'text-primary-foreground bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                {item.name}
                {item.name === 'Gallery' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />}
              </Link>)}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden py-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="space-y-2">
              {navItems.map(item => <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-4 mx-2 rounded-xl text-base font-medium transition-all duration-300 ${isActive(item.path) ? 'text-primary-foreground bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'}`}>
                  {item.name === 'Gallery' && <Palette className="w-5 h-5" />}
                  {item.name}
                  {item.name === 'Gallery' && <span className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />}
                </Link>)}
            </div>
          </div>}
      </div>
    </nav>;
};