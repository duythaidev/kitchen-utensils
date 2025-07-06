export interface IProduct {
    id: number,
    product_name: string,
    price: number,
    stock: number,
    discounted_price?: number | null,
    description?: string | null,
    category?: ICategory | null,
    images?: IProductImage[] | null,
}

export interface ICartItem {
    id: number,
    product_id: number,
    product: IProduct,
    quantity: number,
    cart_id: number,
}

// [
//     {
//         "id": 1,
//         "product_id": 1,
//         "product": {
//             "id": 1,
//             "product_name": "asdasda",
//             "price": 1001,
//             "stock": 100,
//             "discounted_price": 6,
//             "description": "asjdasdhjad",
//             "category_id": 3,
//             "images": [
//                 {
//                     "id": 39,
//                     "image_url": "https://i.ibb.co/vrCLs3L/e0cf59156280.jpg",
//                     "product_id": 1,
//                     "is_main": false
//                 },
//                 {
//                     "id": 40,
//                     "image_url": "https://i.ibb.co/8DyVHjqb/b361b72e146b.jpg",
//                     "product_id": 1,
//                     "is_main": true
//                 }
//             ],
//             "created_at": "2025-07-04T02:23:54.596Z",
//             "updated_at": "2025-07-05T06:47:22.000Z"
//         },
//         "quantity": 214,
//         "cart_id": 1
//     }
// ]

export interface ICategory {
    id: number,
    category_name: string,
}

export interface IProductImage {
    id: number,
    image_url: string,
    is_main: boolean,
}

