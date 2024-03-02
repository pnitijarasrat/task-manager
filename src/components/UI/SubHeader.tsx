import React from "react";

import { Typography } from "antd";

const { Title } = Typography

interface SubHeaderProp {
    text: string
}

const SubHeader: React.FC<SubHeaderProp> = ({ text }) => {

    return (
        <div style={{ 'paddingLeft': '24px' }}>
            <Title>{text}</Title>
        </div>
    )
}

export default SubHeader