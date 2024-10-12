import { baseApi } from "../../api/baseApi";

const getOrderDetailsApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getOrderDetails: builder.query({
            query : (id) => ({
                url : `orders/${id}`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetOrderDetailsQuery} = getOrderDetailsApi as any;