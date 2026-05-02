import {
   BlogPostCard,
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogCard'
import Carousel from '@/components/native/Carousel'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import prisma from '@/lib/prisma'
import { isVariableValid } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function Index() {
   let products = []
   let blogs = []
   let banners = []

   if (process.env.DATABASE_URL) {
      try {
         products = await prisma.product.findMany({
            include: {
               brand: true,
               categories: true,
            },
         })

         blogs = await prisma.blog.findMany({
            include: { author: true },
            take: 3,
         })

         banners = await prisma.banner.findMany()
      } catch (error) {
         console.error('Database connection failed during build:', error)
      }
   }

   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel images={banners.map((obj) => obj.image)} />
         <Separator className="my-8" />
         <Heading
            title="Products"
            description="Below is a list of products we have available for you."
         />
         {products.length > 0 ? (
            <ProductGrid products={products} />
         ) : (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
               <p className="text-lg">Товары еще не добавлены в админке.</p>
               <ProductSkeletonGrid />
            </div>
         )}
         <Separator className="my-8" />
         {blogs.length > 0 ? (
            <BlogPostGrid blogs={blogs} />
         ) : (
            <BlogPostSkeletonGrid />
         )}
      </div>
   )
}
