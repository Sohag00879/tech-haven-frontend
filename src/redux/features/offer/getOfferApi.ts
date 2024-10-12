import { baseApi } from "../../api/baseApi";

const getOfferApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getOffer: builder.query({
            query : () => ({
                url : 'offer',
                method: 'GET',
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetOfferQuery} = getOfferApi as any;