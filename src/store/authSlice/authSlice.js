import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.js";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const loggedinUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  isAuthenticated: !!loggedinUser?.uid,
  user: loggedinUser || null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const signinUser = (email, password) => async (dispatch) => {
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
  (email, password, displayName) => async (dispatch) => {
    try {
      const res = createUserWithEmailAndPassword(auth, email, password);

      const currentUser = await res;

      await updateProfile(auth.currentUser, {
        displayName,
      });

      dispatch(
        loginUser({
          uuid: currentUser?.user?.uid,
          name: currentUser?.user?.displayName,
          email: currentUser.user.email,
        })
      );

      toast.success("Congratulations you are ready ");
    } catch (err) {
      toast.error("Email Already Exists");
    }
  };

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
