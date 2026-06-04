import './App.css';
import { Routes, Route, Link } from "react-router-dom";

// 引入頁面元件
import { Home, Services, History, Location } from './pages'; 
import { About } from './about';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      
      {/* 這裡是全域導覽列：文字連結 */}
      <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <Link to="/">首頁 (Home)</Link> 
        &nbsp;&nbsp;|&nbsp;&nbsp; 
        <Link to="/about">關於我們 (About)</Link>
      </nav>

      <Routes>
        {/* 1. 根目錄 (Home) */}
        <Route path="/" element={<Home />} />

        {/* 2. About 頁面與底下的分支 */}
        <Route path="/about" element={<About />}>
          <Route path="service" element={<Services />} />
          <Route path="history" element={<History />} />
          <Route path="location" element={<Location />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;