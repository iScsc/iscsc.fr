import React from "react";
import ReactMarkdown from "react-markdown";

const ArticleView = ({ article }) => {
  const markdown = `
# ${article.title}
### ${article.summary}

*${article.author} - ${article.createdAt}*

${article.body}
  `;

  return <article>{article && <ReactMarkdown children={markdown} />}</article>;
};

export default ArticleView;
