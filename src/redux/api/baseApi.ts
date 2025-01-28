import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
    tagTypes: ["books", "user"],
    endpoints: () => ({}),
});

export default baseApi;
