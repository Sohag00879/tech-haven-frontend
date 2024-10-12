import { baseApi } from "../../../api/baseApi";

const getFilteredProductsApi= baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getFilteredProducts: builder.query({
            query : ({checked,radio}) => ({
                url : 'product/filtered-products',
                method: 'POST',
                body:{checked,radio}
            }),
        })
    }),
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const {useGetFilteredProductsQuery} = getFilteredProductsApi as any;