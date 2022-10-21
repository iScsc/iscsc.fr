import ArticleView from "../../components/ArticleView";
import { useState } from "react";
import { useArticlesContext } from "../../hooks/useArticlesContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Config from "../../config/config.json";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useArticlesContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submit = async () => {
      const article = { title, summary, body };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/articles/create`,
        {
          method: "POST",
          body: JSON.stringify(article),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setTitle("");
        setSummary("");
        setBody("");
        setError(null);
        dispatch({ type: "CREATE", payload: json });

        navigate("/blog");
      }
    };

    if (user) {
      await submit();
    } else {
      setError("Authentication required to create a new article");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size < Config.FILE_SIZE_MAX) {
      file.text().then((t) => {
        const lines = t.split("\n");
        setTitle(lines[0]);
        setSummary(lines[1]);
        setBody(lines.slice(3).join("\n"));
      });
    } else {
      setError(
        "File is too large! Your upload must be less than " +
          Config.FILE_SIZE_MAX / 1000 +
          "kB"
      );
    }
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="create-article">
      <div className="article-form">
        <h2>Create a new article</h2>
        <form className="article-form-form" onSubmit={handleSubmit}>
          <label>Article title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title of the article"
          />

          <label>Article summary:</label>
          <input
            type="text"
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            placeholder="Brief summary in one sentence"
          />

          <label>Article body:</label>
          <textarea
            rows="8"
            cols="50"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder="Your article's body in Markdown"
          />

          <h4 className="article-form-or">--- OR ---</h4>

          <label>
            Choose a Markdown file to import (follow{" "}
            <a href="/ressources/template.md" download>
              this template
            </a>
            )
          </label>
          <input type="file" onChange={handleFileChange} />
          <button>Add article</button>
        </form>

        {error && <div className="create-article-error">{error}</div>}
      </div>
      {title && (
        <div className="create-article-view">
          <ArticleView
            article={{
              title,
              summary,
              body,
              author: user.username,
              createdAt: date,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateArticle;
