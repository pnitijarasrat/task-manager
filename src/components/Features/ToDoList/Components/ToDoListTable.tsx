import React, { useState } from "react";
import { Table, Tag, Space, Button, Typography, Popover } from "antd";
import type { ColumnsType } from 'antd/es/table';
import type { TaskType } from "../../../API/useTaskAPI";
import type { newTagType } from "../../../API/useSettingAPi";
import getTagColor from "../../../Function/getTagColor";

import moment from "moment";
import { CheckOutlined, DeleteOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import Block from "../../../UI/Block";
import EditModal from "./EditModal";

interface TableProp {
  data: TaskType[]
  isLoading: boolean
  tagsArr: newTagType[]
  done: (record: TaskType) => void
  isFinishing: boolean
  deleteTask: (id: string) => void
  isDeleting: boolean
  get: () => void
}

const { Text, Title } = Typography

const ToDoListTable: React.FC<TableProp> = ({ data, isLoading, tagsArr, done, isFinishing, deleteTask, isDeleting, get }) => {

  const [editingId, setEditingId] = useState<string>('')
  const [editModal, setEditModal] = useState<boolean>(false)

  const handleEdit = (id: string) => {
    setEditingId(id)
    setEditModal(true)
  }

  const columns: ColumnsType<TaskType> = [
    {
      title: "#",
      width: '5%',
      dataIndex: "index",
      align: 'center'
    },
    {
      title: "Task",
      dataIndex: 'taskName',
      render: (_, record) => {
        return (
          <span>{record.taskName}</span>
        )
      }
    },
    {
      title: "Tags",
      width: '10%',
      dataIndex: 'tags',
      align: 'center',
      render: (_, record) =>
        <Tag color={getTagColor(record.tags, tagsArr)}>
          {record.tags}
        </Tag>
    },
    {
      title: 'Days Left',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        const daysLeft = moment(record.dueDate).diff(moment(), 'days') + 1
        const type = daysLeft > 7 ? 'success' : (daysLeft <= 3 ? 'danger' : 'warning')
        return <Text type={type}>{daysLeft}</Text>
      }
    },
    {
      title: "Due Date",
      dataIndex: 'dueDate',
      width: '10%',
      align: 'center',
    },
    {
      title: "Owner",
      dataIndex: 'owner',
      width: '10%',
      align: 'center',
    },
    {
      title: "Status",
      dataIndex: 'isDone',
      width: '10%',
      align: 'center',
      render: (_, record) => <Text type={record.isDone ? 'success' : 'danger'}>
        {record.isDone ? 'Done' : 'Not Done'}
      </Text>
    },
    {
      title: "Action",
      dataIndex: 'key',
      width: '10%',
      render: (_, record) => <Popover
        content={
          <Space>
            <Button type="primary" ghost onClick={() => done(record)}>
              {!record.isDone ? <CheckOutlined rev="..." /> : <CloseOutlined rev="..." />}
            </Button>
            <Button type="primary" ghost onClick={() => (handleEdit(record.key))}>
              <EditOutlined rev="..." />
            </Button>
            <Button danger ghost onClick={() => deleteTask(record.key)}>
              <DeleteOutlined rev="..." />
            </Button>
          </Space >
        }
        trigger="click"
      >
        <Button>Action</Button>
      </Popover >,
      align: 'center'
    },
  ]

  return (
    <>
      {editModal &&
        <EditModal
          isOpen={editModal}
          id={editingId}
          closeHandler={() => setEditModal(false)}
          task={data.filter((d) => (d.key === editingId))[0]}
          get={get}
        />}
      <Block>
        <Title level={2}>Active</Title>
        <Table
          columns={columns}
          dataSource={data.filter((d) => (d.owner)).map((d, index) => ({ ...d, index: index + 1 }))}
          size="small"
          bordered={true}
          loading={isLoading || isFinishing || isDeleting}
        />
      </Block>
      <Block>
        <Title level={2}>Inactive</Title>
        <Table
          columns={columns}
          dataSource={data.filter((d) => (!d.owner)).map((d, index) => ({ ...d, index: index + 1 }))}
          size="small"
          bordered={true}
          loading={isLoading || isFinishing || isDeleting}
        />
      </Block>
    </>
  )
}

export default ToDoListTable
