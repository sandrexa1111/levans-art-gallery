import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';
import { StandardHeader } from '@/components/StandardHeader';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // In a real implementation, you would submit to Formspree or similar service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navigation />
      
      {/* Header Section - Matching main page */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden hero-gradient">
        {/* Artistic background elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/25 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/15 rounded-full blur-2xl" />
        </div>

        {/* Featured artwork overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png"
            alt="Featured artwork background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/90 backdrop-blur-md border border-primary/30 rounded-full text-foreground text-sm font-inter shadow-lg mb-6">
              <Award size={16} className="text-primary" />
              Contemporary Georgian Master Artist
            </div>
            
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[0.9] tracking-tight drop-shadow-2xl mb-4">
              <div className="text-shadow-lg">Get in</div>
              <div className="text-primary drop-shadow-2xl">Touch</div>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto font-inter font-light leading-relaxed drop-shadow-lg">
              Interested in commissioning a piece, purchasing artwork, or simply want to connect? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen">

        {/* Content */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-fade-in">
                <h2 className="font-playfair text-3xl font-bold mb-8">Let's Connect</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/60 p-3 rounded-full">
                      <MapPin className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">Georgia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/60 p-3 rounded-full">
                      <Mail className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a
                        href="mailto:lmosiashvili@hotmail.com"
                        className="text-foreground hover:text-foreground/80 transition-colors"
                      >
                        lmosiashvili@hotmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/60 p-3 rounded-full">
                      <Phone className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <a
                        href="tel:+995599565923"
                        className="text-foreground hover:text-foreground/80 transition-colors"
                      >
                        599 56 59 23
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/60 p-3 rounded-full">
                      <MessageCircle className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp</h3>
                      <a
                        href="https://wa.me/995599565923"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-foreground/80 transition-colors"
                      >
                        Quick message via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-6 rounded-lg">
                  <h3 className="font-playfair text-xl font-semibold mb-4">What We Offer</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                      <span>Original artwork sales with certificates of authenticity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                      <span>Custom commissioned paintings for homes and businesses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                      <span>Professional framing and shipping worldwide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0"></div>
                      <span>Art consultation for collectors and interior designers</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border border-border">
                  <h2 className="font-playfair text-2xl font-bold mb-6">Send a Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all resize-vertical"
                      placeholder="Tell us about your interest in the artwork, commission details, or any questions you have..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                  
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="font-playfair text-3xl font-bold mb-8">Follow the Journey</h2>
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.instagram.com/mosiashvililevan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-md transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
