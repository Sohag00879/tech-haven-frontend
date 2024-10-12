import { baseApi } from "../../../api/baseApi";

const createProductApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createProduct: builder.mutation({
            query : (productData) => ({
                url : 'product',
                method: 'POST',
                body:productData
            }),
            // invalidatesTags:['Products']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useCreateProductMutation} = createProductApi as any;