import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to update order status
    updateOrderStatus: builder.mutation({
      query: ({ orderId, isPaid, isDelivered }) => ({
        url: `orders/${orderId}/status`,
        method: 'PUT',
        body: { isPaid, isDelivered },
      }),
      // Optionally invalidate order data so the UI refreshes after the update
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useUpdateOrderStatusMutation } = orderApi as never;