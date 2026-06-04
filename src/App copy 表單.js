import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  
  const txtTitle = useRef();
  const hexColor = useRef();

  const submit = e => {
    // 不要讓 submit 送出 POST request
    e.preventDefault(); 
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    console.log("submit");
    console.log("title: " + title + " ,color: " + color);
    txtTitle.current.value="";
    hexColor.current.value="#000000";
  }

  return (
    <div className='App'>
      <form onSubmit={submit}>
        <input ref={txtTitle} 
               type="text" 
               required /><br/>
        <input ref={hexColor} 
               type="color" 
               required /><br/>
        <input type="submit" value='送出'/>
      </form>
    </div>
  );
}

export default App;