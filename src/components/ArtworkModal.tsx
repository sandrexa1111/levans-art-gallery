import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CommentForm } from './CommentForm';
import { CommentsList } from './CommentsList';

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

interface ArtworkModalProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkModal = ({ artwork, isOpen, onClose }: ArtworkModalProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCommentAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-background rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl my-4">
        {/* Header with close button */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex justify-between items-center z-10">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold pr-4 truncate">
            {artwork.title}
          </h2>
          <button
            onClick={handleCloseClick}
            className="flex-shrink-0 p-2 hover:bg-muted rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Image Section with close overlay */}
            <div className="order-1">
              <div className="relative group">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
                  onClick={handleCloseClick}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={handleCloseClick}
                    className="bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors"
                  >
                    <X size={24} className="text-black" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Details Section */}
            <div className="order-2 space-y-6">
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  {artwork.period}
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p><span className="font-medium text-muted-foreground">Dimensions:</span></p>
                    <p className="sm:text-right">{artwork.dimensions}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p><span className="font-medium text-muted-foreground">Medium:</span></p>
                    <p className="sm:text-right">{artwork.medium}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p><span className="font-medium text-muted-foreground">Year:</span></p>
                    <p className="sm:text-right">{artwork.year}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p><span className="font-medium text-muted-foreground">Category:</span></p>
                    <p className="sm:text-right">{artwork.category}</p>
                  </div>
                  {artwork.price && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <p><span className="font-medium text-muted-foreground">Price:</span></p>
                      <p className="sm:text-right font-semibold text-primary">{artwork.price}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-playfair text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{artwork.description}</p>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mt-8 space-y-6 border-t border-border pt-6">
            <h3 className="font-playfair text-xl font-semibold">Comments & Reviews</h3>
            <CommentsList artworkId={artwork.id.toString()} refreshTrigger={refreshTrigger} />
            <CommentForm 
              artworkId={artwork.id.toString()} 
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
