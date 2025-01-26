import baseApi from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => ({
                url: "/products",
                method: "GET"
            })
        }),
    }),
});

export const { useGetAllProductQuery } = authApi;