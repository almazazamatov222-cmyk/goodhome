import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding GOOD HOME data...')

  // 1. Categories
  const categories = [
    { title: 'Постельное белье', description: 'Премиальное сатиновое и хлопковое постельное белье' },
    { title: 'Полотенца', description: 'Мягкие и впитывающие полотенца из 100% хлопка' },
    { title: 'Домашняя одежда', description: 'Уютные пижамы и халаты для вашего комфорта' },
    { title: 'Декор', description: 'Стильные аксессуары для вашего дома' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { title: cat.title },
      update: {},
      create: cat,
    })
  }
  console.log('Categories created.')

  // 2. Brands
  const brands = [
    { title: 'GOOD HOME', description: 'Наш собственный бренд качественного текстиля.' },
    { title: 'Turkish Soft', description: 'Лучшие турецкие ткани.' },
  ]

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { title: brand.title },
      update: {},
      create: brand,
    })
  }
  console.log('Brands created.')

  // 3. Products (Based on Instagram data)
  const products = [
    {
      title: 'Сатиновый комплект "Silver Mist"',
      description: 'Премиальный сатин, 100% хлопок. Нежный серый оттенок с шелковистым блеском.',
      price: 48000,
      stock: 15,
      brandTitle: 'GOOD HOME',
      categoryTitle: 'Постельное белье',
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000'],
    },
    {
      title: 'Набор махровых полотенец (3 шт)',
      description: 'Плотность 600 г/м2. Очень мягкие и долговечные.',
      price: 12500,
      stock: 30,
      brandTitle: 'Turkish Soft',
      categoryTitle: 'Полотенца',
      images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000'],
    },
    {
      title: 'Хлопковая пижама "Cozy Night"',
      description: 'Дышащий хлопок, свободный крой. Идеально для крепкого сна.',
      price: 18900,
      stock: 20,
      brandTitle: 'GOOD HOME',
      categoryTitle: 'Домашняя одежда',
      images: ['https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=1000'],
    },
    {
      title: 'Декоративная наволочка "Velvet Touch"',
      description: 'Бархатистая текстура, размер 50x50 см.',
      price: 5500,
      stock: 50,
      brandTitle: 'GOOD HOME',
      categoryTitle: 'Декор',
      images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=1000'],
    },
  ]

  for (const p of products) {
    const brand = await prisma.brand.findUnique({ where: { title: p.brandTitle } })
    const category = await prisma.category.findUnique({ where: { title: p.categoryTitle } })

    if (brand && category) {
      await prisma.product.create({
        data: {
          title: p.title,
          description: p.description,
          price: p.price,
          stock: p.stock,
          images: p.images,
          isAvailable: true,
          brandId: brand.id,
          categories: {
            connect: { id: category.id }
          }
        }
      })
    }
  }
  console.log('Products created.')

  // 4. Banners
  const banners = [
    { label: 'Новая коллекция сатина', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000' },
    { label: 'Уютная домашняя одежда', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=2000' },
  ]

  for (const banner of banners) {
    await prisma.banner.create({ data: banner })
  }
  console.log('Banners created.')

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
