import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArtworkModal } from '@/components/ArtworkModal';
import { EnhancedLightbox } from '@/components/EnhancedLightbox';
import { ArtworkCard } from '@/components/ArtworkCard';
import { VirtualizedMasonry } from '@/components/VirtualizedMasonry';
import { StandardHeader } from '@/components/StandardHeader';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Navigation } from '@/components/Navigation';
import { useArtworks, getPeriodFromYear, getAvailablePeriods, type Artwork as SupabaseArtwork, type Category } from '@/hooks/useArtworks';
import { Search, Grid, Rows3, Sparkles } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  image: string;
  dimensions: string;
  medium: string;
  year: number;
  description: string;
  category: string;
  period: string;
  price?: string;
}

const Gallery = () => {
  const { artworks: supabaseArtworks, categories, isLoading, error } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [periodFilter, setPeriodFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<Array<{ url: string; title: string; alt?: string }>>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Convert Supabase artworks to the expected format
  const convertedArtworks: Artwork[] = supabaseArtworks
    .filter(artwork => artwork.is_published)
    .map((artwork: SupabaseArtwork) => {
      const category = categories.find(cat => cat.id === artwork.category_id);
      return {
        id: parseInt(artwork.id.replace(/-/g, '').substring(0, 8), 16),
        title: artwork.title,
        image: artwork.image_url || '/placeholder.svg',
        dimensions: artwork.dimensions || '',
        medium: artwork.medium || '',
        year: artwork.year_created || new Date().getFullYear(),
        description: artwork.description || '',
        category: category?.name || 'Uncategorized',
        period: getPeriodFromYear(artwork.year_created || new Date().getFullYear()),
        price: artwork.price ? `$${artwork.price}` : undefined
      };
    });

  const availableCategories = ['All', ...Array.from(new Set(convertedArtworks.map(artwork => artwork.category)))];
  const availablePeriods = getAvailablePeriods().filter(period => 
    period === 'All' || convertedArtworks.some(artwork => artwork.period === period)
  );

  const filteredArtworks = convertedArtworks.filter(artwork => {
    const categoryMatch = categoryFilter === 'All' || artwork.category === categoryFilter;
    const periodMatch = periodFilter === 'All' || artwork.period === periodFilter;
    const searchMatch = searchQuery === '' || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.medium.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && periodMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handlePeriodFilterChange = (period: string) => {
    setPeriodFilter(period);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const openLightbox = (artworks: Artwork[], startIndex: number) => {
    const images = artworks.map(artwork => ({
      url: artwork.image,
      title: artwork.title,
      alt: artwork.title,
      description: artwork.description,
      year: artwork.year,
      medium: artwork.medium,
      dimensions: artwork.dimensions
    }));
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImages([]);
    setLightboxIndex(0);
  };

  const previousImage = () => {
    setLightboxIndex(prev => prev > 0 ? prev - 1 : lightboxImages.length - 1);
  };

  const nextImage = () => {
    setLightboxIndex(prev => prev < lightboxImages.length - 1 ? prev + 1 : 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navigation />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-6"
              />
              <p className="text-muted-foreground text-lg">Curating masterpieces...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Navigation />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 max-w-md mx-auto mb-6"
              >
                <p className="text-destructive font-medium text-lg">Unable to load gallery</p>
                <p className="text-destructive/80 text-sm mt-2">{error}</p>
              </motion.div>
              <motion.button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
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
              <Sparkles size={16} className="text-primary" />
              Complete Collection
            </div>
            
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[0.9] tracking-tight drop-shadow-2xl mb-4">
              <div className="text-shadow-lg">Art</div>
              <div className="text-primary drop-shadow-2xl">Gallery</div>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto font-inter font-light leading-relaxed drop-shadow-lg">
              Immerse yourself in a comprehensive collection of paintings that span from Georgian heritage to French influences, 
              showcasing the artistic evolution through different periods and styles.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search and Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid size={18} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'masonry' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Rows3 size={18} />
                  Masonry
                </button>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8 mb-16"
          >
            {/* Period Filter */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">Filter by Art Period</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {availablePeriods.map((period) => (
                  <motion.button
                    key={period}
                    onClick={() => handlePeriodFilterChange(period)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 text-sm rounded-full transition-all duration-300 font-medium ${
                      periodFilter === period
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-card text-foreground hover:bg-muted border border-border'
                    }`}
                  >
                    {period}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">Filter by Category</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {availableCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryFilterChange(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 text-sm rounded-full transition-all duration-300 font-medium ${
                      categoryFilter === category
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-card text-foreground hover:bg-muted border border-border'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentArtworks.map((artwork, index) => (
                  <ArtworkCard 
                    key={artwork.id} 
                    artwork={artwork} 
                    index={index} 
                    onClick={() => setSelectedArtwork(artwork)}
                    onImageClick={() => openLightbox(currentArtworks, index)}
                  />
                ))}
              </div>
            ) : (
              <VirtualizedMasonry
                items={currentArtworks}
                columnWidth={300}
                gap={24}
                className="h-[80vh]"
                renderItem={(artwork, index) => (
                  <ArtworkCard 
                    artwork={artwork} 
                    index={index} 
                    onClick={() => setSelectedArtwork(artwork)}
                    onImageClick={() => openLightbox(currentArtworks, index)}
                    isMasonry
                  />
                )}
              />
            )}
          </motion.div>

          {/* No results message */}
          {currentArtworks.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-card border border-border rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-muted-foreground text-lg mb-2">
                  No artworks found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Modals */}
          {selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              isOpen={!!selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
            />
          )}
          
          <EnhancedLightbox
            isOpen={lightboxOpen}
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrevious={previousImage}
            onNext={nextImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;