import React, { useEffect } from "react";

import Block from "../../../UI/Block";
import useTaskAPI from "../../../API/useTaskAPI";
import IncomingTaskTable from "./IncomingTaskTable";

import { Typography } from "antd";
import moment from "moment";

const { Title } = Typography

const IncomingTask: React.FC = () => {
    const { task, getTask, isGettingTask } = useTaskAPI()

    const currentDate = moment();
    const previousSunday = currentDate.clone().startOf('week');
    const nextSunday = currentDate.clone().endOf('week').add(1, 'day');

    useEffect(() => {
        getTask()
    }, [])

    return (
        <>
            <Block>
                <Title level={3}>Tasks due this week.</Title>
                <IncomingTaskTable
                    data={task.filter((task) => (moment(task.dueDate).isBetween(previousSunday, nextSunday, 'day')))}
                    isLoading={isGettingTask}
                />
            </Block>
        </>
    )
}

export default IncomingTask