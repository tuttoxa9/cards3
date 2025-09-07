'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityDescription = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'Легендарная карта с уникальными голографическими эффектами';
      case 'rare': return 'Редкая карта с продвинутыми визуальными эффектами';
      default: return 'Обычная карта с базовыми голографическими элементами';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Фон */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Модальное окно */}
      <div className="relative glass-panel max-w-4xl w-full max-h-[90vh] overflow-auto animate-in fade-in zoom-in duration-300">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-red-400 transition-colors"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Изображение */}
          <div className="relative">
            <div className="relative h-96 md:h-full min-h-[400px] rounded-3xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Голографический оверлей */}
              <div className="absolute inset-0 holographic-bg opacity-40 mix-blend-overlay animate-holographic" />
              {/* Рамка */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-3xl" />
              {/* Редкость */}
              <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getRarityColor(product.rarity)} shadow-lg`}>
                {product.rarity.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Информация */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {product.name}
              </h2>
              <p className="text-xl text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Детали редкости */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">Редкость</h3>
              <p className="text-muted-foreground">
                {getRarityDescription(product.rarity)}
              </p>
            </div>

            {/* Характеристики */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4">Характеристики</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Материал:</span>
                  <span className="text-primary">Премиум картон</span>
                </div>
                <div className="flex justify-between">
                  <span>Покрытие:</span>
                  <span className="text-primary">Голографическое</span>
                </div>
                <div className="flex justify-between">
                  <span>Размер:</span>
                  <span className="text-primary">63×88 мм</span>
                </div>
                <div className="flex justify-between">
                  <span>Тираж:</span>
                  <span className="text-primary">Ограниченный</span>
                </div>
              </div>
            </div>

            {/* Цена и кнопка */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <p className="text-sm text-muted-foreground">Цена</p>
                <p className="text-3xl font-bold text-primary">{product.price}</p>
              </div>
              <Button
                size="lg"
                className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 transform hover:scale-105 transition-all duration-300"
              >
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
