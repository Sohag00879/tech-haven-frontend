import { baseApi } from "../../api/baseApi";

const getTotalSalesApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getTotalSales: builder.query({
            query : () => ({
                url : `orders/total-sales`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetTotalSalesQuery} = getTotalSalesApi as any;