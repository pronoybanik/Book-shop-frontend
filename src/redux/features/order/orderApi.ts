import baseApi from "../../api/baseApi";


const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["order"]
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: "/orders",
                method: "GET"
            }),
            providesTags: ["order"]
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "Delete"
            }),
            invalidatesTags: ["order"]
        }),
    }),
});


export const { useCreateOrderMutation, useGetAllOrderQuery, useDeleteOrderMutation } = orderApi;