import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const ArticleView = ({ article }) => {
  const markdown = `
# ${article.title}
### ${article.summary}

*${article.author} - ${article.createdAt}*

${article.body}
  `

  return (
    <article>
      {article && (
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
      )}
    </article>
  )
}

export default ArticleView
