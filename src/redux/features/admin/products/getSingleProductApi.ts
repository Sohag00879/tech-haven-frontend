import { baseApi } from "../../../api/baseApi";

const getSingleProductApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getSingleProduct: builder.query({
            query : (productId) => ({
                url : `product/${productId}`,
                method: 'GET',
            }),
            providesTags:(productId)=>[
                {type:'Products',id:productId}
            ]
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetSingleProductQuery} = getSingleProductApi as any;