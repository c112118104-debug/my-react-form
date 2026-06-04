import './App.css';
import React, { useState } from "react";

function Compon(props) {
  return(
    <h1>A Component. {props.item}</h1>
  );
}
const compons = Array.from({lenght:4});

function App(){
  return(
    <div className="App">
      <main>
        {compons.map(()=>(<compon item="item"/>))}
      </main>
    </div>
  );

}


export default App;