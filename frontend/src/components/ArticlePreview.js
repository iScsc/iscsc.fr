import { Link } from "react-router-dom";
import { useArticlesContext } from "../hooks/useArticlesContext";

const ArticlePreview = ({ article }) => {
  const { dispatch } = useArticlesContext();
  const handleClick = async () => {
    const response = await fetch("/api/articles/" + article._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE", payload: json });
    }
  };

  return (
    <div className="article-preview">
      <Link className="article-preview-details" to={`/blog/${article._id}`}>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <small>
          {article.author} - {article.createdAt}
        </small>
      </Link>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default ArticlePreview;
