import { useAuthContext } from "./useAuthContext";
import { useArticlesContext } from "./useArticlesContext";

export const useLogout = () => {
  const { dispatch: dispatchAuth } = useAuthContext();
  const { dispatch: dispatchArticle } = useArticlesContext();

  const logout = () => {
    // sremove the saved user in the local storage
    localStorage.removeItem("user");

    // update auth context
    dispatchAuth({ type: "LOGOUT" });
    dispatchArticle({ type: "RESET" });
  };

  return { logout };
};
