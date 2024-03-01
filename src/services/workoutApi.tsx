import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import useGetWorkout from "../hooks/useGetWorkout";
import useUpdateWorkout from "../hooks/useUpdateWorkout";

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["workouts"],
  endpoints: (builder) => ({
    fetchWorkouts: builder.query({
      queryFn: useGetWorkout,
      providesTags: ["workouts"],
    }),
    addWorkoutProgram: builder.mutation({
      queryFn: useUpdateWorkout,
      invalidatesTags: ["workouts"],
    }),
  }),
});

export const { useFetchWorkoutsQuery, useAddWorkoutProgramMutation } =
  workoutApi;
