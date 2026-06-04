import "./App.css";
import { Routes, Route, Link } from "react-router-dom"; 
import {
  Home,
  Login,
  Register,
  Profile,
  AnimalList,
  AnimalDetail,
  DonateFood,
  DonationList,
  BrandStory,
  NotFound,
} from "./pages";

function App() {
  return (
    <div className="app-container">
      {/* 美化導覽列 */}
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">🐾 流浪動物之家</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">首頁</Link></li>
          <li><Link to="/animals">動物列表</Link></li>
          <li><Link to="/donate">捐贈食物</Link></li>
          <li><Link to="/donation-list">捐贈清單</Link></li>
          <li><Link to="/brand-story">品牌故事</Link></li>
        </ul>
        <div className="nav-auth">
          <Link to="/login" className="login-btn">登入</Link>
          <Link to="/register" className="register-btn">註冊</Link>
        </div>
      </nav>

      {/* 主要內容顯示區 */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/animals" element={<AnimalList />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/donate" element={<DonateFood />} />
          <Route path="/donation-list" element={<DonationList />} />
          <Route path="/brand-story" element={<BrandStory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;