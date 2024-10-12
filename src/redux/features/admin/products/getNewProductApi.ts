import { baseApi } from "../../../api/baseApi";

const getNewProductApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getNewProduct: builder.query({
            query : () => ({
                url : 'product',
                method: 'GET',
            }),
        keepUnusedDataFor:5
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetNewProductQuery} = getNewProductApi as any;