import baseApi from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/user/login",
                method: "POST",
                body: userInfo
            })
        }),
        registration: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                body: userInfo
            })
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
    }),
});

export const { useLoginMutation, useRegistrationMutation, useGetAllUserQuery, useUpdateUserMutation } = authApi;