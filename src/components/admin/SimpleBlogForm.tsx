import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';
import { SimpleImageUpload } from './SimpleImageUpload';

interface SimpleBlogFormProps {
  post?: BlogPost | null;
  onSave: (postData: any) => Promise<void>;
  onCancel: () => void;
}

export const SimpleBlogForm = ({ post, onSave, onCancel }: SimpleBlogFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setExcerpt(post.excerpt || '');
      setImageUrl(post.featured_image_url || '');
      setIsPublished(post.is_published || false);
    }
  }, [post]);

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!content.trim()) {
      setError('Content is required');
      return false;
    }
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return false;
    }
    if (content.trim().length < 10) {
      setError('Content must be at least 10 characters long');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        featured_image_url: imageUrl.trim() || null,
        is_published: isPublished
      });
    } catch (error) {
      console.error('Error saving:', error);
      setError('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateExcerpt = () => {
    if (content && !excerpt) {
      const words = content.replace(/<[^>]*>/g, '').split(' ');
      setExcerpt(words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : ''));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {post ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-900/50 border border-red-700 rounded-md p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog post title"
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">Excerpt</label>
              <button
                type="button"
                onClick={generateExcerpt}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                disabled={isSubmitting}
              >
                Auto-generate
              </button>
            </div>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description (optional)"
              rows={3}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-vertical"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              rows={12}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-vertical"
              disabled={isSubmitting}
              required
            />
          </div>

          <SimpleImageUpload
            currentImageUrl={imageUrl}
            onImageUpload={setImageUrl}
            onImageRemove={() => setImageUrl('')}
            disabled={isSubmitting}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              disabled={isSubmitting}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="published" className="text-sm text-gray-300">
              Publish immediately
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-400 hover:text-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={16} />
              {isSubmitting ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
