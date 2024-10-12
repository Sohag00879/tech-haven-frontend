import { baseApi } from "../../../api/baseApi";

const uploadProductImageApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       uploadProductImage: builder.mutation({
            query : (data) => ({
                url : 'upload',
                method: 'POST',
                body:data
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useUploadProductImageMutation} = uploadProductImageApi as any;