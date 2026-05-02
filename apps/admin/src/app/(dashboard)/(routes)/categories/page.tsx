import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { CategoriesClient, CategoryColumn } from './components/table'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
   if (!process.env.DATABASE_URL) {
      return (
         <div className="my-6 block space-y-4">
            <div className="flex items-center justify-between">
               <Heading title="Categories (0)" description="Database not connected" />
            </div>
            <Separator />
            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
               Please connect DATABASE_URL to see your categories.
            </div>
         </div>
      );
   }

   let categories: any[] = []
   try {
      categories = await prisma.category.findMany({
         include: {
            products: true,
         },
      })
   } catch (error) {
      console.error("DB Error:", error)
   }

   const formattedCategories: CategoryColumn[] = categories.map((category) => ({
      id: category.id,
      title: category.title,
      products: category.products.length,
   }))

   return (
      <div className="my-6 block space-y-4">
         <div className="flex items-center justify-between">
            <Heading
               title={`Categories (${categories.length})`}
               description="Manage categories for your store"
            />
            <Link href="/categories/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         <CategoriesClient data={formattedCategories} />
      </div>
   )
}
