import { Calendar, MapPin, Palette, Award } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { StandardHeader } from '@/components/StandardHeader';

const About = () => {
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
            src="/lovable-uploads/b4055fae-25ae-46fb-9e55-0892fc0b76dc.png"
            alt="Featured artwork background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/90 backdrop-blur-md border border-primary/30 rounded-full text-foreground text-sm font-inter shadow-lg mb-6">
              <Award size={16} className="text-primary" />
              French Talent Passport Holder & International Master Artist
            </div>
            
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[0.9] tracking-tight drop-shadow-2xl mb-4">
              <div className="text-shadow-lg">About</div>
              <div className="text-primary drop-shadow-2xl">Levan Mosiashvili</div>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto font-inter font-light leading-relaxed drop-shadow-lg">
              Discover the remarkable journey of a distinguished Georgian painter whose work spans four distinct 
              artistic periods and graces collections across five continents.
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen">

        {/* Content */}
        <div className="py-20">
          {/* Artist Info Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="animate-fade-in">
                <h2 className="font-playfair text-3xl font-bold mb-6">The Artist</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Levan Mosiashvili is a distinguished Georgian painter who became the first Georgian to receive 
                  the prestigious French talent passport. His work spans four distinct artistic periods and 
                  is preserved in collections across five continents.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary" size={20} />
                    <div>
                      <p className="font-semibold">Based in</p>
                      <p className="text-muted-foreground">Tbilisi & Southern France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="text-primary" size={20} />
                    <div>
                      <p className="font-semibold">Born</p>
                      <p className="text-muted-foreground">1971, Tbilisi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Palette className="text-primary" size={20} />
                    <div>
                      <p className="font-semibold">Art Periods</p>
                      <p className="text-muted-foreground">Georgian, French, Modern, Abstract</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Award className="text-primary" size={20} />
                    <div>
                      <p className="font-semibold">Recognition</p>
                      <p className="text-muted-foreground">French Talent Passport 2008</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <img
                  src="/lovable-uploads/b4055fae-25ae-46fb-9e55-0892fc0b76dc.png"
                  alt="Levan Mosiashvili artwork"
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="mb-20">
              <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Artistic Journey</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h3 className="font-playfair text-xl font-semibold mb-3">Early Life & Education</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Born in 1971 in Tbilisi, Levan's artistic calling emerged during childhood, even during 
                      the communist period when he received honorary awards and diplomas. Despite graduating 
                      from the Forestry Faculty of Georgian Agrarian University in 1993 and earning a Candidate 
                      of Biological Sciences degree in 1996, his passion for art remained unwavering.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <h3 className="font-playfair text-xl font-semibold mb-3">Self-Taught Mastery</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      As a completely self-taught artist, Levan developed his unique style working with 
                      different techniques on canvas. His artistic evolution spans four distinct periods: 
                      Georgian, French, Modern, and Abstract, each reflecting different phases of his 
                      creative and geographical journey.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <h3 className="font-playfair text-xl font-semibold mb-3">International Recognition</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      After winning numerous international art competitions, Levan received an unprecedented 
                      honor in 2008 when the French government granted him a talent passport, making him the 
                      first Georgian to receive this prestigious status. This recognition opened doors to 
                      exhibitions and collections worldwide.
                    </p>
                  </div>
                  
                  <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <h3 className="font-playfair text-xl font-semibold mb-3">Global Presence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      His works are now preserved in private collections and galleries across multiple 
                      continents, including Georgia, France, Russia, USA, Germany, Switzerland, Italy, 
                      Uruguay, Venezuela, Japan, Canada, New Zealand, Australia, Turkey, Belgium, England, 
                      Brazil, Chile, Sweden, Norway, and China.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-20">
              <h2 className="font-playfair text-3xl font-bold mb-12 text-center">Career Highlights</h2>
              
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px h-full w-0.5 bg-primary/30"></div>
                
                <div className="space-y-12">
                  {[
                    {
                      year: "1971",
                      title: "Born in Tbilisi",
                      description: "Born in Tbilisi, Georgia. Art became his calling from childhood, receiving awards even during the communist period."
                    },
                    {
                      year: "1993-1996",
                      title: "Academic Foundation",
                      description: "Graduated from Georgian Agrarian University's Forestry Faculty while studying theater direction, later earning Candidate of Biological Sciences degree."
                    },
                    {
                      year: "2008",
                      title: "French Talent Passport",
                      description: "Became the first Georgian to receive the prestigious French talent passport after winning international competitions."
                    },
                    {
                      year: "2015",
                      title: "Cultural Leadership",
                      description: "Became head of the International Club of Friends of the National Library of the Parliament of Georgia and co-founded Georgia Center."
                    },
                    {
                      year: "2022-2023",
                      title: "Recent Acclaim",
                      description: "Participated in Art Dubai 2022 and Art New York 2023, where his painting was awarded as one of the most successful of the year."
                    }
                  ].map((event, index) => (
                    <div
                      key={index}
                      className={`relative flex items-center animate-fade-in ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                      style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                    >
                      <div className="w-8 h-8 bg-primary rounded-full absolute left-0 md:left-1/2 md:transform md:-translate-x-4 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-card p-6 rounded-lg border border-border">
                          <div className="text-primary font-semibold text-lg mb-2">{event.year}</div>
                          <h3 className="font-playfair text-xl font-semibold mb-3">{event.title}</h3>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-secondary/30 p-12 rounded-lg animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <h2 className="font-playfair text-3xl font-bold mb-4">Connect with the Artist</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Follow Levan's artistic journey on social media or get in touch to discuss 
                commissions and available artwork from his international collection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.facebook.com/levanmosiashviliart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit Facebook Page
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 border border-primary text-primary rounded-md font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Contact for Commissions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;