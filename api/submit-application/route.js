import { db } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { applications } from '../../src/lib/schema';

// Эта функция будет вызываться при POST-запросе на /api/submit-application
export async function POST(request) {
  const vercelDb = drizzle(db);
  try {
    const data = await request.json();

    // Проверяем, что есть ID пользователя (для безопасности)
    if (!data.userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    // Вставляем новую запись в таблицу applications
    const newApplication = await vercelDb.insert(applications).values({
      userId: String(data.userId),
      contactName: data.contactName,
      telegram: data.telegram,
      email: data.email,
      projectName: data.projectName,
      projectWebsite: data.projectWebsite,
      projectNiche: data.projectNiche,
      productToAdvertise: data.productToAdvertise,
      usp: data.usp,
      goals: data.goals,
      targetAudience: data.targetAudience,
      budget: data.budget,
    }).returning(); // .returning() возвращает созданную запись

    return new Response(JSON.stringify({ success: true, application: newApplication[0] }), { status: 201 });

  } catch (error) {
    console.error('Failed to submit application:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}