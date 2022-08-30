import { createContext, useReducer } from "react";

export const ArticlesContext = createContext();

export const articlesReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        articles: action.payload,
      };

    case "ADD":
      return {
        articles: [action.payload, ...state.articles],
      };

    case "DELETE":
      return {
        articles: state.articles.filter((a) => action.payload._id !== a._id),
      };

    case "RESET":
      return {
        articles: [],
      };

    default:
      return state;
  }
};

export const ArticlesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(articlesReducer, {
    articles: null,
  });

  return (
    <ArticlesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArticlesContext.Provider>
  );
};
