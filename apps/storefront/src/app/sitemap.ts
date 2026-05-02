import prisma from '@/lib/prisma'

const URL = process.env.NEXT_PUBLIC_URL

export default async function sitemap() {
   let products = []
   let blogs = []

   if (process.env.DATABASE_URL) {
      try {
         products = (await prisma.product.findMany()).map(
            ({ id, updatedAt }) => ({
               url: `${URL}/products/${id}`,
               lastModified: updatedAt,
            })
         )

         blogs = (await prisma.blog.findMany()).map(({ slug, updatedAt }) => ({
            url: `${URL}/blog/${slug}`,
            lastModified: updatedAt,
         }))
      } catch (error) {
         console.error('Sitemap generation failed during build:', error)
      }
   }

   const routes = ['', '/products', '/blog'].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...products, ...blogs]
}
