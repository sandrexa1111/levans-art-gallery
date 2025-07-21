import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface LightboxImage {
  url: string;
  title: string;
  alt?: string;
  description?: string;
  year?: number;
  medium?: string;
  dimensions?: string;
}

interface EnhancedLightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const EnhancedLightbox = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext
}: EnhancedLightboxProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, onClose, onPrevious, onNext]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentImage.title}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
        onMouseMove={() => setShowControls(true)}
      >
        {/* Top Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6"
            >
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="text-white">
                  <h2 className="font-playfair text-2xl font-bold mb-1">{currentImage.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    {currentImage.year && <span>{currentImage.year}</span>}
                    {currentImage.medium && <span>{currentImage.medium}</span>}
                    {currentImage.dimensions && <span>{currentImage.dimensions}</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors text-white"
                  >
                    {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload();
                    }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors text-white"
                  >
                    <Download size={20} />
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: isZoomed ? 1.5 : 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.url}
            alt={currentImage.alt || currentImage.title}
            className={`w-full h-full object-contain transition-transform duration-300 ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </motion.div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Bottom Info */}
        <AnimatePresence>
          {showControls && currentImage.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-6"
            >
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-white/90 text-lg leading-relaxed">
                  {currentImage.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Keyboard Shortcuts Hint */}
        <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm rounded-xl p-3 text-white/70 text-xs">
          <div>ESC: Close • ←→: Navigate • SPACE: Zoom</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};