export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    // Simple validation
    const validationError = validateImageFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    console.log('Processing image:', file.name, 'Size:', file.size, 'bytes');

    // For production, you would upload to Supabase storage
    // For now, create a temporary URL
    const url = URL.createObjectURL(file);
    
    console.log('Image processed successfully:', url);
    return url;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error instanceof Error ? error : new Error('Unknown upload error occurred');
  }
};

export const validateImageFile = (file: File): string | null => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!file) {
    return 'No file selected';
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Please upload a valid image file (JPEG, PNG, or WebP)';
  }

  if (file.size > maxSize) {
    return 'Image size must be less than 5MB';
  }

  if (file.size === 0) {
    return 'Selected file appears to be empty';
  }

  return null;
};