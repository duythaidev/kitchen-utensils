import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CategoryList from '@/components/Pages/Home/CategoryList';
import Hero from '@/components/Pages/Home/Hero';
import Promotion from '@/components/Pages/Home/Promotion';
;

export default function Home() {

  return (
    <>
      <Header></Header>
      <div className='pt-[135px] '>
        <Hero></Hero>
        <CategoryList></CategoryList>
        <Promotion></Promotion>
        {/* <Test></Test> */}
      </div>
      <Footer></Footer>
    </>
  );
}
