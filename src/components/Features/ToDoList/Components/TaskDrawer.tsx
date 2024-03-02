import React, { useState } from "react";
import { Button, Input, DatePicker, Drawer, Form, Select, Space } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker';
import type { newTagType } from "../../../API/useSettingAPi";
import moment from "moment";
import useTaskAPI from "../../../API/useTaskAPI";

interface TaskDrawerProp {
  open: boolean
  onClose: () => void
  get: () => void
  tagsArr: newTagType[]
}

const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
  return current < moment().startOf('day');
};

const TaskDrawer: React.FC<TaskDrawerProp> = ({ open, onClose, get, tagsArr }) => {
  const [selectedTag, setSelectedTag] = useState('')

  const [form] = Form.useForm()

  const { isAdding, addTask } = useTaskAPI()

  const handleChange = (value: string) => {
    setSelectedTag(value)
  };
  const handleSubmit = async () => {
    const p = {
      taskName: form.getFieldValue('taskName'),
      dueDate: form.getFieldValue('dueDate').format('YYYY-MM-DD'),
      tags: selectedTag,
      isDone: false
    }
    await addTask(p)
    form.setFieldsValue({
      taskName: '',
      dueDate: '',

    })
    setSelectedTag('')
    get()
  }


  return (
    <Drawer
      open={open}
      title="Add Task"
      placement="right"
      width={400}
      onClose={onClose}
      closeIcon={null}
    >
      <Form form={form}>
        <Form.Item rules={[{ required: true }]} name="taskName">
          <Input placeholder="Task Name" />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="Tags"
            options={tagsArr.map((t) => ({ label: t.tagsName, value: t.tagsName }))}
            onChange={handleChange}
            value={selectedTag}
          />
        </Form.Item>
        <Form.Item name="dueDate">
          <DatePicker placeholder="Due Date" disabledDate={disabledDate} />
        </Form.Item>
        <Space>
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            {isAdding ? 'Adding' : 'Add Task'}
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </Space>
      </Form>

    </Drawer>
  )
}

export default TaskDrawer