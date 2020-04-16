import React from 'react';
import { Layout } from 'antd';
import SideMenu from './SideMenu'
import MainContent from './MainContent';
import TopHead from './Header'
import BreadCrumb from './BreadCrumb'
import GlobalContext from "./GlobalContext";

const {Content}  = Layout

class index extends React.Component {

  componentWillMount() {
    // 没有token时返回登录页
    const token = localStorage.token;
    if(!token) {
      window.location.href = process.env.publicPath + '/#login'
    }
  }
  
  render() {
    const userInfo = {
      name: localStorage.name
    }
    return (
      <div className="layout">
        <GlobalContext.Provider
          value={{
            userInfo,
          }}
        >
          <Layout style={{ minHeight: '100vh' }}>
            <TopHead/>
            <Layout>
              <SideMenu/>
              <Content>
                <div className="main-content">
                  <BreadCrumb />
                  <MainContent />
                </div>
              </Content>
            </Layout>
          </Layout>
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default index;