import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useUpdateWorkout({ id, data }) {
  const updatedWorkout = doc(db, "workouts", id);

  try {
    await updateDoc(updatedWorkout, {
      ...data,
    });
    toast.success("your workout has been updated");
    return { data };
  } catch (err) {
    toast.error(err);
  }
}
