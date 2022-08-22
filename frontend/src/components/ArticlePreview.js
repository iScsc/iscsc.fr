const ArticlePreview = ({ article }) => {
  return (
    <div className="article-preview">
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <small>
        {article.author} - {article.createdAt}
      </small>
    </div>
  );
};

export default ArticlePreview;
