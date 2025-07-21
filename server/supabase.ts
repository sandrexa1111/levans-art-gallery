import { createClient } from '@supabase/supabase-js';

// Supabase connection setup
// To use this instead of Neon, you'll need to:
// 1. Install @supabase/supabase-js: npm install @supabase/supabase-js
// 2. Set your SUPABASE_URL and SUPABASE_ANON_KEY environment variables
// 3. Replace the database imports in routes.ts with this supabase client

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example usage functions for your artwork management:
export const supabaseArtworks = {
  // Get all published artworks
  async getPublishedArtworks() {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get all artworks for admin
  async getAllArtworks() {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create new artwork
  async createArtwork(artwork: any) {
    const { data, error } = await supabase
      .from('artworks')
      .insert([artwork])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update artwork
  async updateArtwork(id: string, artwork: any) {
    const { data, error } = await supabase
      .from('artworks')
      .update(artwork)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete artwork
  async deleteArtwork(id: string) {
    const { error } = await supabase
      .from('artworks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { message: 'Artwork deleted successfully' };
  }
};

export const supabaseCategories = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }
};

export const supabaseBlogPosts = {
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAllPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createPost(post: any) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePost(id: string, post: any) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { message: 'Blog post deleted successfully' };
  }
};

export const supabaseComments = {
  async getApprovedComments(artworkId: string) {
    const { data, error } = await supabase
      .from('artwork_comments')
      .select('*')
      .eq('artwork_id', artworkId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAllComments() {
    const { data, error } = await supabase
      .from('artwork_comments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createComment(comment: any) {
    const { data, error } = await supabase
      .from('artwork_comments')
      .insert([{ ...comment, is_approved: false }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async approveComment(id: string) {
    const { data, error } = await supabase
      .from('artwork_comments')
      .update({ is_approved: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteComment(id: string) {
    const { error } = await supabase
      .from('artwork_comments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { message: 'Comment deleted successfully' };
  }
};