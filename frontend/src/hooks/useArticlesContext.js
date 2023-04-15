import { useContext } from 'react'
import { ArticlesContext } from '../context/ArticleContext'

export const useArticlesContext = () => {
  const context = useContext(ArticlesContext)

  if (!context) {
    throw Error(
      'Cannot use context article outside of a ArticleContextProvider'
    )
  }
  return context
}
