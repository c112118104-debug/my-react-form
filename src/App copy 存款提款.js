import './App.css';
import React, { useState } from "react";

function Hello(props) {
  return <div><h1>嗨，{props.name}</h1></div>;
}

function Accept(props) {
  return (
    <div>
      <h1>
        帳戶餘額：{props.number} 元
      </h1>
    </div>
  );
}

function App() {
  const [myMoney, setMyMoney] = useState(100);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // 通用的基本驗證：檢查是否為空或負數
  const isBasicValid = (amount) => {
    if (amount === "" || amount === null) {
      alert("錯誤：請輸入金額！");
      return false;
    }
    if (Number(amount) <= 0) {
      alert("錯誤：金額必須大於 0！");
      return false;
    }
    return true;
  };

  const handleDeposit = () => {
    if (!isBasicValid(depositAmount)) return;

    setMyMoney(myMoney + Number(depositAmount));
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    // 1. 先做基本驗證（是否為空、是否為負數）
    if (!isBasicValid(withdrawAmount)) return;

    // 2. 特殊驗證：檢查餘額是否足夠
    if (Number(withdrawAmount) > myMoney) {
      alert(`錯誤：餘額不足！你目前只有 ${myMoney} 元，無法提取 ${withdrawAmount} 元。`);
      return; // 攔截，不執行扣錢
    }

    // 3. 通過所有檢查才扣錢
    setMyMoney(myMoney - Number(withdrawAmount));
    setWithdrawAmount("");
  };

  return (
    <div className="App" style={{ padding: '30px', textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
      <Hello name="Andy" />
      <Accept number={myMoney} />
      
      <hr />

      <div>
        <h3>存款服務</h3>
        <input 
          type="number" 
          placeholder="請輸入金額" 
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit} style={{ marginLeft: '10px' }}>確認存款</button>
      </div>

      <div style={{ backgroundColor: '#fff0f0', padding: '15px', borderRadius: '8px' }}>
        <h3>提款服務</h3>
        <input 
          type="number" 
          placeholder="請輸入金額" 
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw} style={{ marginLeft: '10px' }}>確認提款</button>
      </div>
    </div>
  );
}

export default App;