import { useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useComments } from '@/hooks/useComments';

interface CommentsListProps {
  artworkId: string;
  refreshTrigger?: number;
}

export const CommentsList = ({ artworkId, refreshTrigger }: CommentsListProps) => {
  const { comments, isLoading, fetchComments } = useComments();

  useEffect(() => {
    fetchComments(artworkId);
  }, [artworkId, fetchComments, refreshTrigger]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading comments...</p>
      </div>
    );
  }

  const approvedComments = comments.filter(comment => comment.is_approved);

  return (
    <div className="space-y-6 bg-gradient-to-br from-background via-muted/20 to-background rounded-xl p-6 border border-border/50">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h3 className="font-playfair text-xl font-semibold">
          Customer Reviews & Comments
        </h3>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {approvedComments.length} review{approvedComments.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {approvedComments.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg border border-dashed border-border">
          <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h4 className="font-medium text-lg mb-2">No reviews yet</h4>
          <p className="text-muted-foreground mb-4">
            Be the first to share your thoughts about this artwork!
          </p>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className="text-yellow-400 fill-current"
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Share your experience and help others discover this art</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approvedComments.map((comment) => (
            <div key={comment.id} className="bg-card rounded-lg p-5 border border-border hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold">
                      {comment.user_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{comment.user_name}</h4>
                      <div className="flex items-center gap-1 mt-1">
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
                    </div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {new Date(comment.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              
              <p className="text-sm leading-relaxed text-foreground bg-muted/30 rounded-lg p-3 border-l-4 border-primary/30">
                "{comment.comment_text}"
              </p>
            </div>
          ))}
          
          {/* Summary stats */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-primary">
                  {(approvedComments.reduce((sum, comment) => sum + comment.rating, 0) / approvedComments.length).toFixed(1)}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={star <= Math.round(approvedComments.reduce((sum, comment) => sum + comment.rating, 0) / approvedComments.length) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Average Rating</div>
                <div className="text-xs text-muted-foreground">
                  Based on {approvedComments.length} review{approvedComments.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
