import './App.css';
import React from 'react';

function StudentCard(props) {
  const { id, name, dept } = props.info;
  return (
    <div style={{ textAlign: 'left'}}>
      <hr/><strong>學號：</strong> {id}
      <strong>姓名：</strong> {name}
      <strong>系所：</strong> {dept}
      <hr/>
    </div>
  );
}

function App() {
  const studentList = [
    { id: 'A001', name: 'Emy   ',     dept: '資管系' },
    { id: 'A002', name: 'Lisa   ',    dept: '企管系' },
    { id: 'A003', name: 'John   ',    dept: '資工系' },
    { id: 'A004', name: 'Osborn   ',  dept: '會計系' },
    { id: 'A005', name: 'Elsa   ',    dept: '語文系' }
  ];

  return (
    <div className="App">
      <main>
        <h2>List Mapping 封裝</h2>
        {studentList.map((item) => (
          <StudentCard 
            key={item.id} 
            info={item}  
          />
        ))}
      </main>
    </div>
  );
}

export default App;