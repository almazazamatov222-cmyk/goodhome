import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ProductsTable } from './components/table'
import { ProductColumn } from './components/table'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
   if (!process.env.DATABASE_URL) {
      return (
         <div className="block space-y-4 my-6">
            <div className="flex items-center justify-between">
               <Heading title="Products (0)" description="Database not connected" />
            </div>
            <Separator />
            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
               Please connect DATABASE_URL to see your products.
            </div>
         </div>
      );
   }

   let products: any[] = []
   try {
      products = await prisma.product.findMany({
         include: {
            orders: true,
            categories: true,
            brand: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      })
   } catch (error) {
      console.error("DB Error:", error)
   }

   const formattedProducts: ProductColumn[] = products.map((product) => ({
      id: product.id,
      title: product.title,
      price: formatter.format(product.price),
      discount: formatter.format(product.discount),
      category: product.categories[0].title,
      sales: product.orders.length,
      isAvailable: product.isAvailable,
   }))

   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Products (${products.length})`}
               description="Manage products for your store"
            />
            <Link href="/products/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         <ProductsTable data={formattedProducts} />
      </div>
   )
}
