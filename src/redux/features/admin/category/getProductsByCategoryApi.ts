import { baseApi } from "../../../api/baseApi";

const getProductsByCategoryApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getProductsByCategory: builder.query({
            query : (category) => ({
                url : `product/productByCategory/${category}`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetProductsByCategoryQuery} = getProductsByCategoryApi as any;