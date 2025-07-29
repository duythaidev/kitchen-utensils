'use server'
import { revalidateTag } from 'next/cache'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const changeStatus = async (
  orderId: number,
  status: string,
  accessToken: string
) => {
  const { ok, data } = await fetchWithAuth({
    url: `/orders/${orderId}/status`,
    method: 'PATCH',
    body: { status },
    accessToken,
    tag: 'list-orders',
  })

  if (!ok) return { success: false, message: data.message || 'Update failed' }
  revalidateTag('list-orders')
  return { success: true, message: 'Order status updated', data }
}
