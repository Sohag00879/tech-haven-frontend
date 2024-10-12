import { baseApi } from "../../../api/baseApi";

const getUsersApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getUsers: builder.query({
            query : () => ({
                url : `/users`,
                method: 'GET',
            }),
            providesTags:['User'],
            keepUnusedDataFor:5
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetUsersQuery} = getUsersApi as any;