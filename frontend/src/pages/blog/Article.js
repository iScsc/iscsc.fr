import { useParams } from "react-router-dom";
import ArticleView from "../../components/ArticleView";
import { useArticlesContext } from "../../hooks/useArticlesContext";

const Article = () => {
  let { id } = useParams();
  const { articles } = useArticlesContext();
  const article = articles.filter((a) => a._id === id)[0];
  return <ArticleView article={article} />;
};

export default Article;
