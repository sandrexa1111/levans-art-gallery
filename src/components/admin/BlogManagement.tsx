import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Eye } from 'lucide-react';
import { useBlogPosts, type BlogPost } from '@/hooks/useBlogPosts';
import { SimpleBlogForm } from './SimpleBlogForm';

export const BlogManagement = () => {
  const { blogPosts, isLoading, error, refetch, addBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    refetch(true);
  }, [refetch]);

  const handleSave = async (postData: any) => {
    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, postData);
      } else {
        await addBlogPost(postData);
      }
      setShowForm(false);
      setEditingPost(null);
      refetch(true);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        refetch(true);
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 font-medium">Error: {error}</p>
        <button
          onClick={() => refetch(true)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts found. Create your first post to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg p-6 border shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      {!post.is_published && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                          Draft
                        </span>
                      )}
                      {post.is_published && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          Published
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {post.is_published && (
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                        title="View post"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                      title="Edit post"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <SimpleBlogForm
          post={editingPost}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};