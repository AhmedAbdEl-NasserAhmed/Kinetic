import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import useGetWorkout from "../hooks/useGetWorkout";
import useUpdateWorkout from "../hooks/useUpdateWorkout";

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchWorkouts: builder.query({
      queryFn: useGetWorkout,
    }),
    addWorkoutProgram: builder.mutation({
      queryFn: useUpdateWorkout,
    }),
  }),
});

export const { useFetchWorkoutsQuery, useAddWorkoutProgramMutation } =
  workoutApi;
