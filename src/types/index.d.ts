
export interface IProduct {
    id: number,
    product_name: string,
    price: number,
    stock: number,
    discounted_price?: number | null,
    description?: string | null,
    category?: ICategory | null,
    images?: IProductImage[] | null,
    reviews?: IReview[]
}

export interface IReview {
    id: number,
    rating: number,
    comment: string,
    user: IUser,
}

export interface ICartItem {
    id: number,
    product_id: number,
    product: IProduct,
    quantity: number,
    cart_id: number,
}

export interface IOrder {
    id: number,
    user_id: number,
    user: IUser,
    created_at: Date,
    address: string,
    total_price: number,
    status: 'pending' | 'processing' | 'delivered' | 'cancelled',
    orderDetails: IOrderDetail[],
}

export interface IOrderDetail {
    id: number,
    order_id: number,
    product_id: number,
    product: IProduct,
    quantity: number,
    price: number, // price of product at the time of order
}

export interface IUser {
    id: number,
    user_name: string | null,
    email: string,
    phone: string | null,
    address: string | null,
    role: string,
    is_active: boolean,
    avatar_url: string,
}

export interface ICategory {
    id: number,
    category_name: string,
    image_url: string,
}

export interface IProductImage {
    id: number,
    image_url: string,
    is_main: boolean,
}

export interface IPagination {
    page: number,
    limit: number,
    total: number,
}
