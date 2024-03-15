import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetPrograms } from "../hooks/useGetPrograms";
import { useAddProgram } from "../hooks/useAddProgram";

export const programsApi = createApi({
  reducerPath: "programsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["programs"],
  endpoints: (builder) => ({
    fetchPrograms: builder.query({
      providesTags: ["programs"],
      queryFn: useGetPrograms,
    }),
    addProgram: builder.mutation({
      queryFn: useAddProgram,
      invalidatesTags: ["programs"],
    }),
  }),
});

export const { useFetchProgramsQuery, useAddProgramMutation } = programsApi;
