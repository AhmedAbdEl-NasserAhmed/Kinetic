import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export async function useDeleteProgram(id: string) {
  console.log(id);

  try {
    await deleteDoc(doc(db, "programs", id));

    toast.success("Program successfully deleated");

    return { data: "ok" };
  } catch (err) {
    toast.error(err.message);
  }
}
