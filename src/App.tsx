import React, { useEffect, useState } from 'react';
import './App.css';
import { ITodoItem } from './types/types';
import Navbar from './components/Navbar';
import TodoItemsList from './components/TodoItemsList';
import axios from 'axios';
import 'antd/dist/antd.css';

function App() {
  const [items, setItems] = useState<ITodoItem[]>([]);

  useEffect(() => {
    fetchItems()
  }, []);

  async function fetchItems() {
    try {
      const response = await axios.get<ITodoItem[]>('https://localhost:44380/api/todo/tasks');
      setItems(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <TodoItemsList items={items} />
    </div>
  );
}

export default App;
