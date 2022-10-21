import { useState } from "react";
import { useArticlesContext } from "../hooks/useArticlesContext";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useArticlesContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = { title, summary, body, author: "alex" };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/articles/create`,
      {
        method: "POST",
        body: JSON.stringify(article),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setTitle("");
      setSummary("");
      setBody("");
      setError(null);
      dispatch({ type: "CREATE", payload: json });
    } else {
      setError(json.error);
    }
  };

  return (
    <div className="article-form">
      <h2>Create a new article</h2>
      <form className="article-form-form" onSubmit={handleSubmit}>
        <label>Article title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label>Article summary:</label>
        <input
          type="text"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
        />

        <label>Article body:</label>
        <textarea
          rows="8"
          cols="50"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />

        <button>Add article</button>
      </form>
      {error && <div class="create-article-error">{error}</div>}
    </div>
  );
};

export default ArticleForm;
