'use client'

import Link from "next/link"
import { X, ShoppingCart, ShoppingBag, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { ICategory } from "@/types"
import HoverLink from "../Custom/HoverLink"

interface IProps {
  showNav: boolean
  setShowNav: (show: boolean) => void
  categories?: ICategory[]
}

const MobileHeader = ({ showNav, setShowNav, categories = [] }: IProps) => {
  const { data: session } = useSession()

  return (
    <div className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ${showNav ? "translate-x-0" : "translate-x-full"} transform`}>
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
          <span className="font-bold font-mono">ThaiDevShop</span>
        </Link>
        <button onClick={() => setShowNav(false)} className="p-2 rounded-full hover:bg-gray-100">
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="px-6 py-4 space-y-4">
        <Link href="/" className="block text-base font-medium text-gray-800 hover:text-primary">Home</Link>
        <Link href="/shop" className="block text-base font-medium text-gray-800 hover:text-primary">Shop</Link>
        <Link href="/contact" className="block text-base font-medium text-gray-800 hover:text-primary">Contact</Link>

        {session?.user?.role === "admin" && (
          <div className="pt-2">
            <p className="block text-base font-medium text-gray-800 hover:text-primary">Admin</p>
            <Link href="/admin" className="block text-sm text-gray-700 hover:text-primary">Dashboard</Link>
            <Link href="/admin/users" className="block text-sm text-gray-700 hover:text-primary">Users</Link>
            <Link href="/admin/products" className="block text-sm text-gray-700 hover:text-primary">Products</Link>
            <Link href="/admin/orders" className="block text-sm text-gray-700 hover:text-primary">Orders</Link>
          </div>
        )}

        {session?.user && (
          <>
            <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-primary">
              <ShoppingCart size={18} /> Cart
            </Link>
            <Link href="/order" className="flex items-center gap-2 text-gray-700 hover:text-primary">
              <ShoppingBag size={18} /> Orders
            </Link>
            <Link href="/profile" className="block mt-4 text-base font-medium text-primary">{session.user.user_name || "Profile"}</Link>
          </>
        )}

        {!session?.user && (
          <Link href="/login" className="block mt-4 text-base font-medium text-primary">Log in</Link>
        )}

        <div className="hidden gap-2 lg:flex lg:justify-end items-center">
          ashjdgahdjhg
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
      </div>
    </div>
  )
}

export default MobileHeader
