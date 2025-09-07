'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onExplore: () => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновый градиент с анимацией */}
      <div className="absolute inset-0 holographic-bg opacity-20" />

      {/* Основной контент */}
      <div className={`text-center z-10 px-4 transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-glow">
          Искусство<br />в твоих руках
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Откройте мир премиальных коллекционных карт с голографическими эффектами
        </p>

        <Button
          size="lg"
          onClick={onExplore}
          className="glass-panel neon-glow text-lg px-8 py-4 bg-primary/20 hover:bg-primary/30 border-primary/50 text-primary hover:text-primary transition-all duration-300 transform hover:scale-105"
        >
          Изучить коллекцию
        </Button>
      </div>

      {/* Плавающие голографические элементы */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-3xl glass-panel holographic-bg animate-float opacity-60" />
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-3xl glass-panel holographic-bg animate-float opacity-60" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-10 w-16 h-16 rounded-3xl glass-panel holographic-bg animate-float opacity-60" style={{ animationDelay: '4s' }} />

      {/* Стрелка прокрутки */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
