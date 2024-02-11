import toast from "react-hot-toast";
import { auth } from "../firebase/firebase.js";

import { signOut } from "firebase/auth";

export async function userSignOut() {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.message);
  }
}
