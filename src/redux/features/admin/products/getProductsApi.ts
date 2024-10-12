import { baseApi } from "../../../api/baseApi";

const getProductsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getProducts: builder.query({
            query : ({keyword}) => ({
                url : 'product',
                method: 'GET',
                params:{keyword}
            }),
            keepUnusedDataFor:5,
            providesTags:['Products']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetProductsQuery} = getProductsApi as any;