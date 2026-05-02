-- 1. Создаем категории, если их нет
INSERT INTO "Category" (id, name, "createdAt", "updatedAt")
VALUES 
  ('cat-1', 'Постельное белье', now(), now()),
  ('cat-2', 'Полотенца', now(), now()),
  ('cat-3', 'Для кухни', now(), now())
ON CONFLICT (id) DO NOTHING;

-- 2. Добавляем товары из Instagram
INSERT INTO "Product" (id, name, price, "categoryId", "isFeatured", "isArchived", "createdAt", "updatedAt")
VALUES
  (uuid_generate_v4(), 'Постельное белье Страйп-сатин Белый (Euro)', 28500, 'cat-1', true, false, now(), now()),
  (uuid_generate_v4(), 'Постельное белье Сатин Бордо (Euro)', 26000, 'cat-1', true, false, now(), now()),
  (uuid_generate_v4(), 'Постельное белье Сатин Изумруд (Euro)', 26000, 'cat-1', true, false, now(), now()),
  (uuid_generate_v4(), 'Набор махровых полотенец (5 шт)', 12500, 'cat-2', true, false, now(), now()),
  (uuid_generate_v4(), 'Постельное белье Сатин Серый Графит (Euro)', 27000, 'cat-1', true, false, now(), now()),
  (uuid_generate_v4(), 'Подушка Анатомическая Premium', 18000, 'cat-1', true, false, now(), now());

-- 3. Добавляем картинки к товарам (используем временные красивые ссылки, пока вы не загрузите свои в админке)
INSERT INTO "Image" (id, "productId", url, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), id, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', now(), now() FROM "Product" WHERE name LIKE '%Белый%';

INSERT INTO "Image" (id, "productId", url, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), id, 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&q=80&w=800', now(), now() FROM "Product" WHERE name LIKE '%Бордо%';

INSERT INTO "Image" (id, "productId", url, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), id, 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?auto=format&fit=crop&q=80&w=800', now(), now() FROM "Product" WHERE name LIKE '%Полотенца%';
