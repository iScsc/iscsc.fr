import { useParams } from "react-router-dom";
import ArticleView from "../../components/ArticleView";

const Article = () => {
  let { id } = useParams();
  return <ArticleView id={id} />;
};

export default Article;
