import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  author_id: string | null;
  featured_image_url: string | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  published_at: string | null;
  reading_time: number | null;
  tags: string[] | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBlogPosts = useCallback(async (includeUnpublished = false) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Fetching blog posts...', includeUnpublished ? 'including unpublished' : 'published only');
      
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // Only filter by published status if not including unpublished
      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching blog posts:', error);
        setError(error.message);
        setBlogPosts([]);
        return;
      }

      console.log('Blog posts fetched successfully:', data?.length || 0);
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error in fetchBlogPosts:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load blog posts';
      setError(errorMessage);
      setBlogPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateUniqueSlug = async (title: string): Promise<string> => {
    try {
      console.log('Generating unique slug for title:', title);
      
      // Generate base slug
      let baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      let slug = baseSlug;
      let counter = 1;

      // Check if slug exists and increment until we find a unique one
      while (true) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', slug)
          .single();

        if (error && error.code === 'PGRST116') {
          // No matching record found, slug is unique
          break;
        } else if (error) {
          console.error('Error checking slug uniqueness:', error);
          throw error;
        } else if (data) {
          // Slug exists, try with counter
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }
      
      console.log('Generated unique slug:', slug);
      return slug;
    } catch (error) {
      console.error('Slug generation failed:', error);
      // Fallback with timestamp
      const timestamp = Date.now();
      return `${title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20)}-${timestamp}`;
    }
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const addBlogPost = useCallback(async (postData: Partial<BlogPost>) => {
    try {
      console.log('Adding blog post:', postData.title);
      
      // Validate required fields
      if (!postData.title?.trim() || !postData.content?.trim()) {
        throw new Error('Title and content are required');
      }

      // Generate unique slug and calculate reading time
      const slug = await generateUniqueSlug(postData.title);
      const readingTime = calculateReadingTime(postData.content);
      
      const insertData = {
        title: postData.title.trim(),
        content: postData.content.trim(),
        excerpt: postData.excerpt?.trim() || null,
        slug,
        author_id: postData.author_id || null,
        featured_image_url: postData.featured_image_url?.trim() || null,
        is_published: postData.is_published || false,
        is_featured: postData.is_featured || false,
        reading_time: readingTime,
        tags: postData.tags || null,
        meta_description: postData.meta_description?.trim() || null,
        published_at: postData.is_published ? new Date().toISOString() : null
      };

      console.log('Inserting blog post data:', insertData);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error inserting blog post:', error);
        throw error;
      }
      
      console.log('Blog post created successfully:', data);
      
      // Update local state with new post
      setBlogPosts(prev => [data, ...prev]);
      
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error in addBlogPost:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create blog post",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateBlogPost = useCallback(async (id: string, postData: Partial<BlogPost>) => {
    try {
      console.log('Updating blog post:', id);
      
      const updateData: any = { ...postData };
      
      // Calculate reading time if content changed
      if (postData.content) {
        updateData.reading_time = calculateReadingTime(postData.content);
      }
      
      // Set published_at based on is_published status
      if (postData.hasOwnProperty('is_published')) {
        updateData.published_at = postData.is_published ? new Date().toISOString() : null;
      }
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating blog post:', error);
        throw error;
      }
      
      console.log('Blog post updated successfully:', data);
      
      // Update local state
      setBlogPosts(prev => prev.map(post => post.id === id ? data : post));
      
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error in updateBlogPost:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deleteBlogPost = useCallback(async (id: string) => {
    try {
      console.log('Deleting blog post:', id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
      }
      
      console.log('Blog post deleted successfully');
      
      // Update local state immediately
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    } catch (error) {
      console.error('Error in deleteBlogPost:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  return {
    blogPosts,
    isLoading,
    error,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    refetch: (includeUnpublished = false) => fetchBlogPosts(includeUnpublished)
  };
};
