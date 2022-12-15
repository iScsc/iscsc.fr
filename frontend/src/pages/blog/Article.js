import { useParams } from "react-router-dom";
import ArticleView from "../../components/ArticleView";
import { useArticlesContext } from "../../hooks/useArticlesContext";

const Article = () => {
  let { id } = useParams();
  const { articles, dispatch } = useArticlesContext();

  const fetchArticle = async () => {
      const response = await fetch(`/api/articles/${id}`);  // fetch the article (only this one) from the database
      if (response.ok) {
        const article = await response.json();
        dispatch({ type: "ADD", payload: article });       // if it exists, add it to the ArticlesContext
        return article;
      }
      else {
        return null;
      } 
  };
  
  try {
    const article = articles.filter((a) => a._id === id)[0];
    return <ArticleView article={article} />;
  } catch (error) { //if articles are null, articles.filter produces an error
    const article = fetchArticle();
    return <ArticleView article={article} />;
  }

};

export default Article;
