import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useSimpleBlog } from '@/hooks/useSimpleBlog';
import { SimpleBlogForm } from './SimpleBlogForm';

export const SimpleBlogManagement = () => {
  const { posts, loading, error, createPost, updatePost, deletePost, fetchPosts } = useSimpleBlog();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleSave = async (postData: any) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
      } else {
        await createPost(postData);
      }
      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Failed to save post:', error);
      throw error; // Let the form handle the error display
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deletePost(id);
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
        <p className="text-red-300 font-medium">Error: {error}</p>
        <button
          onClick={() => fetchPosts(true)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No posts found. Create your first post!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        post.is_published 
                          ? 'bg-green-900/50 text-green-300 border border-green-700' 
                          : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                      }`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>
                    
                    <p className="text-sm text-gray-500">
                      Created: {new Date(post.created_at).toLocaleDateString()}
                      {post.updated_at !== post.created_at && (
                        <span className="ml-2">
                          • Updated: {new Date(post.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {post.is_published && (
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="p-2 bg-green-900/50 text-green-300 rounded-full hover:bg-green-900/70 border border-green-700 transition-colors"
                        title="View post"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-blue-900/50 text-blue-300 rounded-full hover:bg-blue-900/70 border border-blue-700 transition-colors"
                      title="Edit post"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-900/50 text-red-300 rounded-full hover:bg-red-900/70 border border-red-700 transition-colors"
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
          onCancel={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      )}
    </>
  );
};
