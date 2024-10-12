import { baseApi } from "../../../api/baseApi";

const getAllProductApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllProduct: builder.query({
            query : () => ({
                url : 'product/allProducts',
                method: 'GET',
            }),
            providesTags:['Products']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetAllProductQuery} = getAllProductApi as any;