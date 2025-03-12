import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./baseQueryWithReauth";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    access: string;
    refresh: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    id: number;
    username: string;
    email: string;
}

export const publicApiSlice = createApi({
    baseQuery: publicBaseQuery,
    reducerPath: "publicApiSlice",
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/users/token/",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: [],
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: "/users/register/",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: []
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = publicApiSlice;