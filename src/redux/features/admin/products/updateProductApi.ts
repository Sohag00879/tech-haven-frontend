import { baseApi } from "../../../api/baseApi";

const updateProductApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       updateProduct: builder.mutation({
            query : ({productId,formData}) => ({
                url : `product/${productId}`,
                method: 'PUT',
                body:formData
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useUpdateProductMutation} = updateProductApi as any;