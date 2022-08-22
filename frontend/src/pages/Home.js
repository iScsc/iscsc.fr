import { useEffect, useState } from "react";

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
            <div key={article._id}>
              <p>{article.title}</p>
              <small>{article.author} - {article.createdAt}</small>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
