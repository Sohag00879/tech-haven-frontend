import { baseApi } from "../../../api/baseApi";

const getCategoriesApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getCategories: builder.query({
            query : () => ({
                url : `category/all-categories`,
                method: 'GET',
            }),
            providesTags:['Category'],
            keepUnusedDataFor:5
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetCategoriesQuery} = getCategoriesApi as any;