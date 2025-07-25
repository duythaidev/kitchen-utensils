import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CategoryList from '@/components/Pages/Home/CategoryList';
import Hero from '@/components/Pages/Home/Hero';
import Promotion from '@/components/Pages/Home/Promotion';;

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Kitchen Utensils',
  description: 'Home page for Kitchen Utensils',
};

export default async function Home() {

  const categoriesRes = await fetch(`${process.env.BACKEND_API}/categories?limit=10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store', //  test

    next: { tags: ['list-categories'] }
  });
  const data = await categoriesRes.json()

  // fetch product for carousel
  const productsRes = await fetch(`${process.env.BACKEND_API}/products/top-rated`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store', //  test

    next: { tags: ['list-products'] }
  });
  const productsData = await productsRes.json();

  return (
    <>
      <Header categories={data.data}></Header>
      <div className='md:pt-[135px] '>
        <Hero products={productsData}></Hero>
        <CategoryList categories={data.data}></CategoryList>
        <Promotion></Promotion>
        {/* <Test></Test> */}
      </div>
      <Footer></Footer>
    </>
  );
}
