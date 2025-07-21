import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useArtworks, type Artwork } from '@/hooks/useArtworks';
import { ArtworkForm } from './ArtworkForm';

export const ArtworkManagement = () => {
  const { artworks, categories, isLoading, error, refetch, addArtwork, updateArtwork, deleteArtwork } = useArtworks();
  const [showForm, setShowForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSave = async (artworkData: any) => {
    try {
      if (editingArtwork) {
        await updateArtwork(editingArtwork.id, artworkData);
      } else {
        await addArtwork(artworkData);
      }
      setShowForm(false);
      setEditingArtwork(null);
    } catch (error) {
      console.error('Failed to save artwork:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteArtwork(id);
      } catch (error) {
        console.error('Failed to delete artwork:', error);
      }
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingArtwork(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading artworks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <p className="text-destructive font-medium">Error loading artworks: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-2xl font-bold">Artwork Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            Add Artwork
          </button>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No artworks found. Add your first artwork to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-lg overflow-hidden border shadow-sm"
              >
                <div className="aspect-square relative">
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  {artwork.is_featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                  {!artwork.is_published && (
                    <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Draft
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{artwork.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1 mb-4">
                    <p>{artwork.dimensions} - {artwork.medium}</p>
                    <p>{artwork.year_created}</p>
                    {artwork.price && <p className="font-medium text-primary">${artwork.price}</p>}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(artwork.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ArtworkForm
          artwork={editingArtwork}
          categories={categories}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
