import { baseApi } from "../../../api/baseApi";

const createReviewApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createReview: builder.mutation({
            query : (data) => ({
                url : `product/${data.productId}/reviews`,
                method: 'PUT',
                body:data
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useCreateReviewMutation} = createReviewApi as any;