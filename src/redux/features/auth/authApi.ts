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
        })
    }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;