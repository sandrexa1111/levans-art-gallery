import { Navigation } from '@/components/Navigation';
import { ModernFooter } from '@/components/ModernFooter';
import { StandardHeader } from '@/components/StandardHeader';
import { useSimpleBlog } from '@/hooks/useSimpleBlog';
import { motion } from 'framer-motion';
import { Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimpleBlog = () => {
  const { posts, loading, error } = useSimpleBlog();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading blog: {error}</p>
            <Link to="/" className="text-primary hover:underline">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section - Matching main page */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden hero-gradient">
        {/* Artistic background elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/25 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/15 rounded-full blur-2xl" />
        </div>

        {/* Featured artwork overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/lovable-uploads/92b785c0-0831-46a3-ad0f-5c6a095c8d19.png"
            alt="Featured artwork background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card/90 backdrop-blur-md border border-primary/30 rounded-full text-foreground text-sm font-inter shadow-lg mb-6">
              <BookOpen size={16} className="text-primary" />
              Art & Stories
            </div>
            
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[0.9] tracking-tight drop-shadow-2xl mb-4">
              <div className="text-shadow-lg">Art &</div>
              <div className="text-primary drop-shadow-2xl">Inspiration</div>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto font-inter font-light leading-relaxed drop-shadow-lg">
              Thoughts, insights, and stories from my artistic journey
            </p>
          </div>
        </div>
      </section>
      

      {/* Blog Posts */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No blog posts published yet.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {post.featured_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <h2 className="font-playfair text-xl font-bold text-foreground mb-3">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <ModernFooter />
    </div>
  );
};

export default SimpleBlog;
