import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CategoryList from '@/components/Pages/Home/CategoryList';
import Hero from '@/components/Pages/Home/Hero';
import Promotion from '@/components/Pages/Home/Promotion';;

export default async function Home() {

  const res = await fetch(`${process.env.BACKEND_API}/categories?limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store', //  test

    next: { tags: ['list-categories'] }
  });
  const data = await res.json()
  console.log("true data ", data)
  return (
    <>
      <Header></Header>
      <div className='pt-[135px] '>
        <Hero></Hero>
        <CategoryList categories={data.data}></CategoryList>
        <Promotion></Promotion>
        {/* <Test></Test> */}
      </div>
      <Footer></Footer>
    </>
  );
}
