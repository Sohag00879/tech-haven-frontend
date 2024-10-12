import { baseApi } from "../../../api/baseApi";

const getFlashSaleProducstApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getFlashSaleProducts: builder.query({
            query : () => ({
                url : 'product/flash-sale',
                method: 'GET',
            }),
            providesTags:['Products']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetFlashSaleProductsQuery} = getFlashSaleProducstApi as any;