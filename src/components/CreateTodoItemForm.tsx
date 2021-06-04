import { Form, Input, Select, DatePicker, Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { backEndUrl } from '../App';
import { ITodoItem } from '../types/types'
import { Int } from '../types/types';

const { Option } = Select;
const { TextArea } = Input;

const CreateTodoItemForm = () => {
    const [form] = Form.useForm();

    const [assigneeName, setAssignee] = useState<string>();
    const [taskText, setText] = useState<string>();
    const [deadlineString, setDeadline] = useState<string>();
    const [taskState, setTaskState] = useState<Int>();

    const onCreateClick = (e: Event) => {
        try {
            const item: Omit<ITodoItem, "id"> = {
                state: taskState === undefined ? 0 as Int : taskState,
                assignee: assigneeName === undefined ? "No one" : assigneeName,
                text: taskText === undefined ? "No text written" : taskText,
                deadline: deadlineString === undefined ? "not set" : deadlineString
            }
            const saveTodoItem = axios.post(
                backEndUrl + 'api/todo/tasks',
                item
            );
            console.log(saveTodoItem);
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
            <Form form={form} onFinish={e => {onCreateClick(e)}}>
                <Form.Item name="assignee" label="Assignee">
                    <Input onChange={e => setAssignee(e.target.value)} />
                </Form.Item>
                <Form.Item name="text" label="Text" required={true}>
                    <TextArea rows={3} onChange={e => setText(e.target.value)}/>
                </Form.Item>
                <Form.Item name="state" label="State" required={true}>
                    <Select placeholder="New" onSelect={onSelectChange}>
                        <Option value="0" key="0">New</Option>
                        <Option value="1" key="1">Doing</Option>
                        <Option value="2" key="2">Done</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="deadline" label="Deadline" required={true}>
                    <DatePicker onChange={e => onDeadlineChange(e?.format("DD-MM-YYYY"))} />
                </Form.Item>
                <Form.Item style={{width: '100%'}}>
                    <Button type='primary' htmlType='submit' className='create-item-btn'>Create</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateTodoItemForm;