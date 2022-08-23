const ArticleView = ({ article }) => {
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
