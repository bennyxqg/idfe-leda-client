import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Layout, Menu, Dropdown, Select, Message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { toLogout } from '@/http/hlogin'
import logo from '@/assets/images/logo.png'
import '@/assets/css/common.less'
import GlobalContext from "./GlobalContext";
const {Header} = Layout

const { Option } = Select;

class TopHeader extends Component {
  static contextType = GlobalContext;

  state = {
    currentSite: ''
  }

  // componentWillUpdate() {
  //   // 设置默认站点
  //   if(this.context.currentSite) {
  //     this.setState({
  //       currentSite: this.context.currentSite.id
  //     })
  //   }
  // }
  componentDidMount() {
    this.handleSite()
  }

  componentWillReceiveProps() {
    // 设置默认站点
    this.handleSite()
  }

  handleSite() {
    if(this.context.currentSite) {
      this.setState({
        currentSite: this.context.currentSite.id
      })
    }
  }

  onClick(key){
    // localStorage.removeItem('isLogin');
    // localStorage.removeItem('userInfo');
    // toLogout()
    // setTimeout(() => {
    //   localStorage.removeItem('token');
    // }, 1000)
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('currentSiteId');
    this.props.history.push('/login')
  }

  onChange = (value) => {
    console.log(`onChange ${value}`);
    this.setState({
      currentSite: value
    })
    localStorage.setItem('currentSiteId', value)
    Message.warning('切换站点中...')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
    
  }
  
  onSearch = (val) => {
    console.log('search:', val);
  }

  render() {
    let userName = ''
    let siteLists = []
    if(this.context.userInfo) {
      userName = this.context.userInfo.name
      if(this.context.userInfo.site_ids) {
        siteLists = this.context.userInfo.site_ids
      }
    }
    
    const menu = (
      <Menu onClick={(value)=> {this.onClick(value)}}>
        <Menu.Item key="1">退出</Menu.Item>
      </Menu>
    );
    const { currentSite } = this.state
    return (
      <Header className="top-header">
        <div className="header-box">
          <div className="header-logo">
            <img src={logo} alt='logo' />
          </div>
          <div className="header-content">
            <div className="header-site-list">
              <Select
                showSearch
                value={currentSite}
                style={{ width: 200 }}
                placeholder="选择站点"
                optionFilterProp="children"
                onChange={this.onChange}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  siteLists.map((site) => {
                    return <Option key={site.id} value={site.id}>{site.name}</Option>
                  })
                }
              </Select>
            </div>
            <div className="header-user">
              <Dropdown overlay={menu}>
                <span className="ant-dropdown-link">
                  {userName} <DownOutlined />
                </span>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

export default withRouter(TopHeader);