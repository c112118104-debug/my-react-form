import './App.css';
import React, { useState, useEffect } from "react";

const posts = [
  { id: 1, title: '這是書籍資料', content: 'C112118104 廖哲言' },
  { id: 2, title: 'SQL Server 實戰指南', content: '掌握 T-SQL 語法與資料庫最佳化實務' },
  { id: 3, title: 'Python Web 開發', content: '使用 Streamlit 快速打造互動式數據應用' },
  { id: 4, title: 'Cisco 網路基礎', content: 'Packet Tracer 實作：從 VLAN 到 SSH 安全設定' },
  { id: 5, title: 'GitHub Actions 入門', content: '自動化 CI/CD 工作流，提升專案開發效率' },
];

function Blog(props) {
  const content = props.posts.map((post) =>
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {content}
    </div>
  );
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function formatName(props) {
  return props.firstName + ' ' + props.lastName;
}

function Add1(props) {
  return (
    <>
      {props.op1} + {props.op2} = {parseInt(props.op1) + parseInt(props.op2)}
      <br />
    </>
  );
}

function Sub1(props) {
  return (
    <>
      {props.op1} - {props.op2} = {parseInt(props.op1) - parseInt(props.op2)}
      <br />
    </>
  );
}

function GetGreeting(props) {
  if (props) {
    return <h1>Hello, {formatName(props)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
// 新增：時鐘
function MyClock() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>現在時間：{currentTime}</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App" >
      <Blog posts={posts} />
      <Welcome name="Che-Yen" />
      <GetGreeting firstName="Che-Yen" lastName="Liao" />
      <Add1 op1="8" op2="7" />
      <Sub1 op1="12" op2="8" />
       <MyClock />
    </div>
  );
}

export default App;