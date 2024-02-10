import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "./firebase/auth";

export async function signUp(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
}
