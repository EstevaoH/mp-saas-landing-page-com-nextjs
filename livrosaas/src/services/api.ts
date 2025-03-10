import axios from "axios";

const configValue: string = process.env.NEXT_STRIPE_API_KEY_SECRET as string;

export const api = axios.create({
    headers: {
        Authorization: `Bearer ${configValue}`
    },
    baseURL: "https://api.stripe.com/v1/"
});