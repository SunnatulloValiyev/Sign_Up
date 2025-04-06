import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useGlobalContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within an AuthContextProvider");
  }

  return context;
};
