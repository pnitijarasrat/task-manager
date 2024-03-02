import React from "react";
import { Table, Typography } from "antd";
import { TaskType } from "../../../API/useTaskAPI";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

interface IncomingTaskTableProp {
    data: TaskType[]
    isLoading: boolean
}

const { Text } = Typography

const IncomingTaskTable: React.FC<IncomingTaskTableProp> = ({
    data,
    isLoading
}) => {

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
            title: "Status",
            dataIndex: 'isDone',
            width: '10%',
            align: 'center',
            render: (_, record) => <Text type={record.isDone ? 'success' : 'danger'}>
                {record.isDone ? 'Done' : 'Not Done'}
            </Text>
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={data.map((d, index) => ({ ...d, index: index + 1 }))}
                loading={isLoading}
            />
        </>
    )
}

export default IncomingTaskTable