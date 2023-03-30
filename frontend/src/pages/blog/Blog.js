import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArticlePreview from '../../components/ArticlePreview'
import { useArticlesContext } from '../../hooks/useArticlesContext'

const Blog = () => {
  const { articles, dispatch } = useArticlesContext()

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`/api/articles`)
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET', payload: json })
      }
    }

    fetchArticles()
  }, [dispatch])

  return (
    <div className="blog">
      <div className="blog-header">
        <h2>All articles ({articles && articles.length})</h2>
        <Link to="/blog/create-article" className="blog-header-create">
          Write my own article
        </Link>
      </div>
      <div className="articles">
        {articles &&
          articles.map(article => (
            <ArticlePreview
              article={article}
              className="article-link"
              key={article._id}
            />
          ))}
      </div>
    </div>
  )
}

export default Blog
