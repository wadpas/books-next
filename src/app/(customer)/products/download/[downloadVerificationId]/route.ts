import db from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ downloadVerificationId: string }> }) {
  const { downloadVerificationId } = await params
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: true },
  })

  if (data == null) {
    return NextResponse.redirect(new URL('/products/download/expired', req.url))
  }

  const file = data.product.filePath
  const extension = data.product.filePath.split('.').pop()

  return new NextResponse(file, {
    headers: {
      'Content-Disposition': `attachment; filename="${data.product.name}.${extension}"`,
    },
  })
}
