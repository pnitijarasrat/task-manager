import React from "react";
import { VictoryPie } from 'victory'
import type { TaskType } from "../../../API/useTaskAPI";
import type { newTagType } from "../../../API/useSettingAPi";
import getTagColor from "../../../Function/getTagColor";

interface ToDoListChartType {
  taskArr: TaskType[]
  tagArr: newTagType[]
}

interface ChartData {
  x: string
  y: number
}

const mappedArr = (taskArr: TaskType[], mappedArray: any, tagArr: newTagType[]) => {
  // eslint-disable-next-line array-callback-return
  taskArr.map((task) => {
    if (mappedArray[task.tags]) {
      mappedArray[task.tags].push(task.taskName);
    } else {
      mappedArray[task.tags] = [task.taskName];
    }
  });

  const colorArr: string[] = []
  for (let i in mappedArray) {
    colorArr.push(getTagColor(i, tagArr))
  }

  const data: ChartData[] = []
  for (let i in mappedArray) {
    data.push({ x: i, y: mappedArray[i].length })
  }

  return { data, colorArr }
}

const ToDoListChart: React.FC<ToDoListChartType> = ({ taskArr, tagArr }) => {
  const mappedArray: any = {}
  const { data, colorArr } = mappedArr(taskArr, mappedArray, tagArr)

  return (
    <VictoryPie
      height={230}
      data={data}
      colorScale={colorArr}
      innerRadius={80}
    />
  )
}

export default ToDoListChart