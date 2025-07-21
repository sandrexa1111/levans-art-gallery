import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  dimensions: string;
  medium: string;
  year_created: number;
  price?: number;
  category_id: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

// Helper function to determine period based on year and style
export const getPeriodFromYear = (year: number): string => {
  // New period classification based on Georgian and French periods
  if (year >= 2010) return 'Abstract';
  if (year >= 2005) return 'Cubism';
  if (year >= 2000) return 'Modern';
  if (year >= 1995) return 'Cityscape';
  if (year >= 1990) return 'Animalistic';
  if (year >= 1985) return 'Primitivism';
  return 'Early Works';
};

// Get all available periods
export const getAvailablePeriods = (): string[] => {
  return [
    'All',
    'Primitivism',
    'Animalistic', 
    'Cityscape',
    'Modern',
    'Cubism',
    'Abstract'
  ];
};

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchArtworks = useCallback(async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching artworks:', error);
        setError(error.message);
        setArtworks([]);
        return;
      }
      
      setArtworks(data || []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch artworks';
      setError(errorMessage);
      setArtworks([]);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchCategories = useCallback(async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
        setCategories([]);
        return;
      }
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      setError(errorMessage);
      setCategories([]);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchArtworks(), fetchCategories()]);
    setIsLoading(false);
  }, [fetchArtworks, fetchCategories]);

  const addArtwork = async (artworkData: Omit<Artwork, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .insert([artworkData])
        .select()
        .single();

      if (error) throw error;
      
      setArtworks(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Artwork added successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding artwork:', error);
      toast({
        title: "Error",
        description: "Failed to add artwork",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateArtwork = async (id: string, artworkData: Partial<Artwork>) => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .update({ ...artworkData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setArtworks(prev => prev.map(artwork => 
        artwork.id === id ? data : artwork
      ));
      
      toast({
        title: "Success",
        description: "Artwork updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating artwork:', error);
      toast({
        title: "Error",
        description: "Failed to update artwork",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteArtwork = async (id: string) => {
    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setArtworks(prev => prev.filter(artwork => artwork.id !== id));
      toast({
        title: "Success",
        description: "Artwork deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting artwork:', error);
      toast({
        title: "Error",
        description: "Failed to delete artwork",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchArtworks(), fetchCategories()]);
      setIsLoading(false);
    };

    loadData();
  }, [fetchArtworks, fetchCategories]);

  return {
    artworks,
    categories,
    isLoading,
    error,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    fetchArtworks,
    fetchCategories,
    refetch,
  };
};
