'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createCard } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Добавление...' : 'Добавить карточку'}
    </Button>
  );
}

export function AddCardForm() {
  const [state, formAction] = useFormState(createCard, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message.includes('успешно')) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 max-w-lg mb-8">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea id="description" name="description" required />
      </div>
      <div>
        <Label htmlFor="rarity">Редкость</Label>
        <Input id="rarity" name="rarity" required />
      </div>
      <div>
        <Label htmlFor="image">Изображение</Label>
        <Input id="image" name="image" type="file" required />
      </div>
      <SubmitButton />
      {state?.message && <p className="mt-4">{state.message}</p>}
    </form>
  );
}
