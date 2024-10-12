import { baseApi } from "../../../api/baseApi";

const deleteProductApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       deleteProduct: builder.mutation({
            query : (productId) => ({
                url : `product/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Products'],
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useDeleteProductMutation} = deleteProductApi as any;