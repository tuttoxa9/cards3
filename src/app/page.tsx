'use client';

import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { GallerySection } from '@/components/GallerySection';
import { PhilosophySection } from '@/components/PhilosophySection';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<'heroes' | 'cars' | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const handleCategorySelect = (category: 'heroes' | 'cars') => {
    setSelectedCategory(category);
    setShowGallery(true);
  };

  const handleBackToCategories = () => {
    setShowGallery(false);
    setSelectedCategory(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onExplore={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} />

      {!showGallery && (
        <CategorySection
          id="categories"
          onCategorySelect={handleCategorySelect}
        />
      )}

      {showGallery && selectedCategory && (
        <GallerySection
          category={selectedCategory}
          onBack={handleBackToCategories}
        />
      )}

      <PhilosophySection />
    </main>
  );
}
