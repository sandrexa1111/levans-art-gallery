import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useArtworks } from '@/hooks/useArtworks';
import { ArtworkDetail } from '@/components/ArtworkDetail';
export const GallerySection = () => {
  const {
    artworks,
    isLoading: loading,
    error,
    fetchArtworks
  } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);
  if (loading) {
    return <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }} className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">Curating gallery masterpieces...</p>
          </div>
        </div>
      </section>;
  }
  if (error) {
    return <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-destructive font-medium text-lg">Unable to load gallery</p>
              <p className="text-destructive/80 text-sm mt-2">{error}</p>
            </div>
          </div>
        </div>
      </section>;
  }
  const publishedArtworks = artworks.filter(artwork => artwork.is_published);
  return <>
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/60 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-20">
            
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8"> Featured Collection</div>
            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Gallery Preview
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover a curated selection of contemporary masterpieces that bridge tradition with modern artistic vision
            </p>
            <div className="mt-8">
              <Link to="/gallery">
                <motion.div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-2xl text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer group" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <span className="font-medium">Explore Full Gallery</span>
                  <motion.div animate={{
                  x: [0, 4, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} className="text-lg group-hover:text-primary-foreground">
                    →
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {publishedArtworks.length === 0 ? <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No artworks available at the moment.</p>
            </div> : <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {publishedArtworks.slice(0, 6).map((artwork, index) => <motion.div key={artwork.id} initial={{
              opacity: 0,
              y: 30,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }} transition={{
              duration: 0.7,
              delay: index * 0.15,
              type: "spring",
              stiffness: 100
            }} viewport={{
              once: true
            }} whileHover={{
              y: -8,
              scale: 1.02
            }} className="group cursor-pointer" onClick={() => setSelectedArtwork(artwork)}>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-500 bg-card border border-border/50">
                      {artwork.image_url ? <div className="relative aspect-[4/5] overflow-hidden">
                          <img src={artwork.image_url} alt={artwork.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={e => {
                    console.error('Image failed to load:', artwork.image_url);
                    e.currentTarget.src = '/placeholder.svg';
                  }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Artwork info overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="font-playfair text-xl font-bold mb-2 drop-shadow-lg">{artwork.title}</h3>
                            {artwork.medium && <p className="text-sm opacity-90 drop-shadow-md">{artwork.medium}</p>}
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                Click to explore
                              </span>
                            </div>
                          </div>
                        </div> : <div className="aspect-[4/5] bg-muted/50 flex items-center justify-center">
                          <p className="text-muted-foreground">No image available</p>
                        </div>}
                      
                      {/* Card content */}
                      <div className="p-6">
                        <h3 className="font-playfair text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {artwork.title}
                        </h3>
                        {artwork.medium && <p className="text-sm text-muted-foreground mt-1">{artwork.medium}</p>}
                      </div>
                      
                      {/* Decorative border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
                    </div>
                  </motion.div>)}
              </div>
              
              {publishedArtworks.length > 6 && <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} viewport={{
            once: true
          }} className="text-center mt-16">
                  <Link to="/gallery">
                    <motion.div className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-primary/30 overflow-hidden cursor-pointer" whileHover={{
                scale: 1.05,
                y: -2
              }} whileTap={{
                scale: 0.98
              }}>
                      {/* Background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Content */}
                      <span className="relative z-10">View Full Gallery</span>
                      <motion.div animate={{
                  x: [0, 8, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} className="relative z-10 text-2xl">
                        →
                      </motion.div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </motion.div>
                  </Link>
                  
                  <motion.p className="text-muted-foreground mt-6 text-lg max-w-md mx-auto" initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              delay: 0.5
            }}>
                    Discover <span className="font-bold text-primary">{publishedArtworks.length - 6}+ more</span> stunning artworks in our complete collection
                  </motion.p>
                </motion.div>}
            </>}
        </div>
      </section>

      {selectedArtwork && <ArtworkDetail artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />}
    </>;
};