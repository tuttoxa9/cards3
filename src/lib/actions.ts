'use server';

import { Database } from '@cloudflare/d1';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// D1 Setup
const db = process.env.DB as unknown as Database;

// R2 Setup
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;

const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

export interface Card {
    id: number;
    name: string;
    description: string;
    rarity: string;
    imageUrl: string;
}

export async function getAllCards(): Promise<Card[]> {
  if (!db) {
    console.error('D1 database not available');
    return [];
  }
  try {
    const { results } = await db.prepare('SELECT * FROM cards').all();
    return (results as unknown as Card[]) || [];
  } catch (e: unknown) {
    if (e instanceof Error) {
        console.error('Failed to fetch cards:', e.message);
    } else {
        console.error('An unknown error occurred while fetching cards');
    }
    return [];
  }
}

interface CreateCardState {
    message: string;
}

export async function createCard(prevState: CreateCardState, formData: FormData): Promise<CreateCardState> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const rarity = formData.get('rarity') as string;
  const image = formData.get('image') as File;

  if (!name || !description || !rarity || !image || image.size === 0) {
    return { message: 'Все поля обязательны для заполнения.' };
  }

  // 1. Upload image to R2
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `${Date.now()}-${image.name}`;

  try {
    await s3.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: image.type,
    }));
    const imageUrl = `${R2_PUBLIC_URL}/${fileName}`;

    // 2. Insert card data into D1
    if (!db) {
      return { message: 'База данных D1 недоступна.' };
    }
    await db.prepare('INSERT INTO cards (name, description, rarity, imageUrl) VALUES (?, ?, ?, ?)')
      .bind(name, description, rarity, imageUrl)
      .run();

    revalidatePath('/admincard');
    return { message: 'Карточка успешно создана.' };
  } catch (e: unknown) {
    if (e instanceof Error) {
        console.error(e);
        return { message: `Ошибка при создании карточки: ${e.message}` };
    }
    return { message: 'Произошла неизвестная ошибка при создании карточки.' };
  }
}

export async function deleteCard(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  const imageUrl = formData.get('imageUrl') as string;

  if (!id || !imageUrl) {
    console.error('Delete failed: Missing id or imageUrl');
    return;
  }

  try {
    // 1. Delete image from R2
    const key = imageUrl.split('/').pop(); // Extract key from URL
    if (key) {
      await s3.send(new DeleteObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
      }));
    }

    // 2. Delete card from D1
    if (!db) {
      console.error('Delete failed: D1 database not available');
      return;
    }
    await db.prepare('DELETE FROM cards WHERE id = ?').bind(id).run();

  } catch (e: unknown) {
    if (e instanceof Error) {
        console.error(`Failed to delete card ${id}:`, e.message);
    } else {
        console.error(`An unknown error occurred while deleting card ${id}`);
    }
    // Optionally, re-throw or handle the error in a way that notifies the user
    // For now, we log it and proceed to revalidate.
  }

  revalidatePath('/admincard');
}

export async function updateCard(prevState: CreateCardState, formData: FormData): Promise<CreateCardState> {
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const rarity = formData.get('rarity') as string;
  const image = formData.get('image') as File;
  const existingImageUrl = formData.get('existingImageUrl') as string;

  if (!id || !name || !description || !rarity) {
    return { message: 'Все поля, кроме изображения, обязательны.' };
  }

  let imageUrl = existingImageUrl;

  try {
    // 1. If new image is provided, upload it and delete the old one
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;

      await s3.send(new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: fileName,
          Body: buffer,
          ContentType: image.type,
      }));
      imageUrl = `${R2_PUBLIC_URL}/${fileName}`;

      // Delete old image
      const oldKey = existingImageUrl.split('/').pop();
      if (oldKey) {
        await s3.send(new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: oldKey,
        }));
      }
    }

    // 2. Update card data in D1
    if (!db) {
      return { message: 'База данных D1 недоступна.' };
    }
    await db.prepare('UPDATE cards SET name = ?, description = ?, rarity = ?, imageUrl = ? WHERE id = ?')
      .bind(name, description, rarity, imageUrl, id)
      .run();

    revalidatePath('/admincard');
    return { message: 'Карточка успешно обновлена.' };
  } catch (e: unknown) {
    if (e instanceof Error) {
        console.error(e);
        return { message: `Ошибка при обновлении карточки: ${e.message}` };
    }
    return { message: 'Произошла неизвестная ошибка при обновлении карточки.' };
  }
}
