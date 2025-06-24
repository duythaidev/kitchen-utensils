'use client'
import CarouselHeroPage from '@/components/Home/Carousel';
import CategoryList from '@/components/Home/CategoryList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Home/Hero';
import Link from 'next/link';
import React, { useState } from 'react';
import Promotion from '@/components/Home/Promotion';

export default function Home() {

  return (
    <div className='relative '>
      <Hero></Hero>
      <CategoryList></CategoryList>
      <Promotion></Promotion>
    </div>
  );
}
