export default async function Page({ params, searchParams, }: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { slug } = await params
    const { search } = await searchParams
    console.log(slug, search)
    return <h1>My Page</h1>
  }