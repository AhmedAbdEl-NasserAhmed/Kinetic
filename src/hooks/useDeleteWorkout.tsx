import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useDeleteWorkout(id: string) {
  try {
    await deleteDoc(doc(db, "workouts", id));

    toast.success("workout successfully deleated");

    return { data: "ok" };
  } catch (err) {
    toast.error(err.message);
  }
}
