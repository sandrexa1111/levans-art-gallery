import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadBlogImage, validateImageFile } from '@/utils/imageUpload';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
  disabled?: boolean;
}

export const ImageUpload = ({ 
  currentImageUrl, 
  onImageUpload, 
  onImageRemove, 
  disabled = false 
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    
    try {
      const imageUrl = await uploadBlogImage(file);
      onImageUpload(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    onImageRemove();
    setError(null);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Featured Image</label>
      
      {currentImageUrl ? (
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden bg-gray-50 aspect-video max-w-md">
            <img
              src={currentImageUrl}
              alt="Featured image preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image preview failed to load:', currentImageUrl);
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={disabled}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="space-y-2">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-primary hover:text-primary/80 font-medium">
                  Click to upload
                </span>
                <span> or drag and drop</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {!currentImageUrl && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <Upload size={16} />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Uploading image...</span>
        </div>
      )}
    </div>
  );
};
