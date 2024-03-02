import React from 'react';
import NavMenu from './components/Menu/Menu';
import { BrowserRouter } from "react-router-dom";
import './App.css'
import Features from './components/Features/Features';
import { Layout } from 'antd';

const { Header, Sider } = Layout;

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}>
          <NavMenu />
        </Sider>
        <Features />
      </Layout>
    </BrowserRouter>
  );

}

export default App;
