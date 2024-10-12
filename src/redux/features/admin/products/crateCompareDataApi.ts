import { baseApi } from "../../../api/baseApi";

const createCompareDataApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createCompareData: builder.mutation({
            query : (compareData) => ({
                url : `product/${compareData.productId}/compare`,
                method: 'PUT',
                body:compareData.data
            }),
            // invalidatesTags:['Products']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useCreateCompareDataMutation} = createCompareDataApi as any;