import { baseApi } from "../../api/baseApi";

const createOfferApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createOffer: builder.mutation({
            query : (offerData) => ({
                url : 'offer',
                method: 'POST',
                body:offerData
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useCreateOfferMutation} = createOfferApi as any;