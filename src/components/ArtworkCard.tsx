import { motion } from 'framer-motion';
import { LazyImage } from './LazyImage';

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

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onClick: () => void;
  onImageClick: () => void;
  isMasonry?: boolean;
}

export const ArtworkCard = ({ 
  artwork, 
  index, 
  onClick, 
  onImageClick, 
  isMasonry = false 
}: ArtworkCardProps) => {
  return (
    <motion.div
      key={artwork.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group cursor-pointer ${isMasonry ? 'break-inside-avoid mb-6' : ''}`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-card border border-border/50 group-hover:border-primary/30">
        <div className="relative overflow-hidden">
          <LazyImage
            src={artwork.image}
            alt={artwork.title}
            className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              !isMasonry ? 'h-80' : 'h-auto max-h-96'
            }`}
            onClick={onImageClick}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="inline-block px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                {artwork.period}
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2 drop-shadow-lg">{artwork.title}</h3>
              <p className="text-sm text-white/90 drop-shadow-md">{artwork.year} • {artwork.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  Click to view details
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageClick();
                  }}
                  className="text-xs bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-primary transition-colors"
                >
                  Zoom
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-playfair text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {artwork.title}
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground mb-3">
            <p>{artwork.dimensions} • {artwork.medium}</p>
            <p>{artwork.year} • {artwork.period}</p>
            {artwork.price && <p className="font-semibold text-primary text-base">{artwork.price}</p>}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {artwork.description}
          </p>
        </div>
        
        {/* Decorative border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};