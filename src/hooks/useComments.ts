import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  artwork_id: string;
  user_name: string;
  user_email: string;
  comment_text: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchComments = useCallback(async (artworkId?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      let query = supabase
        .from('artwork_comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (artworkId && artworkId !== 'all') {
        console.log('Fetching comments for artwork:', artworkId);
        query = query.eq('artwork_id', artworkId);
      } else if (artworkId === 'all') {
        // For admin panel, fetch ALL comments (approved and pending)
        console.log('Fetching all comments for admin panel');
        // No additional filter needed to get all comments
      } else {
        // For public display, only show approved comments
        console.log('Fetching approved comments for public display');
        query = query.eq('is_approved', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching comments:', error);
        setError(error.message);
        setComments([]);
        toast({
          title: "Error",
          description: "Failed to load comments",
          variant: "destructive",
        });
        return;
      }
      
      console.log('Comments fetched successfully:', data?.length || 0);
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch comments';
      setError(errorMessage);
      setComments([]);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const addComment = async (commentData: Omit<Comment, 'id' | 'created_at' | 'is_approved'>) => {
    try {
      // Validate input data
      if (!commentData.user_name?.trim()) {
        throw new Error('Name is required');
      }
      if (!commentData.user_email?.trim()) {
        throw new Error('Email is required');
      }
      if (!commentData.comment_text?.trim()) {
        throw new Error('Comment is required');
      }
      if (!commentData.artwork_id?.trim()) {
        throw new Error('Artwork ID is required');
      }

      console.log('Adding comment for artwork:', commentData.artwork_id);
      
      const { data, error } = await supabase
        .from('artwork_comments')
        .insert([{ 
          ...commentData, 
          is_approved: false,
          user_name: commentData.user_name.trim(),
          user_email: commentData.user_email.trim(),
          comment_text: commentData.comment_text.trim(),
          rating: Math.max(1, Math.min(5, commentData.rating || 5))
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding comment:', error);
        throw error;
      }
      
      console.log('Comment added successfully:', data);
      setComments(prev => [data, ...prev]);
      
      toast({
        title: "Success",
        description: "Comment submitted for approval",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding comment:', error);
      const message = error instanceof Error ? error.message : "Failed to add comment. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const approveComment = async (id: string) => {
    try {
      if (!id?.trim()) {
        throw new Error('Comment ID is required');
      }

      console.log('Approving comment:', id);
      
      const { data, error } = await supabase
        .from('artwork_comments')
        .update({ is_approved: true })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error approving comment:', error);
        throw error;
      }
      
      console.log('Comment approved successfully:', data);
      setComments(prev => prev.map(comment => 
        comment.id === id ? data : comment
      ));
      
      toast({
        title: "Success",
        description: "Comment approved",
      });
      
      return data;
    } catch (error) {
      console.error('Error approving comment:', error);
      toast({
        title: "Error",
        description: "Failed to approve comment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteComment = async (id: string) => {
    try {
      if (!id?.trim()) {
        throw new Error('Comment ID is required');
      }

      console.log('Deleting comment:', id);
      
      const { error } = await supabase
        .from('artwork_comments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting comment:', error);
        throw error;
      }
      
      console.log('Comment deleted successfully');
      setComments(prev => prev.filter(comment => comment.id !== id));
      
      toast({
        title: "Success",
        description: "Comment deleted",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    addComment,
    approveComment,
    deleteComment,
  };
};