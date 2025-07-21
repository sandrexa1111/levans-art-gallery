
import { useEffect, useState } from 'react';
import { useComments, type Comment } from '@/hooks/useComments';
import { Star, Check, X, Trash2, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const CommentModeration = () => {
  const { comments, isLoading, error, fetchComments, approveComment, deleteComment } = useComments();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  useEffect(() => {
    console.log('CommentModeration: Fetching all comments...');
    fetchComments('all'); // Pass 'all' to fetch all comments for admin
  }, [fetchComments]);

  const filteredComments = comments.filter(comment => {
    if (filter === 'pending') return !comment.is_approved;
    if (filter === 'approved') return comment.is_approved;
    return true;
  });

  const pendingCount = comments.filter(c => !c.is_approved).length;

  const handleApprove = async (id: string) => {
    try {
      console.log('CommentModeration: Approving comment:', id);
      await approveComment(id);
    } catch (error) {
      console.error('CommentModeration: Failed to approve comment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      try {
        console.log('CommentModeration: Deleting comment:', id);
        await deleteComment(id);
      } catch (error) {
        console.error('CommentModeration: Failed to delete comment:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground text-lg">Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-destructive font-medium">Error loading comments</p>
        </div>
        <p className="text-destructive/80 text-sm">{error}</p>
        <button
          onClick={() => fetchComments()}
          className="mt-3 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h2 className="font-playfair text-2xl font-bold">Comment Moderation</h2>
            <p className="text-muted-foreground">Manage customer reviews and feedback</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {(['all', 'pending', 'approved'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 relative ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'pending' && pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold min-w-[20px] h-5 flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Comments</p>
              <p className="text-2xl font-bold">{comments.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-green-600">{comments.filter(c => c.is_approved).length}</p>
            </div>
            <Check className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg border border-dashed border-border">
          <MessageSquare className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-medium text-lg mb-2">
            {filter === 'pending' ? 'No pending comments' : 
             filter === 'approved' ? 'No approved comments' : 'No comments found'}
          </h3>
          <p className="text-muted-foreground">
            {filter === 'pending' ? 'All comments have been reviewed.' : 
             filter === 'approved' ? 'No comments have been approved yet.' : 
             'Comments will appear here once customers start leaving reviews.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-card rounded-lg p-6 border shadow-sm transition-all hover:shadow-md ${
                comment.is_approved ? 'border-green-200 bg-green-50/50' : 'border-orange-200 bg-orange-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold">
                      {comment.user_name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{comment.user_name}</h3>
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                          {comment.user_email}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({comment.rating}/5)
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Artwork ID:</strong> {comment.artwork_id}
                      </p>
                      
                      <div className="bg-background rounded-lg p-4 border border-border mb-3">
                        <p className="text-sm leading-relaxed">{comment.comment_text}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(comment.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                        <span className={`px-3 py-1 rounded-full font-medium ${
                          comment.is_approved 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {comment.is_approved ? 'Approved' : 'Pending Review'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!comment.is_approved && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="p-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                      title="Approve comment"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-3 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
