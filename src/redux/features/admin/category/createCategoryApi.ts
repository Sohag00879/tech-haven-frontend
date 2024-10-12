import { baseApi } from "../../../api/baseApi";

const createCategoryApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createCategory: builder.mutation({
            query : (newCategory) => ({
                url : `category`,
                method: 'POST',
                body:newCategory
            }),
            invalidatesTags:['Category']
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useCreateCategoryMutation} = createCategoryApi as any;