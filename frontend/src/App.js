import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/blog/Blog";
import Navbar from "./components/Navbar";
import CreateArticle from "./pages/blog/CreateArticle";
import Article from "./pages/blog/Article";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/blog/createArticle" element={<CreateArticle />} />
            <Route path="/blog/:id" element={<Article />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
