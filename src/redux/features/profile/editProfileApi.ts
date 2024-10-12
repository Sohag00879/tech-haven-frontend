import { baseApi } from "../../api/baseApi";

const editProfileApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       editProfile: builder.mutation({
            query : (userInfo) => ({
                url : '/users/profile',
                method: 'PUT',
                body : userInfo,
            })
        })
    }),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useEditProfileMutation} = editProfileApi as any;