import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // sremove the saved user in the local storage
    localStorage.removeItem("user");

    // update auth context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
