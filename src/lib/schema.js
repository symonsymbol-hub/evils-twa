import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

// Таблица пользователей остается без изменений
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  telegramId: varchar('telegram_id', { length: 256 }).unique().notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  username: text('username'),
});

// Расширяем таблицу заявок всеми полями из анкеты
export const applications = pgTable('applications', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 256 }).notNull(), // ID пользователя из Telegram
    createdAt: timestamp('created_at').defaultNow().notNull(), // Дата создания заявки

    // Поля из анкеты
    contactName: text('contact_name'),
    telegram: text('telegram'),
    email: text('email'),
    projectName: text('project_name'),
    projectWebsite: text('project_website'),
    projectNiche: text('project_niche'),
    productToAdvertise: text('product_to_advertise'),
    usp: text('usp'),
    goals: text('goals'),
    targetAudience: text('target_audience'),
    budget: text('budget'),
});