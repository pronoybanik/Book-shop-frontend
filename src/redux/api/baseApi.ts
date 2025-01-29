import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://book-shop-serversite.vercel.app/api" }),
    tagTypes: ["books", "user", "order"],
    endpoints: () => ({}),
});

export default baseApi;
