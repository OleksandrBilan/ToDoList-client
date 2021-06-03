import React from 'react';
import { ITodoItem } from '../types/types';
import State from './State';
import { Button, Modal } from 'antd';
import EditTodoItemForm  from './EditTodoItemForm';

interface TodoItemProps {
    todoItem: ITodoItem
}

const TodoItem: React.FC<TodoItemProps> = ({todoItem}) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showModal = () => {
      setVisible(true);
    };

    const handleOk = () => {
      setConfirmLoading(true);
      setVisible(false);
      setConfirmLoading(false);
    };

    const handleCancel = () => {
      setVisible(false);
    };

    return (
        <div className='todo-item-div'>
            <span className='assignee-span'>{todoItem.assignee}</span> <State num={todoItem.state} />
            <div className='text-div'>
                {todoItem.text}
            </div>
            <span className='deadline-span'>Deadline: {todoItem.deadline}</span>
            <Button className='edit-btn' size='small' type='primary' onClick={showModal}>Edit</Button>
            <Modal title="Edit Task" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={[]}>
                <EditTodoItemForm item={todoItem} />
            </Modal>
        </div>
    )
}

export default TodoItem;
