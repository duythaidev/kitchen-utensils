'use client'

import Link from "next/link";
import { PhoneCall, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HoverLink from "./Custom/HoverLink";
import MobileHeader from "./Mobile/MobileHeader";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu"
import { Input } from "@/components/shadcn/input";
import { Separator } from "@/components/shadcn/separator";
import { useRouter } from "nextjs-toploader/app";
import { ICategory } from "@/types";


const hoverStyle = `after:content-[''] after:w-0 after:absolute after:left-0 after:top-[-10] after:h-0.5  after:bg-primary after:duration-500`

const Header = ({ categories }: { categories: ICategory[] }) => {
  const { data: session } = useSession()
  const [showNav, setShowNav] = useState<boolean>(false)
  const [stickyMenu, setStickyMenu] = useState<boolean>(false);
  // console.log("header session", session)
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    if (searchRef.current) {
      router.push(`/shop?keyword=${searchRef.current.value}`)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });
  return (
    <header className={`fixed block w-full z-20 border-b border-gray-200 ${stickyMenu && "shadow-sm  border-none"} transition-all`}>
      <div className="border-b border-gray-300   bg-white ">
        <nav className={`mx-auto flex max-w-7xl items-center justify-between transition-all ${stickyMenu ? "p-4" : "p-6"} lg:px-8`} aria-label="Global">
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <img className=" w-[35px]" src="/favicon.ico" alt="" />
            </Link>
            <Link href="/" className="ml-2 font-bold font-mono">ThaiDevShop</Link>
          </div>

          <div className="flex lg:hidden">
            <button onClick={() => setShowNav(true)} type="button" className="-m-2.5 hover:bg-gray hover:rounded-full cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex items-center rounded-md border-gray-200  bg-gray-100 w-1/3">
            <div className="relative pl-3.5 py-2">

              <NavigationMenu >
                <NavigationMenuList >
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="p-0 font-normal cursor-pointer">All Categories</NavigationMenuTrigger>
                    <NavigationMenuContent className="cursor-pointer">
                      <NavigationMenuLink className="w-[100px]" onClick={() => router.push('/shop')}>
                        All Categories
                      </NavigationMenuLink>
                      <Separator></Separator>
                      {categories?.map((category) => (
                        <NavigationMenuLink key={category.id} className="w-[100px]"
                          onClick={() => router.push(`/shop?category=${category.id}`)}>
                          {category.category_name}
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="relative border-l border-gray-300 px-2 ml-2 flex-1">
              <Input type="text" ref={searchRef} className="w-[95%] border-none! bg-gray-100! shadow-none focus-visible:ring-[0px] "
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
                placeholder="Search" />
              <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer" onClick={handleSearch}></Search>
            </div>

          </div>

          <div className="hidden gap-3 lg:flex lg:justify-end  items-center ">
            <PhoneCall className="text-primary" size={25}></PhoneCall>
            <div>
              <p className="text-gray-500 text-xs">24/7 SUPPORT</p>
              <p className=" font-bold hover:text-primary">0985486619</p>
            </div>
          </div>
          <div className="hidden gap-2 lg:flex lg:justify-end items-center">
            {session?.user?.avatar_url ?
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full overflow-hidden">
                <img alt="profile image" className="rounded-full " width={30} height={30} src={session?.user.avatar_url || ''}></img>
              </div>
              :
              <User className="hover:text-primary cursor-pointer text-primary" size={25}></User>
            }
            <div>
              <p className="text-gray-500  text-xs uppercase">Account</p>
              {session?.user ?
                <HoverLink link="/profile" className="text-dark font-medium hover:text-primary">
                  {session?.user.user_name ? ((session?.user.user_name.length > 10) ? session?.user.user_name.slice(0, 10) + '...' : session?.user.user_name) : 'No name'}
                </HoverLink>
                :
                <HoverLink link="/login" className="text-dark font-medium hover:text-primary">
                  Log in
                </HoverLink>
              }
            </div>

          </div>
        </nav>
        <MobileHeader categories={categories} showNav={showNav} setShowNav={setShowNav}></MobileHeader>
      </div>
      <div className="w-full bg-white px-20 hidden md:block">
        <nav className={` mx-auto flex max-w-7xl items-center justify-between  transition-all px-8 ${stickyMenu ? 'py-2 ' : 'py-3'}`} aria-label="Global">
          <div className="flex items-center gap-5">
            <Link href={'/'} className={` inline-block h-[30px] relative ${hoverStyle} hover:after:w-full text-dark font-semibold`}>Home</Link>
            <Link href={'/shop'} className={` inline-block   h-[30px] relative ${hoverStyle} hover:after:w-full text-dark font-light`}>Shop</Link>
            <Link href={'/contact'} className={` inline-block h-[30px] relative ${hoverStyle} hover:after:w-full text-dark font-light`}>Contact</Link>
            {
              session?.user?.role === 'admin' &&
              <div className="inline-block h-[30px]">
                <NavigationMenu className={`inline-block ${hoverStyle} hover:after:w-full text-dark font-light`} >
                  <NavigationMenuList  >
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="cursor-pointer px-0 pb-5 font-light text-[16px] text-dark bg-background hover:bg-background">
                        Admin
                      </NavigationMenuTrigger>
                      <NavigationMenuContent >
                        <NavigationMenuLink className="w-[100px]" href="/admin">Dashboard</NavigationMenuLink>
                        <Separator />
                        <NavigationMenuLink className="w-[100px]" href="/admin/users">Users</NavigationMenuLink>
                        <NavigationMenuLink className="w-[100px]" href="/admin/products">Products</NavigationMenuLink>
                        <NavigationMenuLink className="w-[100px]" href="/admin/orders">Orders</NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>}
          </div>
          {
            session?.user &&
            <div className="flex gap-3">
              <Link href={'/cart'} className={`hover:text-primary transition-all flex items-center gap-2  h-[30px] relative ${hoverStyle} hover:after:w-full text-dark font-light`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="">Cart</span>
              </Link>
              <Link href={'/order'} className={`hover:text-primary transition-all flex items-center gap-2  h-[30px] relative ${hoverStyle} hover:after:w-full text-dark font-light`}>
                <ShoppingBag className="w-5 h-5" />
                <span className="">Orders</span>
              </Link>
            </div>
          }
        </nav>
      </div>
    </header>

  );
}

export default Header;