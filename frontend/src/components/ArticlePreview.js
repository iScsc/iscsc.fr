const ArticlePreview = ({ article }) => {
  return (
    <div className="article-preview">
      <p>{article.title}</p>
      <small>
        {article.author} - {article.createdAt}
      </small>
    </div>
  );
};

export default ArticlePreview;
