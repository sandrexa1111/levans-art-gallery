import { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface SimpleImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
  disabled?: boolean;
}

export const SimpleImageUpload = ({ 
  currentImageUrl, 
  onImageUpload, 
  onImageRemove, 
  disabled 
}: SimpleImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, WebP)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Create a more reliable URL for the image
      const url = URL.createObjectURL(file);
      
      // Store the file data for later use if needed
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onImageUpload(dataUrl);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-300">Featured Image</label>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700 rounded-md p-3">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      {currentImageUrl ? (
        <div className="relative">
          <img
            src={currentImageUrl}
            alt="Featured image"
            className="w-full h-48 object-cover rounded-lg border border-gray-600"
            onError={(e) => {
              console.error('Image failed to load:', currentImageUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={() => {
              onImageRemove();
              setError(null);
            }}
            disabled={disabled}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 transition-colors"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800/50">
          <Image className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <p className="text-sm text-gray-400">Click to upload image</p>
          <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
        </div>
      )}

      <div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
            disabled={disabled || isUploading}
          />
          <div className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800 disabled:opacity-50 bg-gray-800/50 text-gray-300 transition-colors">
            <Upload size={16} />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </div>
        </label>
      </div>
    </div>
  );
};
