import React from "react";
import { Layout } from 'antd'
import IncomingTask from "./Components/IncomingTask";
import SubHeader from "../../UI/SubHeader";

const { Content } = Layout

const Home: React.FC = () => {

  return (
    <Content>
      <SubHeader text="What's coming this week." />
      <IncomingTask />
    </Content>
  )
}

export default Home