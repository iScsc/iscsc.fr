import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Blog from './pages/blog/Blog'
import Navbar from './components/Navbar'
import CreateArticle from './pages/blog/CreateArticle'
import Article from './pages/blog/Article'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/blog" />} />
            <Route
              path="/blog/create-article"
              element={
                user ? <CreateArticle /> : <Login next="/blog/create-article" />
              }
            />
            <Route path="/blog/:id" element={<Article />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login next="/" />} />
            <Route path="/signup" element={<Signup next="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
