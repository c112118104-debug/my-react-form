import './App.css';
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from 'qrcode.react';

// 💡 引入影片播放器，以及進階的控制列元件 (用來調整速度、快轉等)
import { 
  Player, 
  ControlBar, 
  PlaybackRateMenuButton, 
  ReplayControl, 
  ForwardControl 
} from 'video-react';
import 'video-react/dist/video-react.css';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* ===== 頂部：多國語系切換 ===== */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#333' }}>{t("hello")}</h1>
        <h2 style={{ color: '#666' }}>{t("link")}</h2>
        
        <div style={{ marginTop: '15px' }}>
          <button onClick={() => i18n.changeLanguage('en')} type="button" style={btnStyle}>English</button>
          <button onClick={() => i18n.changeLanguage('zh')} type="button" style={btnStyle}>中文</button>
          <button onClick={() => i18n.changeLanguage('es')} type="button" style={btnStyle}>Español</button>
        </div>
      </div>

      {/* ===== 主內容區：並排顯示 QR Code 與 影片 ===== */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap', // 螢幕太小時會自動換行
        gap: '40px', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>

        {/* --- 左側：特別設計的拍立得風 QR Code 卡片 --- */}
        <div style={{
          backgroundColor: '#fff',
          padding: '20px 20px 40px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '250px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#555' }}>我的專屬名片</h3>
          <QRCodeSVG
            value="https://iitmlab.tw"
            size={180}
            bgColor={"#ffffff"}
            fgColor={"#2c3e50"} // 深藍灰色
            level={"H"}
            imageSettings={{
              src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
          <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#888', letterSpacing: '2px' }}>SCAN ME</p>
        </div>

        {/* --- 右側：可調速的進階影片播放器 --- */}
        <div style={{ 
          width: '100%', 
          maxWidth: '650px', 
          backgroundColor: '#000',
          borderRadius: '12px',
          overflow: 'hidden', // 讓影片圓角生效
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        }}>
          <Player
            playsInline
            poster="https://media.w3.org/2010/05/sintel/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          >
            {/* 💡 在 Player 裡面加入 ControlBar 來自訂控制列 */}
            <ControlBar autoHide={false}>
              {/* 倒轉 10 秒 */}
              <ReplayControl seconds={10} order={1.1} />
              {/* 快轉 30 秒 */}
              <ForwardControl seconds={30} order={1.2} />
              {/* 播放速度選單 (提供 2倍、1.5倍、正常、0.5倍 等選項) */}
              <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.5]} order={7.1} />
            </ControlBar>
          </Player>
        </div>

      </div>
    </div>
  );
}

// 稍微美化一下按鈕樣式，並統一寬度
const btnStyle = {
  margin: '0 8px',
  width: '100px',           // 💡 固定寬度
  height: '100px',          // 💡 固定高度（與寬度相同）
  display: 'inline-flex',   // 💡 使用 Flexbox 排版
  justifyContent: 'center', // 讓文字水平置中
  alignItems: 'center',     // 讓文字垂直置中
  cursor: 'pointer',
  backgroundColor: '#5c7cfa', // 換一個更有質感的藍色
  color: 'white',
  border: 'none',
  borderRadius: '12px',     // 加大圓角，讓方塊看起來更可愛
  fontWeight: 'bold',
  fontSize: '18px',         // 字體再放大一點
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' // 加上一點陰影增加立體感
};

export default App;