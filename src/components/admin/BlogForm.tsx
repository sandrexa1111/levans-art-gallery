import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { BlogPost } from '@/hooks/useBlogPosts';
import { ImageUpload } from './ImageUpload';

interface BlogFormProps {
  post?: BlogPost | null;
  onSave: (postData: any) => Promise<void>;
  onCancel: () => void;
}

export const BlogForm = ({ post, onSave, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    is_published: false,
    is_featured: false,
    tags: '',
    meta_description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        featured_image_url: post.featured_image_url || '',
        is_published: post.is_published || false,
        is_featured: post.is_featured || false,
        tags: post.tags ? post.tags.join(', ') : '',
        meta_description: post.meta_description || ''
      });
    }
  }, [post]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (formData.featured_image_url && !isValidUrl(formData.featured_image_url)) {
      newErrors.featured_image_url = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await onSave({
        ...formData,
        tags: tagsArray.length > 0 ? tagsArray : null
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error saving blog post:', error);
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const autoGenerateExcerpt = () => {
    if (formData.content && !formData.excerpt) {
      const words = formData.content.replace(/<[^>]*>/g, '').split(' ');
      const excerpt = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
      setFormData(prev => ({ ...prev, excerpt }));
    }
  };

  const autoGenerateMetaDescription = () => {
    if (formData.content && !formData.meta_description) {
      const words = formData.content.replace(/<[^>]*>/g, '').split(' ');
      const metaDesc = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
      setFormData(prev => ({ ...prev, meta_description: metaDesc }));
    }
  };

  const handleImageUpload = (url: string) => {
    handleChange('featured_image_url', url);
  };

  const handleImageRemove = () => {
    handleChange('featured_image_url', '');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="font-playfair text-2xl font-bold">
            {post ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitting && (
          <div className="px-6 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Upload size={16} className="animate-pulse text-primary" />
              <span className="text-sm font-medium">Saving blog post...</span>
            </div>
            <Progress value={uploadProgress} className="mt-2" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter blog post title"
                className={errors.title ? 'border-red-500' : ''}
                disabled={isSubmitting}
                required
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Excerpt</label>
                <button
                  type="button"
                  onClick={autoGenerateExcerpt}
                  className="text-xs text-primary hover:text-primary/80"
                  disabled={isSubmitting}
                >
                  Auto-generate
                </button>
              </div>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                placeholder="Brief description of the blog post"
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Content *</label>
              <Textarea
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Write your blog post content here... (HTML is supported)"
                rows={8}
                className={errors.content ? 'border-red-500' : ''}
                disabled={isSubmitting}
                required
              />
              {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                currentImageUrl={formData.featured_image_url}
                onImageUpload={handleImageUpload}
                onImageRemove={handleImageRemove}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="art, painting, inspiration"
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Meta Description</label>
                <button
                  type="button"
                  onClick={autoGenerateMetaDescription}
                  className="text-xs text-primary hover:text-primary/80"
                  disabled={isSubmitting}
                >
                  Auto-generate
                </button>
              </div>
              <Textarea
                value={formData.meta_description}
                onChange={(e) => handleChange('meta_description', e.target.value)}
                placeholder="SEO meta description (recommended: 150-160 characters)"
                rows={2}
                disabled={isSubmitting}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.meta_description.length}/160 characters
              </p>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => handleChange('is_published', e.target.checked)}
                  className="rounded"
                  disabled={isSubmitting}
                />
                <span className="text-sm">Published</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => handleChange('is_featured', e.target.checked)}
                  className="rounded"
                  disabled={isSubmitting}
                />
                <span className="text-sm">Featured</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
