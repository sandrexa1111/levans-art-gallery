import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, FileText, MessageSquare, Settings, LogOut } from 'lucide-react';
import { ArtworkManagement } from './ArtworkManagement';
import { BlogManagement } from './BlogManagement';
import { CommentModeration } from './CommentModeration';

type TabType = 'artworks' | 'blog' | 'comments' | 'settings';

interface AdminPanelProps {
  onLogout: () => Promise<void>;
}

export const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('artworks');

  const tabs = [
    { id: 'artworks', label: 'Artworks', icon: Palette },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'artworks':
        return <ArtworkManagement />;
      case 'blog':
        return <BlogManagement />;
      case 'comments':
        return <CommentModeration />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <ArtworkManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your gallery content and settings</p>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-secondary rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};
