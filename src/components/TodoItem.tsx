import React from 'react';
import { ITodoItem } from '../types/types';
import State from './State';
import { Button, Modal, Card } from 'antd';
import EditTodoItemForm  from './EditTodoItemForm';
import axios from 'axios';
import { backEndUrl } from '../App';
import { stateNumToString } from './EditTodoItemForm';

interface TodoItemProps {
    todoItem: ITodoItem
}

const { confirm } = Modal;

const TodoItem: React.FC<TodoItemProps> = ({todoItem}) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
      setVisible(true);
    };

    const handleOk = () => {
      setVisible(false);
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const showDeleteConfirm = () => {
      confirm({
        title: 'Are you sure you want to delete this task?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            axios.delete(backEndUrl + 'api/todo/tasks/delete/' + todoItem.id);
        },
        onCancel() {}
      });
    }

    const showExtended = () => {
      Modal.info({
        title: todoItem.assignee,
        content: (
          <div>
            <p>{todoItem.text}</p>
            <p>State: {stateNumToString(todoItem.state)}</p>
            <p>Deadline: {todoItem.deadline}</p>
          </div>
        ),
        onOk() {},
      });
    }

    return (
        <div className='todo-item-div'>
            <Card size="small" title={todoItem.assignee} extra={<State num={todoItem.state}/>} hoverable>
                <div className='text-div'>
                    {todoItem.text}
                </div>
                <span className='deadline-span'>Deadline: {todoItem.deadline}</span>
                <div className='buttons'>
                    <Button className='more-btn' size='small' type='dashed' onClick={showExtended}>More</Button>
                    <Button className='edit-btn' size='small' type='primary' onClick={showModal}>Edit</Button>
                    <Button className='delete-btn' type='primary' danger size='small' onClick={showDeleteConfirm}>Delete</Button>
                </div>
            </Card>
            <Modal title="Edit Task" visible={visible} onOk={handleOk}onCancel={handleCancel} footer={[]}>
                <EditTodoItemForm item={todoItem} />
            </Modal>
        </div>
    )
}

export default TodoItem;
