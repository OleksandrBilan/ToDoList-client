import React, { useState  } from 'react';
import { Button, Menu, Modal } from 'antd';
import CreateTodoItemForm from './CreateTodoItemForm';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

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
        <Menu mode="horizontal">
            <Menu.Item key="mail">
                <Button type="primary" onClick={showModal}>
                    New Task
                </Button>
                <Modal title="New Task" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} footer={[]}>
                    <CreateTodoItemForm />
                </Modal>
            </Menu.Item>
        </Menu>
    );
}

export default Navbar;