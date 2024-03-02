import React from "react";
import { Typography } from 'antd';

interface ReminderCardProp {
  title: string
  children: React.ReactNode
}

const { Title } = Typography

const reminderCardStyle = {
  flexGrow: '1',
  height: '100%',
  border: '1px solid #333',
  borderRadius: '3px'
}

const ReminderCard: React.FC<ReminderCardProp> = ({ title, children }) => {

  return (
    <div style={reminderCardStyle}>
      <Title level={5}>{title}</Title>
      {children}
    </div>
  )
}

export default ReminderCard