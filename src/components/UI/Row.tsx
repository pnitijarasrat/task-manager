import React from "react";
import { Space, Divider } from "antd";

interface RowProps {
  children: React.ReactNode
  center?: boolean
}



const Content: React.FC<RowProps> = ({ children, center }) => {

  const rowStyle = {
    display: "flex",
    flex: '1',
    // padding: "0 16px",
    // width: '100%',
    // margin: '0 auto'
  }

  return (
    <>
      <Space style={rowStyle}>
        <div>
          {children}
        </div>

      </Space>
      <Divider />
    </>
  )
}
export default Content

export const Row: React.FC<RowProps> = ({ children }) => {
  return (
    <div style={{ margin: "8px 0" }}>
      {children}
    </div>
  )
}
