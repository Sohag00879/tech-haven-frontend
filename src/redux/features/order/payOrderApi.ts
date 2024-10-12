import { baseApi } from "../../api/baseApi";

const payOrderApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       payOrder: builder.mutation({
            query : (orderId) => ({
                url : `orders/${orderId}/pay`,
                method: 'PUT',
            }),
            invalidatesTags:['PaymentStatus']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {usePayOrderMutation} = payOrderApi as any;