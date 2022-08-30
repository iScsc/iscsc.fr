import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.log(json.error)
      setError(json.error);
    } else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
