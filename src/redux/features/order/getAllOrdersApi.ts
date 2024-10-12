import { baseApi } from "../../api/baseApi";

const getAllOrdersApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllOrders: builder.query({
            query : () => ({
                url : `orders`,
                method: 'GET',
            }),
            providesTags:['Order']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetAllOrdersQuery} = getAllOrdersApi as any;