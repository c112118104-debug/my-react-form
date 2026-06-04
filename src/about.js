import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function About() {
    return (
        <div>
            <h1>關於我們 (About)</h1>
            <p>請點擊下方文字連結，切換不同的子頁面：</p>
            
            {/* About 內部的子導覽列：文字連結 */}
            <nav style={{ marginBottom: '15px' }}>
                <Link to="service">服務項目 (Service)</Link> &nbsp;&nbsp;
                <Link to="history">歷史沿革 (History)</Link> &nbsp;&nbsp;
                <Link to="location">營業據點 (Location)</Link>
            </nav>
            
            {/* 這是子頁面的顯示框框 */}
            <div style={{ padding: '15px', border: '2px dashed #007bff', borderRadius: '8px' }}>
                <Outlet />
            </div>
            
        </div>
    );
}