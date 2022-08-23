import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleView from "../../components/ArticleView";

const Article = () => {
  let { id } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async (id) => {
      const response = await fetch(`/api/articles/${id}`);
      const json = await response.json();

      if (response.ok) {
        setArticle(json);
      }
    };

    fetchArticle(id);
  }, [id]);

  return <ArticleView article={article} />;
};

export default Article;
