import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useGetPrograms() {
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
}
