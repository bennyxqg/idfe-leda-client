import React from 'react';
import { Layout } from 'antd';
import SideMenu from './SideMenu'
import MainContent from './MainContent';
import TopHead from './Header'
import BreadCrumb from './BreadCrumb'

const {Content}  = Layout

class index extends React.Component {
  render() {
    return (
      <div className="layout">
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
      </div>
    );
  }
}

export default index;