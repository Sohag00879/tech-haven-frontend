import { baseApi } from "../../api/baseApi";

const deleteOfferApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       deleteOffer: builder.mutation({
            query : (offerId) => ({
                url : `offer/${offerId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Products'],
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useDeleteOfferMutation} = deleteOfferApi as any;