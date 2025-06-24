export interface IProduct {
    id: number,
    name: string,
    price: number,
    discountedPrice?: number,
    description: string,
    quantity: number,
    category: string,
    image: string
}