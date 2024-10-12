import { baseApi } from "../../../api/baseApi";

const deleteUserApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       deleteUser: builder.mutation({
            query : (userId) => ({
                url : `users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['User']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useDeleteUserMutation} = deleteUserApi as any;