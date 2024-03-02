import React, { useState } from "react";
import { Button, Input, DatePicker, Drawer, Form, Space, TimePicker } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from "moment";
import useAgendaAPI, { newAgendaType } from "../../../API/useAgendaAPI";
import { newTaskType } from "../../../API/useTaskAPI";


const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
  return current < moment().startOf('day');
};

const formRules = [{ required: true }]

interface AgendaDrawerProp {
  isOpen: boolean
  onClose: () => void
  get: () => void
}

const timeConverter = (timeRange: any[]) => {
  const start = timeRange[0].format('HH:mm:ss')
  const end = timeRange[1].format('HH:mm:ss')
  return `${start} - ${end}`
}

const AgendaDrawer: React.FC<AgendaDrawerProp> = ({
  isOpen,
  onClose,
  get
}) => {

  const [form] = Form.useForm()
  const { bookAgenda, isBooking } = useAgendaAPI()

  const handleSubmit = async () => {
    const p: newAgendaType = {
      appointee: form.getFieldValue('appointee'),
      location: form.getFieldValue('location'),
      titleName: form.getFieldValue('titleName'),
      date: form.getFieldValue('date').format('YYYY-MM-DD'),
      time: timeConverter(form.getFieldValue('time'))
    }
    await bookAgenda(p)
    form.setFieldsValue({
      appointee: '',
      location: '',
      titleName: '',
      date: '',
      time: ''
    })
    get()
  }

  return (
    <Drawer
      open={isOpen}
      title="Book Agenda"
      placement="right"
      width={400}
      closeIcon={null}
    >
      <Form form={form}>
        <Form.Item rules={formRules} name="titleName">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item rules={formRules} name="appointee">
          <Input placeholder="Appointee" />
        </Form.Item>
        <Form.Item rules={formRules} name="location">
          <Input placeholder="Location" />
        </Form.Item>
        <Form.Item rules={formRules} name="date">
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item rules={formRules} name="time">
          <TimePicker.RangePicker />
        </Form.Item>
        <Space>
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            {isBooking ? 'Booking' : 'Book'}
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </Space>
      </Form>

    </Drawer>
  )
}

export default AgendaDrawer