'use client';

import { useEffect, useState } from 'react';

export function PhilosophySection() {
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

    const element = document.getElementById('philosophy');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy" className="min-h-screen flex items-center justify-center p-8">
      <div className={`max-w-7xl w-full mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Макро-изображение */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-panel">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop"
                alt="Макро-снимок голографической карты"
                className="w-full h-full object-cover"
              />
              {/* Голографический оверлей */}
              <div className="absolute inset-0 holographic-bg opacity-60 mix-blend-overlay animate-holographic" />
              {/* Градиент */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Детали */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80">Макро-съёмка</p>
                <p className="text-lg font-semibold">Голографические детали</p>
              </div>
            </div>

            {/* Плавающие элементы */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-3xl glass-panel holographic-bg animate-float opacity-70" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-3xl glass-panel holographic-bg animate-float opacity-70" style={{ animationDelay: '2s' }} />
          </div>

          {/* Текстовый контент */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>

            {/* Заголовок */}
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Искусство
                <br />
                коллекционирования
              </h2>
            </div>

            {/* Основной текст */}
            <div className="glass-panel p-8 rounded-3xl space-y-6">
              <p className="text-xl leading-relaxed text-foreground">
                Мы создаём не просто карты — мы создаём произведения искусства.
                Каждая голографическая деталь продумана до мелочей, каждый
                переливающийся элемент рассказывает свою историю.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                Наша страсть к совершенству отражается в каждой карте.
                Используя передовые технологии печати и эксклюзивные материалы,
                мы превращаем коллекционирование в настоящее путешествие по миру
                премиальной визуальной культуры.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                Качество, которое можно почувствовать. Дизайн, который завораживает.
                Эмоции, которые остаются навсегда.
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center glass-panel p-4 rounded-2xl">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Уникальных дизайнов</div>
              </div>
              <div className="text-center glass-panel p-4 rounded-2xl">
                <div className="text-2xl font-bold text-secondary mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
              <div className="text-center glass-panel p-4 rounded-2xl">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
