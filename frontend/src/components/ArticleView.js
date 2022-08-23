import { useEffect, useState } from "react";

const ArticleView = ({ id }) => {
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

  return (
    <article>
      {article && (
        <>
          <h2>{article.title}</h2>
          {article.summary && <h3>{article.summary}</h3>}
          <small>
            {article.author} - {article.createdAt}
          </small>
          <p>{article.body}</p>
        </>
      )}
    </article>
  );
};

export default ArticleView;
