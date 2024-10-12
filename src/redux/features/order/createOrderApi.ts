import { baseApi } from "../../api/baseApi";

const createOrderApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createOrder: builder.mutation({
            query : (order) => ({
                url : 'orders',
                method: 'POST',
                body:order
            }),
            // invalidatesTags:['Products']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useCreateOrderMutation} = createOrderApi as any;