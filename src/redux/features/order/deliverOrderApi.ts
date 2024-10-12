import { baseApi } from "../../api/baseApi";

const deliverOrderApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       deliverOrder: builder.mutation({
            query : (orderId) => ({
                url : `orders/${orderId}/deliver`,
                method: 'PUT',
            }),
            invalidatesTags:['OrderStatus']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useDeliverOrderMutation} = deliverOrderApi as any;