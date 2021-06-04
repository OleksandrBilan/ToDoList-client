import { Form, Input, Select, DatePicker, Button } from 'antd';
import { Int } from '../types/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ITodoItem } from '../types/types'
import { backEndUrl } from '../App';

const { Option } = Select;
const { TextArea } = Input;

interface EditTodoItemFormProps {
    item: ITodoItem;
}

export function stateNumToString(num: Int) {
    switch(num) {
        case 0: return "New";
        case 1: return "Doing";
        case 2: return "Done";
    }
}

const EditTodoItemForm: React.FC<EditTodoItemFormProps> = ({item}) => {
    const [form] = Form.useForm();

    const [assigneeName, setAssignee] = useState<string>();
    const [taskText, setText] = useState<string>();
    const [deadlineString, setDeadline] = useState<string>();
    const [taskState, setTaskState] = useState<Int>();

    useEffect(() => {
        setAssignee(item.assignee);
        setTaskState(item.state);
        setText(item.text);
        setDeadline(item.deadline);
    }, [item.assignee, item.state, item.text, item.deadline])

    const onEditClick = (e: Event) => {
        try {
            const editedItem: ITodoItem = {
                id: item.id,
                state: taskState === undefined ? 0 as Int : taskState,
                assignee: assigneeName === undefined ? "No one" : assigneeName,
                text: taskText === undefined ? "No text written" : taskText,
                deadline: deadlineString === undefined ? "not set" : deadlineString
            }
            const editTodoItem = axios.put(
                backEndUrl + 'api/todo/tasks/' + item.id,
                editedItem
            );
            console.log(editTodoItem);
        } catch (e) {
            console.log(e);
        }
    }

    const onSelectChange = (val: any | undefined) => {
        if (val === undefined) {
            setTaskState(0 as Int);
        } else {
            setTaskState(val as Int);
        }
    }

    const onDeadlineChange = (str: string | undefined) => {
        if (str === undefined) {
            setDeadline("not set");
        } else {
            setDeadline(str);
        }
    }

    return (
        <div>
            <Form form={form} onFinish={e => {onEditClick(e)}}>
                <Form.Item name="assignee" label="Assignee">
                    <Input onChange={e => setAssignee(e.target.value)} placeholder={item.assignee} />
                </Form.Item>
                <Form.Item name="text" label="Text" required={true}>
                    <TextArea rows={3} onChange={e => setText(e.target.value)} placeholder={item.text}/>
                </Form.Item>
                <Form.Item name="state" label="State" required={true}>
                    <Select onChange={e => onSelectChange(e?.toString())} placeholder={stateNumToString(item.state)}>
                        <Option value="0">New</Option>
                        <Option value="1">Doing</Option>
                        <Option value="2">Done</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="deadline" label="Deadline" required={true}>
                    <DatePicker onChange={e => onDeadlineChange(e?.format("DD-MM-YYYY"))}/>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='edit-item-btn'>Edit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditTodoItemForm;