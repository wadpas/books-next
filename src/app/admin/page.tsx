import { DashboardCard } from '@/components/DashboardCard'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import db from '@/lib/prisma'

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([getSalesData(), getUserData(), getProductData()])

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <DashboardCard
        title='Sales'
        subtitle={`${formatNumber(salesData.numberOfSales)} orders`}
        body={`${formatCurrency(salesData.amount)} total`}
      />
      <DashboardCard
        title='Customers'
        subtitle={`${formatNumber(userData.userCount)} users`}
        body={`${formatCurrency(userData.averageOrderValue)}  check`}
      />
      <DashboardCard
        title='Products'
        subtitle={`${formatNumber(productData.productCount)} products`}
        body={`${formatNumber(productData.availableProductCount)}  available`}
      />
    </div>
  )
}

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { total: true },
    _count: true,
  })

  return {
    amount: (data._sum.total || 0) / 100,
    numberOfSales: data._count,
  }
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { total: true },
    }),
  ])

  return {
    userCount,
    averageOrderValue: (orderData._sum.total || 0) / 100 / userCount,
  }
}

async function getProductData() {
  const [productCount, availableProductCount] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { isAvailable: true } }),
  ])

  return {
    productCount,
    availableProductCount,
  }
}
