import { baseApi } from "../../api/baseApi";

const getTotalOrdersApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getTotalOrders: builder.query({
            query : () => ({
                url : `orders/total-orders`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetTotalOrdersQuery} = getTotalOrdersApi as any;