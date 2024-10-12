import { baseApi } from "../../api/baseApi";

const updateOfferApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       updateOffer: builder.mutation({
            query : (updatedData) => ({
                url : `offer/${updatedData.offerId}`,
                method: 'PUT',
                body:updatedData.data
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useUpdateOfferMutation} = updateOfferApi as any;