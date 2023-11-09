import { useState } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in");
    } catch (err) {
      console.log(err);
    }
  };

  /*** */
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("logged in", auth?.currentUser?.uid);
    } catch (err) {
      console.log(err);
    }
  };

  /**** */
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("logged out", auth?.currentUser?.uid);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={logOut}>Logout</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default Auth;
