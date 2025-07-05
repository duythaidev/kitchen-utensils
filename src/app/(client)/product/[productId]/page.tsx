import ProductDetailPage from "@/components/ProductDetail/ProductDetail"

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  if (!productId) {
    return <div>Product not found</div>
  }
  const res = await fetch(`${process.env.BACKEND_API}/products/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  console.log("productid", productId)
  const data = await res.json()
  return (
    <>
      <ProductDetailPage product={data}></ProductDetailPage>
    </>
  )
}