import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticlePreview from "../../components/ArticlePreview";

const Blog = () => {
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
    <div className="blog">
      <div className="blog-header">
        <h2>All articles ({articles && articles.length})</h2>
        <Link to='/blog/createArticle'>Write my article</Link>
      </div>
      <div className="articles">
        {articles &&
          articles.map((article) => (
            <ArticlePreview key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default Blog;
