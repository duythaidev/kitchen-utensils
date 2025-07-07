import ProductDetailPage from "@/components/ProductDetail/ProductDetail"

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

  console.log("productid", productId)
  const productData = await productRes.json()
  const reviewsData = await reviewsRes.json()
  return (
    <>
      <ProductDetailPage product={productData} reviews={reviewsData}></ProductDetailPage>
    </>
  )
}