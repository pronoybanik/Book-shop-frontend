import baseApi from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllProduct: builder.query({
        //     query: ({ search, filter, sort, page, limit }) => ({
        //         url: '/products',
        //         method: "GET",
        //         params: {
        //             search,
        //             filter,
        //             sort,
        //             'paginate[page]': page,
        //             'paginate[limit]': limit,
        //         },
        //     }),
        // }),
        getAllProduct: builder.query({
            query: () => ({
                url: '/products',
                method: "GET"
            }),
            providesTags: ["books"]
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            providesTags: ["books"]
        }),
        createProduct: builder.mutation({
            query: (BookData) => ({
                url: "/products",
                method: "POST",
                body: BookData,
            }),
            invalidatesTags: ["books"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["books"]
        }),
    }),
});

export const { useGetAllProductQuery, useCreateProductMutation, useDeleteProductMutation, useGetSingleUserQuery } = authApi;