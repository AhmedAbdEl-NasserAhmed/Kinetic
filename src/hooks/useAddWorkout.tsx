import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";
import { WorkoutObject } from "../interfaces/interfaces";

export async function useAddWorkout(data: WorkoutObject) {
  try {
    await setDoc(doc(db, "workouts", data.id), {
      ...data,
    });
    return { data };
  } catch (err) {
    toast.error(err);
  }
}
