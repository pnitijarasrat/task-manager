import React, { useState, useEffect } from "react";
import ToDoListTable from "./Components/ToDoListTable";
import TaskDrawer from "./Components/TaskDrawer";
import useSettingAPI from "../../API/useSettingAPi";
import useTaskAPI, { TaskType } from "../../API/useTaskAPI";
import Block from "../../UI/Block";
import SubHeader from "../../UI/SubHeader";

import { Layout, Button, Typography } from 'antd'

const { Content, } = Layout
const { Title } = Typography

const ToDoListSection: React.FC = () => {

  const [taskDrawer, setTaskDrawer] = useState(false)

  const { task, getTask, isGettingTask, doneTask, isFinishing, deleteTask, isDeleting } = useTaskAPI()
  const { tag, getTag } = useSettingAPI()

  const handleFinishTask = async (record: TaskType) => {
    await doneTask(record)
    getTask()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
    getTask()
  }

  useEffect(() => {
    getTask()
    getTag()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content>
      <SubHeader text="Task" />
      <Block >
        <Button type="primary" block onClick={() => setTaskDrawer(true)}>Add Task</Button>
      </Block>
      <Block>
        <TaskDrawer open={taskDrawer} onClose={() => setTaskDrawer(false)} get={getTask} tagsArr={tag} />
        <ToDoListTable data={task} isLoading={isGettingTask} tagsArr={tag} done={handleFinishTask} isFinishing={isFinishing}
          deleteTask={handleDeleteTask} isDeleting={isDeleting}
        />
      </Block>
    </ Content>
  )
}

export default ToDoListSection