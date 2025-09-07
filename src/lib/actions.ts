'use server';

import { Database } from '@cloudflare/d1';
import { revalidatePath } from 'next/cache';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
    return (results as Card[]) || [];
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
