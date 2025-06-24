'use client'

import { Dropdown, Input, MenuProps, Space } from "antd";
import { ChevronDown, Clock, Heart, PhoneCall, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import HoverLink from "./HoverLink";
import { redirect } from "next/navigation";
import MobileHeader from "./Mobile/MobileHeader";

const items: MenuProps['items'] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        1st menu item
      </a>
    ),
    key: '0',
  },
  {
    label: (
      <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
        2nd menu item
      </a>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const hoverStyle = `after:content-[''] after:w-0 after:absolute after:left-0 after:top-[-10] after:h-0.5  after:bg-blue-500 after:duration-500`

const Header = () => {
  const [showNav, setShowNav] = useState<boolean>(false)

  return (
    <header className="fixed w-full z-20 shadow-sm">
      <div className="border-b border-gray-300   bg-white ">
        <nav className=" mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex items-center">
            <a href="#" className="-m-1.5 p-1.5">
              <img className=" w-[35px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png" alt="" />
            </a>
            <Link href="/" className="ml-2 font-bold font-mono">ThaiDevShop</Link>
          </div>

          <div className="flex lg:hidden">
            <button onClick={()=>setShowNav(true)} type="button" className="-m-2.5 hover:bg-gray hover:rounded-full cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex items-center rounded-md border-gray-200 bg-gray-100 w-1/3">
            <div className="relative pl-3.5 py-2">
              <Dropdown menu={{ items }} placement="top" trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space >
                    Click me
                    <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div className="border-l border-gray-300 px-2 ml-2 flex-1">
              <Input size="small" placeholder="large size" className="h-full " variant="borderless" suffix={<Search color="#aaa" size={20} />} />
            </div>

          </div>

          <div className="hidden gap-3 lg:flex lg:justify-end  items-center ">
            <PhoneCall className="text-primary" size={25}></PhoneCall>
            <div>
              <p className="text-gray-500 text-xs">24/7 SUPPORT</p>
              <p className="font-bold ">0123456789</p>
            </div>
          </div>
          <div className="hidden gap-2 lg:flex lg:justify-end items-center">
            <User className="text-primary" size={25}></User>
            <div>
              <p className="text-gray-500  text-xs uppercase">Account</p>
              <HoverLink text="Log in" link="login" type="medium"></HoverLink>
            </div>
            <div onClick={() => { redirect('/cart') }} className="relative">
              <ShoppingCart size={25} className="hover:text-blue-500 cursor-pointer text-primary ml-2"></ShoppingCart>
              <div className="absolute top-[-5] w-3.5 h-3.5 text-[10px] text-center right-[-5] bg-blue-600 text-white rounded-full">1</div>
            </div>
            <div >
              <p className="text-gray-500 text-xs text-end uppercase">Cart</p>
              <p className="font-bold text-end">$100</p>
            </div>
          </div>
        </nav>
        <MobileHeader showNav={showNav} setShowNav={setShowNav}></MobileHeader>
      </div>
      <div className="w-full bg-white px-20">
        <nav className=" mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
          <div >
            <Link href={'/'} className={`mr-5 relative ${hoverStyle} hover:after:w-full text-dark font-semibold`}>Home</Link>
            <Link href={'/shop'} className={`mr-5 relative ${hoverStyle} hover:after:w-full text-dark font-light`}>Shop</Link>
            <Link href={'/contact'} className={`mr-5 relative ${hoverStyle} hover:after:w-full text-dark font-light`}>Contact</Link>
            <Dropdown className={`mr-2 relative ${hoverStyle} hover:after:w-full`} menu={{ items }} placement="top" >
              <a onClick={(e) => e.preventDefault()}>
                <Space size={0} className="text-dark font-light">
                  About
                  <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </Space>
              </a>
            </Dropdown>
         
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer text-dark font-light"><Clock size={20} />Recently viewed</div>
            <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer text-dark font-light"><Heart size={20} />Wishlist</div>
          </div>
        </nav>
      </div>
    </header>

  );
}

export default Header;