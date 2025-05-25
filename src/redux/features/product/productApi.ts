import { TGetAllProductsQuery } from "../../../types/GetAllProductsQuery";
import baseApi from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query<any, TGetAllProductsQuery>({
            query: ({
                searchTerm = "",
                sort = "",
                category = "",
                page = 1,
                limit = 6,
                priceMin = "",
                priceMax = "",
            } = {}) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (sort) params.append("sort", sort);
                if (category) params.append("category", category);
                if (priceMin) params.append("priceMin", priceMin);
                if (priceMax) params.append("priceMax", priceMax);
                params.append("page", page.toString());
                params.append("limit", limit.toString());

                return {
                    url: `/products?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["books"],
        }),






        getLimitProduct: builder.query({
            query: () => ({
                url: '/products?sort=1&limit=6',
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

export const { useGetAllProductQuery, useCreateProductMutation, useDeleteProductMutation, useGetSingleUserQuery, useGetLimitProductQuery } = authApi;