import React, { useState } from 'react';
import products from '../data/products'; // 引入商品資料

const ProductList = ({ onConfirm }) => {
  // 動態建立初始的數量狀態，例如：{ 1: 0, 2: 0 }
  const initialQuantities = products.reduce((acc, product) => {
    acc[product.id] = 0;
    return acc;
  }, {});

  const [quantities, setQuantities] = useState(initialQuantities);

  // 增加數量
  const increment = (id) => {
    setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  };

  // 減少數量 (不可小於 0)
  const decrement = (id) => {
    setQuantities({ ...quantities, [id]: Math.max(0, quantities[id] - 1) });
  };

  // 直接輸入數字
  const handleChange = (id, value) => {
    const val = parseInt(value, 10);
    setQuantities({ ...quantities, [id]: isNaN(val) ? 0 : Math.max(0, val) });
  };

  // 處理確認購物車
  const handleConfirm = () => {
    // 篩選出數量大於 0 的商品，並計算小計
    const selectedItems = products
      .filter((product) => quantities[product.id] > 0)
      .map((product) => ({
        ...product,
        quantity: quantities[product.id],
        subtotal: product.price * quantities[product.id],
      }));
    
    // 把選好的資料傳給父元件 (App.js)
    onConfirm(selectedItems);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <img src={product.image} alt={product.name} width="150" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>價格: ${product.price}</p>
          <div>
            <button onClick={() => decrement(product.id)}>-</button>
            <input
              type="number"
              min="0"
              value={quantities[product.id]}
              onChange={(e) => handleChange(product.id, e.target.value)}
              style={{ width: '50px', textAlign: 'center', margin: '0 5px' }}
            />
            <button onClick={() => increment(product.id)}>+</button>
          </div>
        </div>
      ))}
      <button style={{ marginTop: '10px' }} onClick={handleConfirm}>
        確認購物車
      </button>
    </div>
  );
};

export default ProductList;