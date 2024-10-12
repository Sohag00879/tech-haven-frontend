import { baseApi } from "../../api/baseApi";

const loginApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       login: builder.mutation({
            query : (userInfo) => ({
                url : '/users/auth',
                method: 'POST',
                body : userInfo,
            })
        })
    }),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useLoginMutation} = loginApi as any;

