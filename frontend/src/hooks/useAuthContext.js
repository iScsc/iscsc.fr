import { useContext } from "react";
import { AuthContext } from "../context/ArticleContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Cannot use context auth outside of a AuthContextProvider");
  }
  return context;
};
