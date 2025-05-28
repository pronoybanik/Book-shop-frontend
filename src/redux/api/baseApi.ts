import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://book-shop-serversite.vercel.app/api" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
    tagTypes: ["books", "user", "order", "blog"],
    endpoints: () => ({}),
});

export default baseApi;
