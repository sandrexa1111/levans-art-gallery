import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  placeholder?: string;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  onClick,
  onError,
  placeholder = '/placeholder.svg'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    } else {
      const target = e.target as HTMLImageElement;
      target.src = placeholder;
    }
  }, [onError, placeholder]);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && !hasError && (
        <div className={`absolute inset-0 bg-muted/50 animate-pulse ${className}`} />
      )}
      
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onClick={onClick}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};