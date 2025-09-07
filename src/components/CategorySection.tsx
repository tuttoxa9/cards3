'use client';

import { useState, useEffect } from 'react';

interface CategorySectionProps {
  id: string;
  onCategorySelect: (category: 'heroes' | 'cars') => void;
}

export function CategorySection({ id, onCategorySelect }: CategorySectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<'heroes' | 'cars' | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [id]);

  return (
    <section id={id} className="min-h-screen flex items-center justify-center p-8">
      <div className={`w-full max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>

        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Выберите коллекцию
          </h2>
          <p className="text-xl text-muted-foreground">
            Каждая категория - это уникальная вселенная дизайна
          </p>
        </div>

        {/* Категории */}
        <div className="flex flex-col lg:flex-row h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-panel">

          {/* Супергерои */}
          <div
            className={`relative flex-1 cursor-pointer group transition-all duration-700 ease-out ${
              hoveredCategory === 'heroes' ? 'flex-[2]' : hoveredCategory === 'cars' ? 'flex-[0.8]' : ''
            } ${hoveredCategory === 'cars' ? 'opacity-60' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredCategory('heroes')}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => onCategorySelect('heroes')}
          >
            {/* Фон категории */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-blue-500/30 to-yellow-500/30 transition-all duration-700" />

            {/* Контент */}
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
              <div className={`transition-all duration-500 ${hoveredCategory === 'heroes' ? 'transform scale-110' : ''}`}>
                <div className="w-24 h-24 mb-6 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
                  Супергерои
                </h3>
                <p className="text-lg text-muted-foreground text-center lg:text-left max-w-md">
                  Легендарные персонажи комиксов с голографическими спецэффектами
                </p>
              </div>
            </div>

            {/* Hover эффект */}
            <div className={`absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent transition-opacity duration-300 ${
              hoveredCategory === 'heroes' ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>

          {/* Автомобили */}
          <div
            className={`relative flex-1 cursor-pointer group transition-all duration-700 ease-out ${
              hoveredCategory === 'cars' ? 'flex-[2]' : hoveredCategory === 'heroes' ? 'flex-[0.8]' : ''
            } ${hoveredCategory === 'heroes' ? 'opacity-60' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredCategory('cars')}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => onCategorySelect('cars')}
          >
            {/* Фон категории */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-red-500/30 to-purple-500/30 transition-all duration-700" />

            {/* Контент */}
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
              <div className={`transition-all duration-500 ${hoveredCategory === 'cars' ? 'transform scale-110' : ''}`}>
                <div className="w-24 h-24 mb-6 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-3xl">🏎️</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
                  Автомобили
                </h3>
                <p className="text-lg text-muted-foreground text-center lg:text-left max-w-md">
                  Культовые спорткары с металлическими голографическими покрытиями
                </p>
              </div>
            </div>

            {/* Hover эффект */}
            <div className={`absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent transition-opacity duration-300 ${
              hoveredCategory === 'cars' ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
        </div>
      </div>
    </section>
  );
}
