'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateCard, Card } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useEffect, useRef } from 'react';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Сохранение...' : 'Сохранить изменения'}
    </Button>
  );
}

interface EditCardModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  card: Card;
}

export function EditCardModal({ isOpen, setIsOpen, card }: EditCardModalProps) {
  const [state, formAction] = useFormState(updateCard, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message.includes('успешно')) {
      setIsOpen(false);
    }
  }, [state, setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать карточку</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={card.id} />
          <input type="hidden" name="existingImageUrl" value={card.imageUrl} />
          <div>
            <Label htmlFor="name">Название</Label>
            <Input id="name" name="name" defaultValue={card.name} required />
          </div>
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" name="description" defaultValue={card.description} required />
          </div>
          <div>
            <Label htmlFor="rarity">Редкость</Label>
            <Input id="rarity" name="rarity" defaultValue={card.rarity} required />
          </div>
          <div>
            <Label htmlFor="image">Заменить изображение (необязательно)</Label>
            <Input id="image" name="image" type="file" />
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Отмена</Button>
            <SubmitButton />
          </DialogFooter>
          {state?.message && <p className="mt-4 text-sm">{state.message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
