import React from "react";
import { Drawer, Form, Input, ColorPicker, Button, Space } from "antd";
import useSettingAPI from "../API/useSettingAPi";

interface TagsDrawerProp {
  open: boolean
  onClose: () => void
}

const TagsDrawer: React.FC<TagsDrawerProp> = ({ open, onClose }) => {

  const [form] = Form.useForm()

  const { isAddingTag, addTag } = useSettingAPI()

  const handleSubmit = () => {
    addTag({
      ...form.getFieldsValue(),
      color: form.getFieldValue('color').toHexString()
    })
  }

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        placement="left"
        title="Add New Tag"
        closeIcon={null}
      >
        <Space>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="tagsName">
              <Input placeholder="Tags Name" />
            </Form.Item>
            <Form.Item name="color">
              <ColorPicker />
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {isAddingTag ? 'Adding' : 'Add Tag'}
              </Button>
              <Button onClick={onClose}>Close</Button>
            </Space>
          </Form>
        </Space>
      </Drawer >
    </>
  )
}

export default TagsDrawer