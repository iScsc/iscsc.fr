import { useState } from "react";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = { title, summary, body, author: "alex" };
    const response = await fetch("/api/articles/create", {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setSummary("");
      setBody("");
      setError(null);
      console.log("New article added", json);
    }
  };

  return (
    <div className="create-article">
      <h2>Create a new article</h2>
      <form className="create-article-form" onSubmit={handleSubmit}>
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
        <input
          type="text"
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />

        <button>Add article</button>
      </form>
      {error && <div class="create-article-error">{error}</div>}
    </div>
  );
};

export default CreateArticle;
