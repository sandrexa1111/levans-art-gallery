import { useState } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { SimpleBlogManagement } from '@/components/admin/SimpleBlogManagement';
import { ArtworkManagement } from '@/components/admin/ArtworkManagement';
import { CommentModeration } from '@/components/admin/CommentModeration';
import { Navigation } from '@/components/Navigation';

type TabType = 'blog' | 'artworks' | 'comments';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('blog');

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: 'blog', label: 'Blog Posts' },
    { id: 'artworks', label: 'Artworks' },
    { id: 'comments', label: 'Comments' },
  ] as const;

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300 mt-2">Manage your content and settings</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-700 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'blog' && <SimpleBlogManagement />}
            {activeTab === 'artworks' && <ArtworkManagement />}
            {activeTab === 'comments' && <CommentModeration />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
