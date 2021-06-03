import React from 'react';
import {ITodoItem} from '../types/types';
import TodoItem from './TodoItem';

interface TodoItemsListProps {
    items: ITodoItem[]
}

const TodoItemsList: React.FC<TodoItemsListProps> = ({items}) => {
    return (
        <div className='items-list'>
            {items.map(item => <TodoItem key={item.id} todoItem={item} />)}
        </div>
    )
}

export default TodoItemsList;
