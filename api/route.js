import { db } from '@vercel/postgres';
import { users } from '../../src/lib/schema';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export async function POST(request) {
  const vercelDb = drizzle(db);
  const { user } = await request.json(); // Получаем данные пользователя из фронтенда

  if (!user || !user.id) {
    return new Response(JSON.stringify({ error: 'User data is required' }), { status: 400 });
  }

  try {
    // 1. Ищем пользователя в базе по его telegramId
    const existingUser = await vercelDb.select().from(users).where(eq(users.telegramId, String(user.id)));

    if (existingUser.length > 0) {
      // 2. Если пользователь найден, возвращаем его
      return new Response(JSON.stringify({ message: 'User authenticated', user: existingUser[0] }), { status: 200 });
    } else {
      // 3. Если пользователь не найден, создаем нового
      const newUser = await vercelDb.insert(users).values({
        telegramId: String(user.id),
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
      }).returning();
      
      return new Response(JSON.stringify({ message: 'User created and authenticated', user: newUser[0] }), { status: 201 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}