import { baseApi } from "../../../api/baseApi";

const getOfferProductsApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getOfferProducts: builder.query({
            query : (percentage) => ({
                url : `product/offer-products/${percentage}`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetOfferProductsQuery} = getOfferProductsApi as any;