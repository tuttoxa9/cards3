'use client';

import { useState } from 'react';
import { Card, deleteCard } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { EditCardModal } from './EditCardModal';

export function CardItem({ card }: { card: Card }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EditCardModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} card={card} />
      <div className="border p-4 rounded-lg flex flex-col">
        <img src={card.imageUrl} alt={card.name} className="w-full h-48 object-cover rounded-md mb-2" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{card.name}</h3>
          <p className="text-sm text-gray-500">{card.rarity}</p>
          <p className="text-sm mt-1">{card.description}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>
            Редактировать
          </Button>
          <form action={deleteCard}>
            <input type="hidden" name="id" value={card.id} />
            <input type="hidden" name="imageUrl" value={card.imageUrl} />
            <Button variant="destructive" className="w-full" type="submit">
              Удалить
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
