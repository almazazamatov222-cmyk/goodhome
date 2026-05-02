import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'

import { UsersTable } from './components/table'
import { UserColumn } from './components/table'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
   if (!process.env.DATABASE_URL) {
      return (
         <div className="block space-y-4 my-6">
            <Heading title="Users" description="Database not connected" />
            <Separator />
            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
               Please connect DATABASE_URL to see your users.
            </div>
         </div>
      );
   }

   let users: any[] = []
   try {
      users = await prisma.user.findMany({
         include: {
            orders: true,
         },
         take: 10,
         orderBy: {
            updatedAt: 'desc',
         },
      })
   } catch (error) {
      console.error("DB Error:", error)
   }

   const formattedUsers: UserColumn[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      orders: user.orders.length,
   }))

   return (
      <div className="block space-y-4 my-6">
         <Heading title="Users" description="Manage products for your store" />
         <Separator />
         <UsersTable data={formattedUsers} />
      </div>
   )
}
