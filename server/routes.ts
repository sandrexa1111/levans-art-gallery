import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { artworks, categories, blogPosts, artworkComments } from "../shared/schema";
import { eq, and, desc } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Artworks API
  app.get("/api/artworks", async (req, res) => {
    try {
      const artworksData = await db.select().from(artworks).where(eq(artworks.is_published, true));
      res.json(artworksData);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      res.status(500).json({ error: "Failed to fetch artworks" });
    }
  });

  // Categories API
  app.get("/api/categories", async (req, res) => {
    try {
      const categoriesData = await db.select().from(categories);
      res.json(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Blog posts API
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await db.select().from(blogPosts)
        .where(eq(blogPosts.is_published, true))
        .orderBy(desc(blogPosts.published_at));
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Blog post by slug API
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await db.select().from(blogPosts)
        .where(and(eq(blogPosts.slug, slug), eq(blogPosts.is_published, true)))
        .limit(1);
      
      if (post.length === 0) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post[0]);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Comments API
  app.get("/api/artwork-comments/:artworkId", async (req, res) => {
    try {
      const { artworkId } = req.params;
      const comments = await db.select().from(artworkComments)
        .where(and(eq(artworkComments.artwork_id, artworkId), eq(artworkComments.is_approved, true)))
        .orderBy(desc(artworkComments.created_at));
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  app.post("/api/artwork-comments", async (req, res) => {
    try {
      const { artwork_id, user_name, user_email, comment_text, rating } = req.body;
      
      if (!artwork_id || !user_name || !user_email || !comment_text || !rating) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
      }

      const newComment = await db.insert(artworkComments).values({
        artwork_id,
        user_name,
        user_email,
        comment_text,
        rating,
        is_approved: false
      }).returning();

      res.status(201).json(newComment[0]);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Admin Artwork Management APIs
  app.get("/api/admin/artworks", async (req, res) => {
    try {
      const artworksData = await db.select().from(artworks).orderBy(desc(artworks.created_at));
      res.json(artworksData);
    } catch (error) {
      console.error("Error fetching admin artworks:", error);
      res.status(500).json({ error: "Failed to fetch artworks" });
    }
  });

  app.post("/api/admin/artworks", async (req, res) => {
    try {
      const { title, description, image_url, dimensions, medium, year_created, price, category_id, is_featured, is_published } = req.body;
      
      if (!title || !category_id) {
        return res.status(400).json({ error: "Title and category are required" });
      }

      const newArtwork = await db.insert(artworks).values({
        title,
        description: description || null,
        image_url: image_url || null,
        dimensions: dimensions || null,
        medium: medium || null,
        year_created: year_created || new Date().getFullYear(),
        price: price ? parseFloat(price) : null,
        category_id,
        is_featured: is_featured || false,
        is_published: is_published !== false
      }).returning();

      res.status(201).json(newArtwork[0]);
    } catch (error) {
      console.error("Error creating artwork:", error);
      res.status(500).json({ error: "Failed to create artwork" });
    }
  });

  app.put("/api/admin/artworks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image_url, dimensions, medium, year_created, price, category_id, is_featured, is_published } = req.body;
      
      if (!title || !category_id) {
        return res.status(400).json({ error: "Title and category are required" });
      }

      const updatedArtwork = await db.update(artworks)
        .set({
          title,
          description: description || null,
          image_url: image_url || null,
          dimensions: dimensions || null,
          medium: medium || null,
          year_created: year_created || new Date().getFullYear(),
          price: price ? parseFloat(price) : null,
          category_id,
          is_featured: is_featured || false,
          is_published: is_published !== false,
          updated_at: new Date()
        })
        .where(eq(artworks.id, id))
        .returning();

      if (updatedArtwork.length === 0) {
        return res.status(404).json({ error: "Artwork not found" });
      }

      res.json(updatedArtwork[0]);
    } catch (error) {
      console.error("Error updating artwork:", error);
      res.status(500).json({ error: "Failed to update artwork" });
    }
  });

  app.delete("/api/admin/artworks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedArtwork = await db.delete(artworks)
        .where(eq(artworks.id, id))
        .returning();

      if (deletedArtwork.length === 0) {
        return res.status(404).json({ error: "Artwork not found" });
      }

      res.json({ message: "Artwork deleted successfully" });
    } catch (error) {
      console.error("Error deleting artwork:", error);
      res.status(500).json({ error: "Failed to delete artwork" });
    }
  });

  // Admin Blog Management APIs
  app.get("/api/admin/blog-posts", async (req, res) => {
    try {
      const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.created_at));
      res.json(posts);
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog-posts", async (req, res) => {
    try {
      const { title, content, excerpt, slug, featured_image_url, is_published, is_featured, tags, meta_description } = req.body;
      
      if (!title || !content || !slug) {
        return res.status(400).json({ error: "Title, content, and slug are required" });
      }

      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const reading_time = Math.ceil(wordCount / wordsPerMinute);

      const newPost = await db.insert(blogPosts).values({
        title,
        content,
        excerpt: excerpt || null,
        slug,
        featured_image_url: featured_image_url || null,
        is_published: is_published !== false,
        is_featured: is_featured || false,
        published_at: is_published !== false ? new Date() : null,
        reading_time,
        tags: tags || null,
        meta_description: meta_description || null,
        author_id: null
      }).returning();

      res.status(201).json(newPost[0]);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, excerpt, slug, featured_image_url, is_published, is_featured, tags, meta_description } = req.body;
      
      if (!title || !content || !slug) {
        return res.status(400).json({ error: "Title, content, and slug are required" });
      }

      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const reading_time = Math.ceil(wordCount / wordsPerMinute);

      const updatedPost = await db.update(blogPosts)
        .set({
          title,
          content,
          excerpt: excerpt || null,
          slug,
          featured_image_url: featured_image_url || null,
          is_published: is_published !== false,
          is_featured: is_featured || false,
          published_at: is_published !== false ? new Date() : null,
          reading_time,
          tags: tags || null,
          meta_description: meta_description || null,
          updated_at: new Date()
        })
        .where(eq(blogPosts.id, id))
        .returning();

      if (updatedPost.length === 0) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json(updatedPost[0]);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedPost = await db.delete(blogPosts)
        .where(eq(blogPosts.id, id))
        .returning();

      if (deletedPost.length === 0) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Admin Comments Management APIs
  app.get("/api/admin/comments", async (req, res) => {
    try {
      const comments = await db.select().from(artworkComments).orderBy(desc(artworkComments.created_at));
      res.json(comments);
    } catch (error) {
      console.error("Error fetching admin comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  app.put("/api/admin/comments/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      
      const updatedComment = await db.update(artworkComments)
        .set({ is_approved: true })
        .where(eq(artworkComments.id, id))
        .returning();

      if (updatedComment.length === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.json(updatedComment[0]);
    } catch (error) {
      console.error("Error approving comment:", error);
      res.status(500).json({ error: "Failed to approve comment" });
    }
  });

  app.delete("/api/admin/comments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedComment = await db.delete(artworkComments)
        .where(eq(artworkComments.id, id))
        .returning();

      if (deletedComment.length === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
