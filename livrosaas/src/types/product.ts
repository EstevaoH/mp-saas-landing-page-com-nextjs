export interface ProductPriceProps {
    id: string;
    active: boolean;
    product: string;
    unit_amount: number;
    images: string;
}

export interface ProductProps {
    id_price: string;
    product_id: string;
    amount: number;
}

export interface ProductFormattedProps {
    id: string;
    price_id: string;
    price: number;
    name: string;
    image: string;
    currency: string;
}

export interface Products {
    products: ProductFormattedProps[];
}