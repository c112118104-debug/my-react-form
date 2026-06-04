import React, { useState } from 'react';
import ProductList from './components/ProductList'; // 確定路徑與您的資料夾結構相符

export default function App() {
  // 記錄最終確認的購物清單
  const [cartItems, setCartItems] = useState([]);

  // 接收從 ProductList 傳來的資料
  const handleConfirmCart = (selectedItems) => {
    setCartItems(selectedItems);
  };

  // 計算總金額
  const totalAmount = cartItems.reduce((total, item) => total + item.subtotal, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>商品列表</h1>
      
      {/* 呼叫元件並傳入函式 */}
      <ProductList onConfirm={handleConfirmCart} />

      {/* 如果購物車裡有東西，就顯示這塊區域 */}
      {cartItems.length > 0 && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>
          <h2>購物清單</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                {item.name} x {item.quantity} = ${item.subtotal}
              </li>
            ))}
          </ul>
          <h3>總金額: ${totalAmount}</h3>
        </div>
      )}
    </div>
  );
}