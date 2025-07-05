export interface IProduct {
    id: number,
    product_name: string,
    price: number,
    stock: number,
    discountedPrice?: number | null,
    description?: string | null,
    category?: ICategory | null,
    images?: IProductImage[] | null,
}


export interface ICategory {
    id: number,
    category_name: string,
}

export interface IProductImage {
    id: number,
    image_url: string,
    is_main: boolean,
}

