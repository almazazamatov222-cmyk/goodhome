import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { BrandColumn, BrandsClient } from './components/table'

export const dynamic = 'force-dynamic'

export default async function BrandsPage() {
   if (!process.env.DATABASE_URL) {
      return (
         <div className="my-6 block space-y-4">
            <div className="flex items-center justify-between">
               <Heading title="Brands (0)" description="Database not connected" />
            </div>
            <Separator />
            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
               Please connect DATABASE_URL to see your brands.
            </div>
         </div>
      );
   }

   let brands: any[] = []
   try {
      brands = await prisma.brand.findMany({
         include: {
            products: true,
         },
      })
   } catch (error) {
      console.error("DB Error:", error)
   }

   const formattedBrands: BrandColumn[] = brands.map((brand) => ({
      id: brand.id,
      title: brand.title,
      products: brand.products.length,
   }))

   return (
      <div className="my-6 block space-y-4">
         <div className="flex items-center justify-between">
            <Heading
               title={`Brands (${brands.length})`}
               description="Manage brands for your store"
            />
            <Link href="/brands/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         <BrandsClient data={formattedBrands} />
      </div>
   )
}
