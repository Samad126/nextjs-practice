import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQueryWithReauth } from "./baseQueryWithReauth";

interface BalanceResponse {
  // Define the expected response structure
  id: number;
  amount: number;
  currency: string;
}

interface UpdateBalanceRequest {
  // Define the request payload structure
  amount: number;
  accountId: number;
}

export const protectedApiSlice = createApi({
  baseQuery: authBaseQueryWithReauth,
  reducerPath: "protectedApiSlice",
  tagTypes: ["Balance"],
  endpoints: (builder) => ({
    getAllBalance: builder.query<BalanceResponse[], Record<string, any>>({
      query: (params) => ({
        url: "/accounting/company-balance/",
        method: "GET",
        params,
      }),
      providesTags: ["Balance"],
      keepUnusedDataFor: 1,
    }),
    updateBalance: builder.mutation<void, UpdateBalanceRequest>({
      query: (credentials) => ({
        url: "/accounting/change-liabilities/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Balance"],
    }),
  }),
});

export const { useGetAllBalanceQuery, useUpdateBalanceMutation } = protectedApiSlice;
