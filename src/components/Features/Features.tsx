import React from "react";
import ToDoListSection from "./ToDoList/ToDoListSection";
import Agenda from "./Agenda/Agenda";
import Home from './Home/Home'
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

const { Footer } = Layout

const Features: React.FC = () => {

  return (
    <Layout style={{ marginLeft: 200 }}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/task" element={<ToDoListSection />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
      <Footer style={{ textAlign: 'center' }}>
        Life Manager ©2023 Created by Puriwat Nitijarasrat
      </Footer>
    </Layout>
  )
}

export default Features