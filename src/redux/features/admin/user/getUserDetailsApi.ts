import { baseApi } from "../../../api/baseApi";

const getUserDetailsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getUserDetails: builder.query({
            query : (id) => ({
                url : `/users/${id}`,
                method: 'GET',
            }),
            providesTags:['Profile']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetUserDetailsQuery} = getUserDetailsApi as any;