import { baseApi } from "../../../api/baseApi";

const getProductDetailsApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getProductDetails: builder.query({
            query : (productId) => ({
                url : `product/${productId}`,
                method: 'GET',
            }),
            keepUnusedDataFor:5
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetProductDetailsQuery} = getProductDetailsApi as any;