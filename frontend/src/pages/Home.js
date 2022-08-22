import { useEffect, useState } from "react";
import ArticlePreview from "../components/ArticlePreview";

const Home = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles`);
      const json = await response.json();

      if (response.ok) {
        setArticles(json);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="home">
      <div className="articles">
        {articles &&
          articles.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default Home;
