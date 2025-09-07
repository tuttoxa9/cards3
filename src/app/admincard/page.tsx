import { getAllCards, Card } from '@/lib/actions';
import { AddCardForm } from './AddCardForm';

export default async function AdminCardPage() {
  const cards = await getAllCards();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Панель администратора карточек</h1>

      <AddCardForm />

      <h2 className="text-xl font-bold mt-8 mb-4">Существующие карточки</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="border p-4 rounded-lg">
            <img src={card.imageUrl} alt={card.name} className="w-full h-48 object-cover rounded-md mb-2" />
            <h3 className="text-lg font-semibold">{card.name}</h3>
            <p className="text-sm text-gray-500">{card.rarity}</p>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
        {cards.length === 0 && <p>Карточек пока нет.</p>}
      </div>
    </div>
  );
}
