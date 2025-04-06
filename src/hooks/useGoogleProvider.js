import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContext"; 
import { useState } from "react";

export const useGoogleProvider = () => {
  const { setUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const googleProvider = async () => {
    setIsPending(true);
    try {
      const provider = new GoogleAuthProvider();
      const req = await signInWithPopup(auth, provider);
      const user = req.user;

      setUser(user); 

      setData(user);
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, data, googleProvider };
};
