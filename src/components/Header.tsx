'use client'

import { Dropdown, Input, MenuProps, Space } from "antd";
import { ChevronDown, Clock, Heart, PhoneCall, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import HoverLink from "./HoverLink";

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
              <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <Link href="/" className="ml-2 font-bold font-mono">ThaiDevShop</Link>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
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
          <Link href={'/cart'}>
          <div className="hidden gap-2 lg:flex lg:justify-end items-center">
            <User className="text-primary" size={25}></User>
            <div>
              <p className="text-gray-500  text-xs uppercase">Account</p>
              <HoverLink text="Log in" link="login" type="medium"></HoverLink>
            </div>
            <div className="relative">
              <ShoppingCart size={25} className="text-primary ml-2"></ShoppingCart>
              <div className="absolute top-[-5] w-3.5 h-3.5 text-[10px] text-center right-[-5] bg-blue-600 text-white rounded-full">1</div>
            </div>
            <div >
              <p className="text-gray-500 text-xs text-end uppercase">Cart</p>
              <p className="font-bold text-end">$100</p>
            </div>
          </div>
          </Link>

        </nav>
        {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="-mx-3">
                    <button type="button" className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" aria-controls="disclosure-1" aria-expanded="false">
                      Product

                      <svg className="size-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="mt-2 space-y-2" id="disclosure-1">
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Analytics</a>
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Engagement</a>
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Security</a>
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Integrations</a>
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Automations</a>
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Watch demo</a>
                      <a href="#" className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50">Contact sales</a>
                    </div>
                  </div>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
                </div>
                <div className="py-6">
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white px-20">
        <nav className=" mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
          <div >
            <Link href={'/'} className={`mr-5 relative ${hoverStyle} hover:after:w-full`}>Home</Link>
            <Link href={'/shop'} className={`mr-5 relative ${hoverStyle} hover:after:w-full `}>Shop</Link>
            <Dropdown className={`mr-2 relative ${hoverStyle} hover:after:w-full`} menu={{ items }} placement="top" >
              <a onClick={(e) => e.preventDefault()}>
                <Space size={0} >
                  Click me
                  <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </Space>
              </a>
            </Dropdown>
            <Dropdown className="pr-2" menu={{ items }} placement="top" >
              <a onClick={(e) => e.preventDefault()}>
                <Space size={0} >
                  Click me
                  <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </Space>
              </a>
            </Dropdown>
            <Dropdown menu={{ items }} placement="top" >
              <a onClick={(e) => e.preventDefault()}>
                <Space size={0}>
                  Click me
                  <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Clock size={20} />Recently viewed</div>
            <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"><Heart size={20} />Wishlist</div>
          </div>
        </nav>
      </div>
    </header>

  );
}

export default Header;