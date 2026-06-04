import React, { useState } from 'react';
import styled from '@emotion/styled';

// ==========================================
// 🧠 1. 核心邏輯 (Custom Hook)
// 負責處理「上一筆」、「下一筆」與「無限循環」的資料邏輯
// ==========================================
function useCarousel(items) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return {
    currentItem: items[currentIndex], // 目前要顯示的那筆資料
    handlePrev,                       // 觸發上一筆的方法
    handleNext                        // 觸發下一筆的方法
  };
}


// ==========================================
// 🧩 2. 公版按鈕元件 (UI 共用元件)
// ==========================================
const StyledButton = styled.button`
  border: none;
  padding: 12px 24px;
  border-radius: 30px; 
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;

  /* 🌟 動態接收外部傳來的背景顏色，沒有傳的話預設為灰色 */
  background-color: ${(props) => props.bgColor || '#9e9e9e'};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 將 StyledButton 封裝成 React 元件，負責接收屬性並轉發
const Button = ({ bgColor, onClick, children }) => {
  return (
    <StyledButton bgColor={bgColor} onClick={onClick}>
      {children}
    </StyledButton>
  );
};


// ==========================================
// 🎨 3. 頁面專屬排版樣式 (Emotion Styled Components)
// ==========================================
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7dadd; 
  font-family: 'Arial', sans-serif;
  margin: 0;
`;

const Card = styled.div`
  background-color: #fdfcee; 
  padding: 50px 60px;
  border-radius: 25px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); 
  text-align: center;
  width: 320px;
`;

const Title = styled.h1`
  color: #e54d50;
  font-size: 26px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #5d8e75;
  font-size: 15px;
  margin-bottom: 40px;
`;

const Content = styled.div`
  text-align: left; 
  display: inline-block; 
  margin-bottom: 30px;

  p {
    color: #6d4c41; 
    font-size: 17px;
    font-weight: bold;
    margin: 12px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; 
`;


// ==========================================
// 🏠 4. 主程式 (App)
// 負責將「資料」、「核心邏輯」與「畫面」組合在一起
// ==========================================
export default function App() {
  // 準備學生資料陣列
  const students = [
    { name: 'Sophie', id: '110123456' },
    { name: '李小華', id: '110123457' },
    { name: '王大明', id: '110123458' }
  ];

  // 呼叫 Custom Hook，取得目前資料與切換功能
  const { currentItem, handlePrev, handleNext } = useCarousel(students);

  return (
    <Container>
      <Card>
        <Title>🌷 React 卡片練習 🌷</Title>
        <Subtitle>點擊按鈕切換學生資料</Subtitle>
        
        <Content>
          <p>👩‍🎓 學生姓名：{currentItem.name}</p>
          <p>🆔 學號：{currentItem.id}</p>
        </Content>
        
        <ButtonGroup>
          {/* 套用公版按鈕，並自由傳入你想要的顏色代碼 */}
          <Button bgColor="#ef5350" onClick={handlePrev}>
            ⬅ 上一筆
          </Button>
          
          <Button bgColor="#29b6f6" onClick={handleNext}>
            下一筆 ➡
          </Button>
        </ButtonGroup>
      </Card>
    </Container>
  );
}