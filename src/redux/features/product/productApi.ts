import baseApi from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => ({
                url: "/products",
                method: "GET"
            })
        }),
        createProduct: builder.mutation({
            query: (BookData) => ({
                url: "/products",
                method: "POST",
                body: BookData
            })
        }),
    }),
});

export const { useGetAllProductQuery, useCreateProductMutation } = authApi;