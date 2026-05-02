-- 1. Categories
INSERT INTO "Category" ("id", "title", "description", "updatedAt") VALUES 
('cat_1', 'Постельное белье', 'Премиальное сатиновое и хлопковое постельное белье', NOW()),
('cat_2', 'Полотенца', 'Мягкие и впитывающие полотенца из 100% хлопка', NOW()),
('cat_3', 'Домашняя одежда', 'Уютные пижамы и халаты для вашего комфорта', NOW()),
('cat_4', 'Декор', 'Стильные аксессуары для вашего дома', NOW());

-- 2. Brands
INSERT INTO "Brand" ("id", "title", "description") VALUES 
('brand_1', 'GOOD HOME', 'Наш собственный бренд качественного текстиля.'),
('brand_2', 'Turkish Soft', 'Лучшие турецкие ткани.');

-- 3. Products
INSERT INTO "Product" ("id", "title", "description", "price", "stock", "images", "isAvailable", "brandId", "updatedAt") VALUES 
('prod_1', 'Сатиновый комплект "Silver Mist"', 'Премиальный сатин, 100% хлопок. Нежный серый оттенок с шелковистым блеском.', 48000, 15, ARRAY['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000'], true, 'brand_1', NOW()),
('prod_2', 'Набор махровых полотенец (3 шт)', 'Плотность 600 г/м2. Очень мягкие и долговечные.', 12500, 30, ARRAY['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000'], true, 'brand_2', NOW()),
('prod_3', 'Хлопковая пижама "Cozy Night"', 'Дышащий хлопок, свободный крой. Идеально для крепкого сна.', 18900, 20, ARRAY['https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=1000'], true, 'brand_1', NOW()),
('prod_4', 'Декоративная наволочка "Velvet Touch"', 'Бархатистая текстура, размер 50x50 см.', 5500, 50, ARRAY['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000'], true, 'brand_1', NOW());

-- 4. Category to Product relationships
INSERT INTO "_CategoryToProduct" ("A", "B") VALUES 
('cat_1', 'prod_1'),
('cat_2', 'prod_2'),
('cat_3', 'prod_3'),
('cat_4', 'prod_4');

-- 5. Banners
INSERT INTO "Banner" ("id", "label", "image", "updatedAt") VALUES 
('banner_1', 'Новая коллекция сатина', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000', NOW()),
('banner_2', 'Уютная домашняя одежда', 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=2000', NOW());
