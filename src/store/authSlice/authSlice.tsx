import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";

import toast from "react-hot-toast";

const loggedinUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  isAuthenticated: !!loggedinUser?.uid,
  user: loggedinUser || null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const signinUser =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        loginUser({
          uuid: res?.user?.uid,
          displayName: res?.user?.displayName,
          email: res.user.email,
        })
      );

      const localStorageCurrentUser = JSON.stringify(res.user);

      localStorage.setItem("currentUser", localStorageCurrentUser);
    } catch (err) {
      toast.error(err.message);
    }
  };

export const signupUser =
  (email: string, password: string, displayName: string) =>
  async (dispatch: Dispatch) => {
    try {
      const res = createUserWithEmailAndPassword(auth, email, password);

      const currentUser = await res;

      await updateProfile(auth.currentUser, {
        displayName,
      });

      dispatch(
        loginUser({
          uuid: currentUser?.user?.uid,
          displayName: currentUser?.user?.displayName,
          email: currentUser.user.email,
        })
      );

      toast.success("Congratulations you are ready ");
    } catch (err) {
      toast.error("Email Already Exists");
    }
  };

export const userSignOut = () => async (dispatch: Dispatch) => {
  try {
    await signOut(auth);

    dispatch(logoutUser());

    localStorage.removeItem("currentUser");
  } catch (err) {
    toast.error(err.message);
  }
};

export const userChangePassword =
  (password: string) => async (dispatch: Dispatch) => {
    const user = auth?.currentUser;
    const newPassword = password;

    try {
      await updatePassword(user, newPassword);
      dispatch(logoutUser());
      toast.success("password updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

export const emailVerfication = (email: string) => async () => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("An Email has been sent to change your password");
  } catch (err) {
    console.log(err);
  }
};

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
