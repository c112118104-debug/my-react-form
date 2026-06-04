import React, { useState } from 'react';

export default function InputTexts() {
  // 宣告狀態變數來儲存帳號與密碼
  const [username, setUsername] = useState('Sophie');
  const [password, setPassword] = useState('123456'); // 預設密碼

  return (
    <div>

      {/* 帳號區塊 */}
      <div>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <p>帳號：{username}</p>
      </div>

      <br />

      <div>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {/* 這裡使用字串的 repeat 方法，根據密碼長度動態產生星號 */}
        <p>密碼：{'*'.repeat(password.length)}</p>
      </div>
    </div>
  );
}