import { Form, Input, Select, DatePicker, Button } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { ITodoItem } from '../types/types'
import { Int } from '../types/types';

const { Option } = Select;

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
                'https://localhost:44380/api/todo/tasks',
                item
            );
        } catch (e) {
            console.log(e);
        }
    }

    const onSelectChange = (str: string | undefined) => {
        if (str === undefined) {
            setTaskState(0 as Int);
        } else {
            switch(str) {
                case "New": setTaskState(0 as Int); break;
                case "Doing": setTaskState(1 as Int); break;
                case "Done": setTaskState(2 as Int); break;
            }
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
                    <Input onChange={e => setText(e.target.value)} />
                </Form.Item>
                <Form.Item name="state" label="State" required={true}>
                    <Select placeholder="New" onChange={e => onSelectChange(e?.toString())}>
                        <Option value="0">New</Option>
                        <Option value="1">Doing</Option>
                        <Option value="2">Done</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="deadline" label="Deadline" required={true}>
                    <DatePicker onChange={e => onDeadlineChange(e?.format("DD-MM-YYYY"))} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Create</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateTodoItemForm;