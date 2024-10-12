import { baseApi } from "../../../api/baseApi";

const getProductsBySearchApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getProductsBySearch: builder.mutation({
            query : (searchQuery) => ({
                url : `product/search/search-products?query=${searchQuery}`,
                method: 'POST',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetProductsBySearchMutation} = getProductsBySearchApi as any;