import React, { useState } from 'react';

// 1. 基本數字增減 (使用 export default 預設匯出)
export default function Numbers() {
  const [number, setNumber] = useState(10);
  return (
    <>
      <button onClick={() => { setNumber(number + 1) }}>加1</button>
      <p>{number}</p>
      <button onClick={() => setNumber(number - 1)}>減1</button>
    </>
  );
}

// 2. 數字增減 (HTML 限制) (使用 export 具名匯出)
export function NumbersWithLimitByHTML() {
  const [number, setNumber] = useState(10);
  return (
    <>
      {(number < 10) && (<button onClick={() => { setNumber(number + 1) }}>加1</button>)}
      <p>{number}</p>
      {(number > 0) && (<button onClick={() => setNumber(number - 1)}>減1</button>)}
    </>
  );
}

// 3. 數字增減 (CSS 限制) (使用 export 具名匯出)
export function NumbersWithLimitByCss() {
  const [number, setNumber] = useState(10);
  return (
    <>
      <button
        style={{ visibility: number >= 10 ? 'hidden' : 'visible' }}
        onClick={() => { setNumber(number + 1) }}>加1</button>
      <p>{number}</p>
      <button
        style={{ visibility: number <= 0 ? 'hidden' : 'visible' }}
        onClick={() => setNumber(number - 1)}>減1</button>
    </>
  );
}