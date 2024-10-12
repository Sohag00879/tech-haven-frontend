import { baseApi } from "../../api/baseApi";

const registerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       register: builder.mutation({
            query : (userInfo) => ({
                url : '/users',
                method: 'POST',
                body : userInfo,
            })
        })
    }),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useRegisterMutation} = registerApi as any;

