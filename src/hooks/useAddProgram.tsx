import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useAddProgram(data) {
  console.log(data);

  try {
    await setDoc(doc(db, "programs", data.id), {
      ...data,
    });
    toast.success("congratulations your program has been added");
    return { data };
  } catch (err) {
    toast.error(err);
  }
}
