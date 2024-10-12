import { baseApi } from "../../api/baseApi";

const getTotalSalesByDateApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getTotalSalesByDate: builder.query({
            query : () => ({
                url : `orders/total-sales-by-date`,
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetTotalSalesByDateQuery} = getTotalSalesByDateApi as any;