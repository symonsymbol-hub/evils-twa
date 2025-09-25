import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

// Описываем таблицу для хранения пользователей Telegram
export const users = pgTable('users', {
  id: serial('id').primaryKey(), // Уникальный ID в нашей базе
  telegramId: varchar('telegram_id', { length: 256 }).unique().notNull(), // Уникальный ID из Telegram
  firstName: text('first_name'),
  lastName: text('last_name'),
  username: text('username'),
});

// Описываем таблицу для хранения заявок
export const applications = pgTable('applications', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 256 }).notNull(), // Связь с ID пользователя в Telegram
    projectName: text('project_name'),
    budget: text('budget'),
    // ... можно добавить остальные поля из анкеты
});