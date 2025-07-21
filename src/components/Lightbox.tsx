import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: Array<{ url: string; title: string; alt?: string }>;
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const Lightbox = ({ 
  isOpen, 
  images, 
  currentIndex, 
  onClose, 
  onPrevious, 
  onNext 
}: LightboxProps) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, currentIndex]);

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
        case '+':
        case '=':
          setScale(prev => Math.min(prev + 0.2, 3));
          break;
        case '-':
          setScale(prev => Math.max(prev - 0.2, 0.5));
          break;
        case 'r':
        case 'R':
          setRotation(prev => prev + 90);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation(prev => prev + 90);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">
                {currentIndex + 1} of {images.length}
              </span>
              <h3 className="font-playfair text-lg font-semibold">{currentImage.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRotate();
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Rotate"
              >
                <RotateCw size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors text-sm"
                title="Reset"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex items-center justify-center h-full p-4 pt-20 pb-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={currentImage.url}
              alt={currentImage.alt || currentImage.title}
              className="max-w-full max-h-full object-contain cursor-move"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease'
              }}
              onMouseDown={(e) => {
                setIsDragging(true);
                const startX = e.clientX - position.x;
                const startY = e.clientY - position.y;

                const handleMouseMove = (e: MouseEvent) => {
                  setPosition({
                    x: e.clientX - startX,
                    y: e.clientY - startY
                  });
                };

                const handleMouseUp = () => {
                  setIsDragging(false);
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </motion.div>
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              title="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              title="Next Image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-center text-white/80 text-sm">
            Use arrow keys to navigate • +/- to zoom • R to rotate • ESC to close
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};