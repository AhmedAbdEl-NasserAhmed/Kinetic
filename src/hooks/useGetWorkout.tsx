import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useGetWorkout({ userId, workoutCategory }) {
  if (!userId) return;

  try {
    const blogsRef = query(
      collection(db, "workouts"),
      where("userId", "==", userId),
      where("workoutCategory", "==", workoutCategory)
    );

    const querySnapShot = await getDocs(blogsRef);

    const workoutProgram = [];
    querySnapShot?.forEach((program) => {
      workoutProgram.push({
        id: program.id,
        ...program.data(),
      });
    });
    return { data: workoutProgram };
  } catch (err) {
    toast.error(err.message);
  }
}

export default useGetWorkout;
