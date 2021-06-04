import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TodoItemsList from './components/TodoItemsList';
import 'antd/dist/antd.css';

export const backEndUrl: string = "https://localhost:44380/";

function App() {
  return (
    <div className="App">
      <Navbar />
      <TodoItemsList />
    </div>
  );
}

export default App;
