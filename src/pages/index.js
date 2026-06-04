import React from 'react';
import { Link } from 'react-router-dom';

// 原本保留的元件 (這樣才不會報錯)
export const History = () => {
  return <div style={{ padding: '20px' }}><h2>History 頁面</h2><Link to="/">回首頁</Link></div>;
};

export const Location = () => {
  return <div style={{ padding: '20px' }}><h2>Location 頁面</h2><Link to="/">回首頁</Link></div>;
};

export const Services = () => {
  return <div style={{ padding: '20px' }}><h2>Services 頁面</h2><Link to="/">回首頁</Link></div>;
};

// 以下是你需要的新頁面！
export const Home = () => {
  return <div style={{ padding: '20px' }}><h1>首頁 Landing Page</h1><p>歡迎來到我們的網站！</p></div>;
};

export const Register = () => {
  return <div style={{ padding: '20px' }}><h1>註冊</h1><Link to="/">回首頁</Link></div>;
};

export const Login = () => {
  return <div style={{ padding: '20px' }}><h1>登入</h1><Link to="/">回首頁</Link></div>;
};

export const Profile = () => {
  return <div style={{ padding: '20px' }}><h1>個人資訊</h1><Link to="/">回首頁</Link></div>;
};

export const AnimalList = () => {
  return <div style={{ padding: '20px' }}><h1>動物列表</h1><Link to="/">回首頁</Link></div>;
};

export const AnimalDetail = () => {
  return <div style={{ padding: '20px' }}><h1>詳細動物頁</h1><Link to="/animals">回動物列表</Link></div>;
};

export const DonateFood = () => {
  return <div style={{ padding: '20px' }}><h1>捐贈食物頁面</h1><Link to="/">回首頁</Link></div>;
};

export const DonationList = () => {
  return <div style={{ padding: '20px' }}><h1>捐贈清單</h1><Link to="/">回首頁</Link></div>;
};

export const BrandStory = () => {
  return <div style={{ padding: '20px' }}><h1>品牌故事</h1><Link to="/">回首頁</Link></div>;
};

export const NotFound = () => {
  return <div style={{ padding: '50px' }}><h1 style={{ color: 'red' }}>404 找不到頁面</h1><Link to="/">回首頁</Link></div>;
};  