import { useState } from 'react';
import { Star, Send, MessageSquare } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { showSuccessToast, showErrorToast } from '@/components/toast';

interface CommentFormProps {
  artworkId: string;
  onCommentAdded?: () => void;
}

export const CommentForm = ({ artworkId, onCommentAdded }: CommentFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addComment } = useComments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('CommentForm: Submitting comment for artwork:', artworkId);
    
    if (!artworkId) {
      console.error('CommentForm: No artwork ID provided');
      return;
    }
    
    if (!name.trim() || !email.trim() || !comment.trim()) {
      console.error('CommentForm: Missing required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addComment({
        artwork_id: artworkId,
        user_name: name.trim(),
        user_email: email.trim(),
        comment_text: comment.trim(),
        rating,
      });

      console.log('CommentForm: Comment submitted successfully');

      // Show success toast
      showSuccessToast(
        "Thank you for your review!",
        "Your comment has been submitted and is pending approval."
      );

      // Reset form
      setName('');
      setEmail('');
      setComment('');
      setRating(5);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      
      onCommentAdded?.();
    } catch (error) {
      console.error('CommentForm: Failed to submit comment:', error);
      showErrorToast(
        "Failed to submit comment",
        "Please try again later or contact support if the problem persists."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-playfair text-xl font-semibold text-green-800 mb-2">
          Thank You for Your Review!
        </h3>
        <p className="text-green-700 mb-4">
          Your comment has been submitted and is pending approval. We appreciate your feedback!
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Leave Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-card via-muted/20 to-card rounded-xl p-6 border border-border/50 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-playfair text-xl font-semibold">Share Your Experience</h3>
          <p className="text-sm text-muted-foreground">Your review helps others discover great art</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-foreground">
            Rate this artwork *
          </label>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                  disabled={isSubmitting}
                >
                  <Star 
                    size={24} 
                    className={`transition-colors ${
                      star <= (hoveredRating || rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300 hover:text-yellow-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2 text-foreground">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
            placeholder="Share your thoughts about this artwork... What did you love about it? How did it make you feel?"
            required
            disabled={isSubmitting}
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {comment.length}/500 characters
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !email.trim() || !comment.trim()}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Submit Review
            </>
          )}
        </button>
      </form>
      
      <div className="mt-4 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
        <strong>Note:</strong> Your review will be moderated before appearing publicly. 
        We appreciate honest feedback that helps other art enthusiasts make informed decisions.
      </div>
    </div>
  );
};
