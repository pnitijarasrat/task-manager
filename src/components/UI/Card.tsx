import { Card } from "antd";
import React from "react";

interface CardProps {
  width: number,
  title?: string,
  children: React.ReactNode
}

const UICard: React.FC<CardProps> = ({ width, title, children }) => {

  return (
    <Card
      style={{ width: width, height: 'auto' }}
      title={title}>
      {children}
    </Card>
  )
}

export default UICard