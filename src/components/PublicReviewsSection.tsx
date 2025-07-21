import { useEffect } from 'react';
import { Star, MessageSquare, Quote } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { motion } from 'framer-motion';

export const PublicReviewsSection = () => {
  const { comments, isLoading, fetchComments } = useComments();

  useEffect(() => {
    // Fetch all comments (no specific artwork ID to get all comments)
    fetchComments();
  }, [fetchComments]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading customer reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  // Only show approved comments
  const approvedComments = comments.filter(comment => comment.is_approved);
  
  // Limit to most recent 6 reviews for the homepage
  const featuredReviews = approvedComments.slice(0, 6);

  // Calculate average rating (only if there are reviews)
  const averageRating = featuredReviews.length > 0 
    ? featuredReviews.reduce((sum, comment) => sum + comment.rating, 0) / featuredReviews.length 
    : 0;

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">
              What Our Customers Say
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover why art lovers worldwide choose Levan Mosiashvili's masterpieces
          </p>
          
          {/* Average Rating Display or Coming Soon */}
          {featuredReviews.length > 0 ? (
            <div className="inline-flex items-center gap-4 bg-card rounded-full px-8 py-4 shadow-lg border border-border/50">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-primary">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-sm font-medium">
                  {featuredReviews.length} Review{featuredReviews.length !== 1 ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  From verified customers
                </div>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-4 bg-card rounded-full px-8 py-4 shadow-lg border border-border/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div className="text-lg font-medium text-primary">
                  Reviews Coming Soon
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Reviews Grid or Empty State */}
        {featuredReviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-card rounded-xl border border-border/50"
          >
            <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
            <h3 className="font-playfair text-2xl font-semibold mb-4">Be the First to Review</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Share your experience with Levan Mosiashvili's artwork and help others discover these magnificent pieces.
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className="text-yellow-400 fill-current"
                />
              ))}
            </div>
            <button
              onClick={() => {
                const galleryElement = document.getElementById('gallery');
                if (galleryElement) {
                  galleryElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <MessageSquare size={18} />
              View Gallery & Leave a Review
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Quote size={16} className="text-primary-foreground" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({comment.rating}/5)
                  </span>
                </div>

                {/* Comment Text */}
                <blockquote className="text-foreground leading-relaxed mb-6 italic">
                  "{comment.comment_text}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{comment.user_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action for more reviews */}
        {approvedComments.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                const galleryElement = document.getElementById('gallery');
                if (galleryElement) {
                  galleryElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              <MessageSquare size={20} />
              View All {approvedComments.length} Reviews
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
