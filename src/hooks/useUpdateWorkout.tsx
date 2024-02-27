import { addDoc, collection } from "firebase/firestore";

import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useUpdateWorkout(data) {
  try {
    await addDoc(collection(db, "workouts"), {
      ...data,
    });
    return { data };
  } catch (err) {
    toast.error(err);
  }
}

export default useUpdateWorkout;
