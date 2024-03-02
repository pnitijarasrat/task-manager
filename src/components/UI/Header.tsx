import React from "react";
import { Typography, Button } from "antd";
import { Row } from "./Row";

interface HeaderProp {
  title: string
  icon?: React.ReactNode
  button?: string
  onButtonClick?: () => void
  primary?: boolean
}

const Header: React.FC<HeaderProp> = ({ icon, title, button, onButtonClick, primary }) => {
  const { Title } = Typography

  return (
    <Row>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', }}>
        <Title>{icon}{'    '}{title}</Title>
        {button && <Button
          type={primary ? "primary" : "default"}
          onClick={onButtonClick}
        >
          {button}
        </Button>}
      </div>
    </Row>
  )
}

export default Header