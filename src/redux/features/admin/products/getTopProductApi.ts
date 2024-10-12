import { baseApi } from "../../../api/baseApi";

const getTopProductApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getTopProduct: builder.query({
            query : () => ({
                url : 'product/top',
                method: 'GET',
            }),
            keepUnusedDataFor:5
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetTopProductQuery} = getTopProductApi as any;