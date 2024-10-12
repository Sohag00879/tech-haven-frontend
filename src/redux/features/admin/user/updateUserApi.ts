import { baseApi } from "../../../api/baseApi";

const updateUserApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        updateUser: builder.mutation({
            query : (data) => ({
                url : `/users/${data.userId}`,
                method: 'PUT',
                body:data
            }),
            invalidatesTags:['User','Profile']
            
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useUpdateUserMutation} = updateUserApi as any;