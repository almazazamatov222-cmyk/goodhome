import { getGraphRevenue } from '@/actions/get-graph-revenue'
import { getSalesCount } from '@/actions/get-sales-count'
import { getStockCount } from '@/actions/get-stock-count'
import { getTotalRevenue } from '@/actions/get-total-revenue'
import { Overview } from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign, Package } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
   // Safety check for build time
   if (!process.env.DATABASE_URL) {
      return (
         <div className="flex-col">
            <div className="flex-1 space-y-4 pt-4">
               <Heading title="Dashboard" description="Overview of your store (Database not connected)" />
               <Separator />
               <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
                  Please connect DATABASE_URL in Vercel settings to see your dashboard data.
               </div>
            </div>
         </div>
      );
   }

   let totalRevenue = 0
   let graphRevenue: any[] = []
   let salesCount = 0
   let stockCount = 0

   try {
      totalRevenue = await getTotalRevenue()
      graphRevenue = await getGraphRevenue()
      salesCount = await getSalesCount()
      stockCount = await getStockCount()
   } catch (error) {
      console.error("Database connection error during build:", error);
   }

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-4">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid gap-4 grid-cols-3">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Total Revenue
                     </CardTitle>
                     <DollarSign className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">
                        {formatter.format(totalRevenue)}
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Sales
                     </CardTitle>
                     <CreditCard className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">+{salesCount}</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Products In Stock
                     </CardTitle>
                     <Package className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{stockCount}</div>
                  </CardContent>
               </Card>
            </div>
            <Card className="col-span-4">
               <CardHeader>
                  <CardTitle>Overview</CardTitle>
               </CardHeader>
               <CardContent className="pl-2">
                  <Overview data={graphRevenue} />
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
