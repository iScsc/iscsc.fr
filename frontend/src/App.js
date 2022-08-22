import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/blog/Blog";
import Navbar from "./components/Navbar";
import CreateArticle from "./pages/blog/CreateArticle";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/blog/createArticle" element={<CreateArticle />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
