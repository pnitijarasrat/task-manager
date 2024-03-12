import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import useTaskAPI, { TaskType } from "../../../API/useTaskAPI";

interface EditModalProp {
    isOpen: boolean
    id: string
    closeHandler: () => void
    task: TaskType
    get: () => void
}

const EditModal: React.FC<EditModalProp> = ({ isOpen, id, closeHandler, task, get }) => {

    const [editForm] = Form.useForm()

    const { updateTask, isFinishing } = useTaskAPI()

    const handleUpdate = async () => {
        await updateTask({ key: id, ...editForm.getFieldsValue() })
        get()
        closeHandler()
    }

    useEffect(() => {
        editForm.setFieldsValue(task)
    }, [])

    return (
        <Modal
            footer={null}
            closeIcon={null}
            title="Edit Task"
            open={isOpen}
            destroyOnClose={true}
        >
            <Form
                form={editForm}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <>
                    <Form.Item label="Task Name" name="taskName">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Tag" name="tags">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Owner" name="owner">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Due Date" name="dueDate">
                        <Input disabled />
                    </Form.Item>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: '16px' }}>
                        <Button onClick={closeHandler}>Cancel</Button>
                        <Button type="primary" onClick={handleUpdate}>Save</Button>
                    </div>
                </> :
            </Form>
        </Modal>
    )
}

export default EditModal