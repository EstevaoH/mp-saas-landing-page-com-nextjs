import { api } from "@/services/api";
import { ProductPriceProps, ProductProps } from "@/types/product";

export function useSignature() {
    async function getProductsPrices() {
        const { data: response } = await api.get(`prices`);

        return response.data.reduce(
            (acc: ProductPriceProps[], item: ProductPriceProps) => {
                if (item.active) {
                    return [
                        ...acc,
                        {
                            id_price: item.id,
                            amount: item.unit_amount,
                            product_id: item.product,
                        },
                    ];
                }

                return acc;
            },
            []
        );
    }
    async function getProductsFormatted(productsPrices: ProductProps[]) {

        return await productsPrices.reduce(
            async (promisedAcc: any, item: ProductProps) => {
                const { data } = await api.get(`products/${item.product_id}`);
                const acc = await promisedAcc;

                return [
                    {
                        id: item.product_id,
                        currency: "BRL",
                        price_id: item.id_price,
                        name: data.name,
                        price: item.amount,
                        image: data.images[0],
                    },
                    ...acc,
                ];
            },
            []
        );
    }
}