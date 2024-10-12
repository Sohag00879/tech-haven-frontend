// import { baseApi } from "../../api/baseApi";

// const getTotalOrdersByTimeApi= baseApi.injectEndpoints({
//     endpoints : (builder) => ({
//        getTotalOrdersByTime: builder.query({
//             query : (timeFrame) => ({
//                 url : `/orders/products/summary/${timeFrame}`,
//                 method: 'GET',
//             }),
//         })
//     }),
// })
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const {useGetTotalOrdersByTimeQuery} = getTotalOrdersByTimeApi as any;

import { baseApi } from "../../api/baseApi";

const getTotalOrdersByTimeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalOrdersByTime: builder.query({
      query: ({ timeFrame, page = 1, limit = 10 }) => ({
        url: `/orders/products/summary/${timeFrame}`,
        method: "GET",
        params: { page, limit }, // Send page and limit as query params
      }),
      providesTags:['Order']
    }),
    
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { useGetTotalOrdersByTimeQuery } = getTotalOrdersByTimeApi as any;
