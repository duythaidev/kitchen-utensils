import ProductDetailPage from "@/components/Pages/ProductDetail/ProductDetail"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Kitchen Utensils',
  description: 'Explore our detailed product catalog of kitchen utensils and cookware',
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page({ params, }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  if (!productId) {
    return <div>Product not found</div>
  }
  const productRes = await fetch(`${process.env.BACKEND_API}/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["product-detail"],
    },
  })

  const reviewsRes = await fetch(`${process.env.BACKEND_API}/reviews/product/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["list-reviews"],
    },
  })

  const productData = await productRes.json()
  const reviewsData = await reviewsRes.json()
  console.log("reviewsData", reviewsData)
  return (
    <>
      <ProductDetailPage product={productData} reviews={reviewsData}></ProductDetailPage>
    </>
  )
}