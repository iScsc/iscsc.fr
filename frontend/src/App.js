import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Blog from "./pages/blog/Blog";
import Navbar from "./components/Navbar";
import CreateArticle from "./pages/blog/CreateArticle";
import Article from "./pages/blog/Article";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/blog" />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/createArticle" element={<CreateArticle />} />
            <Route path="/blog/:id" element={<Article />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
