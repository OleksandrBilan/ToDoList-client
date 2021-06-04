import React, { useState, useEffect } from 'react';
import { ITodoItem } from '../types/types';
import TodoItem from './TodoItem';
import axios from 'axios';
import { backEndUrl } from '../App';

const TodoItemsList = () => {
    const [items, setItems] = useState<ITodoItem[]>([]);

    useEffect(() => {
      fetchItems()
    }, []);

    async function fetchItems() {
        try {
          const response = await axios.get<ITodoItem[]>(backEndUrl + 'api/todo/tasks');
          setItems(response.data);
        } catch (e) {
          console.log(e);
        }
    }

    return (
        <div className='items-list'>
            {items.map(item => <TodoItem key={item.id} todoItem={item} />)}
        </div>
    )
}

export default TodoItemsList;
