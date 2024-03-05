import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { useAddWorkout } from "../hooks/useAddWorkout";
import useGetWorkout from "../hooks/useGetWorkout";
import { useDeleteWorkout } from "../hooks/useDeleteWorkout";

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
      queryFn: useAddWorkout,
      invalidatesTags: ["workouts"],
    }),
    deleteWorkout: builder.mutation({
      queryFn: useDeleteWorkout,
      invalidatesTags: ["workouts"],
    }),
  }),
});

export const {
  useFetchWorkoutsQuery,
  useAddWorkoutProgramMutation,
  useDeleteWorkoutMutation,
} = workoutApi;
