import { useState } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';
import { CommentForm } from './CommentForm';
import { CommentsList } from './CommentsList';

interface ArtworkDetailProps {
  artwork: {
    id: string;
    title: string;
    image_url?: string;
    description?: string;
    medium?: string;
    dimensions?: string;
    year_created?: number;
    price?: number;
  };
  onClose: () => void;
}

export const ArtworkDetail = ({ artwork, onClose }: ArtworkDetailProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCommentAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h2 className="font-playfair text-2xl font-bold">{artwork.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {artwork.image_url && (
            <div className="text-center">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Artwork Details</h3>
              <div className="space-y-2 text-sm">
                {artwork.medium && (
                  <p><span className="font-medium">Medium:</span> {artwork.medium}</p>
                )}
                {artwork.dimensions && (
                  <p><span className="font-medium">Dimensions:</span> {artwork.dimensions}</p>
                )}
                {artwork.year_created && (
                  <p><span className="font-medium">Year:</span> {artwork.year_created}</p>
                )}
                {artwork.price && (
                  <p><span className="font-medium">Price:</span> ${artwork.price}</p>
                )}
              </div>
            </div>
            
            {artwork.description && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <CommentsList artworkId={artwork.id} refreshTrigger={refreshTrigger} />
            <CommentForm artworkId={artwork.id} onCommentAdded={handleCommentAdded} />
          </div>
        </div>
      </div>
    </div>
  );
};
