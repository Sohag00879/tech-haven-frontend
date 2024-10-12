import { baseApi } from "../../../api/baseApi";

const deleteCategoryApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       deleteCategory: builder.mutation({
            query : (categoryId) => ({
                url : `category/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Category']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useDeleteCategoryMutation} = deleteCategoryApi as any;