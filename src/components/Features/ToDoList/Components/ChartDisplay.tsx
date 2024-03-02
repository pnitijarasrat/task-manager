
import React from "react";
import { Row, Col, Typography, Card, } from "antd";
import { TaskType } from "../../../API/useTaskAPI";
import { newTagType } from "../../../API/useSettingAPi";

const { Title } = Typography

interface ChartDisplayProp {
    task: TaskType[]
    tag: newTagType[]
}

const ChartDisplay: React.FC<ChartDisplayProp> = ({ task, tag }) => {

    return (
        <Row gutter={[24, 0]}>
            <Col span={8}>
                <Card title="Total Tasks" >
                    <Title><center>{task.length}</center></Title>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Completed Tasks" >
                    <Title type="success"><center>{task.filter((t) => { return t.isDone }).length}</center></Title>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Incompleted Tasks" >
                    <Title type="danger"><center>{task.filter((t) => { return !t.isDone }).length}</center></Title>
                </Card>
            </Col>I
        </Row>
    )
}

export default ChartDisplay