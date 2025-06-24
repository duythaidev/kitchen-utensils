import ProductDetailPage from "@/components/ProductDetail/ProductDetail"

export default async function Page({ params, }: { params: Promise<{ product: string }> }) {
  const { product } = await params
  console.log(product)
  return (
    <>
      {product}
      <ProductDetailPage></ProductDetailPage>
    </>
  )
}