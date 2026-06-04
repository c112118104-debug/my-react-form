import './App.css';
import React, { useState, useMemo } from 'react';

function MyComponent() {
  // 商品 1 數量 (蘋果) - 可改變
  const [appleQty, setAppleQty] = useState(6);
  // 商品 2 數量 (草莓) - 可改變
  const [stwQty, setStwQty] = useState(2);
  // 備註 - 可改變
  const [note, setNote] = useState("1213");

  // 商品固定單價 - 不可改變
  const applePrice = 50;
  const stwPrice = 80;

  // useMemo : 只有數量改變時才重新計算總金額
  const totalPrice = useMemo(() => {
    console.log("重新計算購物車總金額");
    return (
      applePrice * appleQty +
      stwPrice * stwQty
    ).toFixed(2);
  }, [appleQty, stwQty]);

  // --- 以下為畫面 UI 樣式設定 ---
  const cardStyle = {
    border: '2px solid #e0c8c8',
    borderRadius: '10px',
    padding: '20px',
    width: '200px',
    backgroundColor: '#fffaf0'
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      {console.log("rendering")}
      
      <h1>useMemo 雙商品購物車範例</h1>

      {/* 商品卡片區塊 */}
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        
        {/* 蘋果卡片 */}
        <div style={cardStyle}>
          <div style={{ fontSize: '80px' }}>🍎</div>
          <h2>蘋果</h2>
          <p>單價：{applePrice} 元</p>
          <p>數量：{appleQty}</p>
          <button onClick={() => setAppleQty(appleQty + 1)}>增加數量</button>
          <button 
            style={{ marginLeft: '10px' }} 
            onClick={() => setAppleQty(Math.max(0, appleQty - 1))}
          >
            減少數量
          </button>
        </div>

        {/* 草莓卡片 */}
        <div style={cardStyle}>
          <div style={{ fontSize: '80px' }}>🍓</div>
          <h2>草莓</h2>
          <p>單價：{stwPrice} 元</p>
          <p>數量：{stwQty}</p>
          <button onClick={() => setStwQty(stwQty + 1)}>增加數量</button>
          <button 
            style={{ marginLeft: '10px' }} 
            onClick={() => setStwQty(Math.max(0, stwQty - 1))}
          >
            減少數量
          </button>
        </div>
      </div>

      <hr style={{ maxWidth: '600px', margin: '20px auto' }} />

      {/* 總金額區塊 */}
      <div style={{
        backgroundColor: '#464d5d',
        color: 'white',
        display: 'inline-block',
        padding: '5px 15px',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>
        購物車總金額：{totalPrice} 元
      </div>

      <hr style={{ maxWidth: '600px', margin: '20px auto' }} />

      {/* 備註區塊 */}
      <div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ padding: '5px', width: '200px', textAlign: 'center' }}
        />
        <p style={{ fontWeight: 'bold' }}>備註：{note}</p>
        <p style={{ fontSize: '14px' }}>
          修改備註時會重新 render，但不會重新計算購物車總金額。
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
}

export default App;