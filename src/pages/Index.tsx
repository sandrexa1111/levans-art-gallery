import { ScrollNavigation } from '@/components/ScrollNavigation';
import { HomeSection } from '@/components/sections/HomeSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { PublicReviewsSection } from '@/components/PublicReviewsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ModernFooter } from '@/components/ModernFooter';

const Index = () => {
  return (
    <div className="min-h-screen">
      <ScrollNavigation />
      <HomeSection />
      <GallerySection />
      <PublicReviewsSection />
      <AboutSection />
      <ContactSection />
      <ModernFooter />
    </div>
  );
};

export default Index;
