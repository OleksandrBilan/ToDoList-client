import { Form, Input, Select, DatePicker, Button } from 'antd';
import { Int } from '../types/types';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ITodoItem } from '../types/types'

const { Option } = Select;

interface EditTodoItemFormProps {
    item: ITodoItem;
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
                'https://localhost:44380/api/todo/tasks/' + item.id,
                editedItem
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

    const stateNumToString = (num: Int) => {
        switch(num) {
            case 0: return "New";
            case 1: return "Doing";
            case 2: return "Done";
        }
    }

    return (
        <div>
            <Form form={form} onFinish={e => {onEditClick(e)}}>
                <Form.Item name="assignee" label="Assignee">
                    <Input onChange={e => setAssignee(e.target.value)} placeholder={item.assignee} />
                </Form.Item>
                <Form.Item name="text" label="Text" required={true}>
                    <Input onChange={e => setText(e.target.value)} placeholder={item.text} />
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
                    <Button type='primary' htmlType='submit'>Edit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditTodoItemForm;