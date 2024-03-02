import React, { useState, useEffect } from "react";

import { Descriptions, Divider, Space, Button, Row, Col, Card, Layout } from "antd";

import { Row as UIRow } from "../../UI/Row";
import AgendaDrawer from "./Components/AgendaDrawer";

import SubHeader from "../../UI/SubHeader";

import useAgendaAPI from "../../API/useAgendaAPI";

import './Components/ReminderCard.css'
import Block from "../../UI/Block";

const { Content } = Layout

const Agenda: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { getAgenda, agenda, isDeleting, deleteAgenda, deletingId } = useAgendaAPI()

  const handleDelete = async (agendaId: string) => {
    await deleteAgenda(agendaId)
    getAgenda()
  }

  useEffect(() => {
    getAgenda()
  }, [])

  return (
    <Content>
      <AgendaDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        get={getAgenda}
      />
      <SubHeader text="Agenda" />
      <Block>
        <Button type="primary" block onClick={() => setIsDrawerOpen(true)}>Book Agenda</Button>
      </Block>
      <Block>
        {agenda.length !== 0 ?
          agenda.map((a) => (
            <UIRow>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Row>
                  <Col span={9}>
                    <Descriptions
                      bordered={true}
                      layout="vertical"
                      title={a.titleName}
                      size="small"
                    >
                      <Descriptions.Item label="Appointee">{a.appointee}</Descriptions.Item>
                      <Descriptions.Item label="Date">{a.date}</Descriptions.Item>
                      <Descriptions.Item label="Time">{a.time}</Descriptions.Item>
                      <Descriptions.Item label="Location">{a.location}</Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={14} push={1}>
                    <Card title="Reminder">
                      Available Soon
                    </Card>
                  </Col>
                </Row>
                <Space>
                  <Button disabled={true}>
                    Edit
                  </Button>
                  <Button
                    ghost={true}
                    danger={true}
                    onClick={() => (handleDelete(a.key))}
                  >
                    {a.key === deletingId && isDeleting ? 'Deleting' : 'Delete'}
                  </Button>
                </Space>
              </Space>
              <Divider />
            </UIRow>
          )) :
          "You have no meeting."
        }
      </Block>
    </Content >
  )
}

export default Agenda