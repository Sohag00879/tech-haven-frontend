import { baseApi } from "../../../api/baseApi";

const updateCategoryApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       updateCategory: builder.mutation({
            query : (updatingData) => ({
                url : `category/${updatingData.categoryId}`,
                method: 'PUT',
                body:updatingData
            }),
            invalidatesTags:['Category']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useUpdateCategoryMutation} = updateCategoryApi as any;