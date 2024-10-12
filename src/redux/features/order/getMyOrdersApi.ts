import { baseApi } from "../../api/baseApi";

const getMyOrdersApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getMyOrders: builder.query({
            query : (userId) => ({
                url : `orders/mine/${userId}`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetMyOrdersQuery} = getMyOrdersApi as any;