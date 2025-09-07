import { getAllCards } from '@/lib/actions';
import { AddCardForm } from './AddCardForm';
import { CardItem } from './CardItem';

export default async function AdminCardPage() {
  const cards = await getAllCards();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Панель администратора карточек</h1>

      <AddCardForm />

      <h2 className="text-xl font-bold mt-8 mb-4">Существующие карточки</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
        {cards.length === 0 && <p>Карточек пока нет.</p>}
      </div>
    </div>
  );
}
