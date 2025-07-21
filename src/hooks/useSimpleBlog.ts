import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SimpleBlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  featured_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const useSimpleBlog = () => {
  const [posts, setPosts] = useState<SimpleBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (includeUnpublished = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('blog_posts')
        .select('id, title, content, excerpt, slug, featured_image_url, is_published, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (!includeUnpublished) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
        return;
      }

      setPosts(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: {
    title: string;
    content: string;
    excerpt?: string;
    featured_image_url?: string;
    is_published?: boolean;
  }) => {
    try {
      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt || null,
          slug: `${slug}-${Date.now()}`,
          featured_image_url: postData.featured_image_url || null,
          is_published: postData.is_published || false,
        })
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Create error:', err);
      throw err;
    }
  };

  const updatePost = async (id: string, updates: Partial<SimpleBlogPost>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPosts(prev => prev.map(post => post.id === id ? data : post));
      return data;
    } catch (err) {
      console.error('Update error:', err);
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};