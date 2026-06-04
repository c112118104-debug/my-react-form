import './App.css';
import { Routes, Route } from "react-router-dom";

// 這裡的 import 路徑請依照您實際的專案資料夾結構進行調整
// 假設這些 Component 都統一放在 ./pages 資料夾下
import { 
  Home, 
  Register, 
  Login, 
  Profile, 
  AnimalList, 
  AnimalDetail, 
  DonateFood, 
  DonationList, 
  BrandStory, 
  NotFound 
} from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 首頁 */}
        <Route path="/" element={<Home />} />
        
        {/* 會員相關 */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* 動物相關 */}
        <Route path="/animals" element={<AnimalList />} />
        {/* 使用 :id 設定動態路由，用來獲取特定動物的詳細資料 */}
        <Route path="/animals/:id" element={<AnimalDetail />} />
        
        {/* 捐贈相關 */}
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/donation-list" element={<DonationList />} />
        
        {/* 其他頁面 */}
        <Route path="/about" element={<BrandStory />} />
        
        {/* 找不到頁面 (Catch-all route) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;