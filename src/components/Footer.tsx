import { Facebook, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gallery-dark border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-4">
              Levan Mosiashvili
            </h3>
            <p className="text-muted-foreground text-sm">
              Professional Georgian painter specializing in landscapes, portraits, and modern surrealism.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </a>
              <a href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About the Artist
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact & Purchase
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/levanmosiashviliart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:info@levanmosiashvili.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Levan Mosiashvili. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
            Built with ❤️ for Georgian Art
          </p>
        </div>
      </div>
    </footer>
  );
};
