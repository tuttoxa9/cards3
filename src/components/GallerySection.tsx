'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductModal } from '@/components/ProductModal';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
}

interface GallerySectionProps {
  category: 'heroes' | 'cars';
  onBack: () => void;
}

const heroesProducts: Product[] = [
  {
    id: 1,
    name: 'Железный Человек',
    price: '2,500₽',
    image: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&h=600&fit=crop',
    description: 'Голографическая карта с эффектом металлического блеска',
    rarity: 'legendary'
  },
  {
    id: 2,
    name: 'Человек-паук',
    price: '1,800₽',
    image: 'https://images.unsplash.com/photo-1635863138275-d9864d2031ec?w=400&h=600&fit=crop',
    description: 'Карта с эффектом паутины и голографическими переливами',
    rarity: 'rare'
  },
  {
    id: 3,
    name: 'Капитан Америка',
    price: '2,200₽',
    image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=600&fit=crop',
    description: 'Патриотичная карта с металлическими акцентами',
    rarity: 'rare'
  },
  {
    id: 4,
    name: 'Тор',
    price: '2,800₽',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop',
    description: 'Божественная карта с эффектом молнии',
    rarity: 'legendary'
  },
  {
    id: 5,
    name: 'Халк',
    price: '2,000₽',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=600&fit=crop',
    description: 'Мощная карта с зеленым голографическим свечением',
    rarity: 'rare'
  },
  {
    id: 6,
    name: 'Чёрная Вдова',
    price: '1,600₽',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c38a?w=400&h=600&fit=crop',
    description: 'Элегантная карта с тёмными переливами',
    rarity: 'common'
  }
];

const carsProducts: Product[] = [
  {
    id: 7,
    name: 'Lamborghini Huracán',
    price: '3,500₽',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=600&fit=crop',
    description: 'Карта суперкара с голографическими отражениями',
    rarity: 'legendary'
  },
  {
    id: 8,
    name: 'Ferrari 488',
    price: '3,200₽',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=600&fit=crop',
    description: 'Итальянская страсть в голографическом исполнении',
    rarity: 'legendary'
  },
  {
    id: 9,
    name: 'Porsche 911',
    price: '2,800₽',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=600&fit=crop',
    description: 'Классическая карта с металлическими эффектами',
    rarity: 'rare'
  },
  {
    id: 10,
    name: 'McLaren 720S',
    price: '3,000₽',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
    description: 'Аэродинамичная карта с неоновыми акцентами',
    rarity: 'rare'
  },
  {
    id: 11,
    name: 'Bugatti Veyron',
    price: '4,500₽',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=400&h=600&fit=crop',
    description: 'Эксклюзивная карта гиперкара',
    rarity: 'legendary'
  },
  {
    id: 12,
    name: 'Aston Martin DB11',
    price: '2,600₽',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=600&fit=crop',
    description: 'Элегантная британская карта',
    rarity: 'rare'
  }
];

export function GallerySection({ category, onBack }: GallerySectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const products = category === 'heroes' ? heroesProducts : carsProducts;
  const title = category === 'heroes' ? 'Супергерои' : 'Автомобили';

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, product: Product) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <section className="min-h-screen py-20 px-8">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>

        {/* Заголовок */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              ← Назад к категориям
            </Button>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mt-4">
              Коллекция премиальных голографических карт
            </p>
          </div>
        </div>

        {/* Сетка продуктов */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`card-3d glass-panel cursor-pointer overflow-hidden transform transition-all duration-500 delay-${index * 100} hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              onMouseMove={(e) => handleCardHover(e, product)}
              onMouseLeave={handleCardLeave}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Изображение */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                {/* Голографический оверлей */}
                <div className="absolute inset-0 holographic-bg opacity-30 mix-blend-overlay" />
                {/* Редкость */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(product.rarity)}`}>
                  {product.rarity.toUpperCase()}
                </div>
              </div>

              {/* Контент */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button
                    size="sm"
                    className="neon-glow bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary"
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно продукта */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
