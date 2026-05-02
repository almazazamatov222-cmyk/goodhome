import prisma from '@/lib/prisma'
import { format } from 'date-fns'

import { PaymentClient } from './components/client'
import type { PaymentColumn } from './components/columns'

export const dynamic = 'force-dynamic'

export default async function PaymentsPage() {
   if (!process.env.DATABASE_URL) {
      return (
         <div className="p-10 text-center text-yellow-600 bg-yellow-50 rounded-lg">
            Connect DATABASE_URL to view payments.
         </div>
      );
   }

   let payments: any[] = []
   try {
      payments = await prisma.payment.findMany({
         where: {},
         include: {
            provider: true,
            user: true,
            order: true,
         },
         orderBy: {
            updatedAt: 'desc',
         },
      })
   } catch (error) {
      console.error("DB Error:", error)
   }

   const formattedPayments: PaymentColumn[] = payments.map((payment) => ({
      id: payment.id,
      number: 'Payment #' + payment.number.toString(),
      status: payment.status,
      date: payment.createdAt.toUTCString(),
      payable: '$' + payment.payable.toString(),
      isSuccessful: payment.isSuccessful,
      createdAt: format(payment.createdAt, 'MMMM do, yyyy'),
   }))

   return <PaymentClient data={formattedPayments} />
}
