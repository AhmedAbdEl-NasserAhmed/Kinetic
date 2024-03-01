import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useGetPrograms } from "../hooks/useGetPrograms";

export const programsApi = createApi({
  reducerPath: "programsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["programs"],
  endpoints: (builder) => ({
    fetchPrograms: builder.query({
      providesTags: ["programs"],
      queryFn: useGetPrograms,
    }),
  }),
});

export const { useFetchProgramsQuery } = programsApi;
