import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

export const programsApi = createApi({
  reducerPath: "programsApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchPrograms: builder.query({
      async queryFn() {
        try {
          const blogsRef = collection(db, "programs");
          const querySnapShot = await getDocs(blogsRef);
          const programs = [];
          querySnapShot?.forEach((program) => {
            programs.push({
              id: program.id,
              ...program.data(),
            });
          });
          return { data: programs };
        } catch (err) {
          toast.error(err.message);
        }
      },
    }),
  }),
});

export const { useFetchProgramsQuery } = programsApi;
