import React from 'react';
import { Layout, message } from 'antd';
import SideMenu from './SideMenu'
import MainContent from './MainContent';
import TopHead from './Header'
import BreadCrumb from './BreadCrumb'
import GlobalContext from "./GlobalContext";
import { getLoginUser } from '@/http/huser'
import { siteAll } from '@/http/hsite'

const {Content}  = Layout

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null,
      siteList: [],
      currentSite: {}
    }
  }

  setUserInfo = (name) => {
    this.setState({
      userInfo: {
        name
      }
    })
  }

  getAllSite() {
    return siteAll({}).then((rep) => {
      if(rep.error_code === 0) {
			 if(rep.data && rep.data.list) {
				this.setState({siteList: rep.data.list})
			 }
      }
    })
  }

  // 改变当前选中的站点
  changeCurrentSite = (site) => {
    localStorage.setItem('currentSiteId', site.id)
    this.setState({
      currentSite: site
    })
  }

  // 获取登录用户信息
  getUserInfo = async (name) => {
    await this.getAllSite()
    getLoginUser().then((rep) => {
      if(rep.error_code === 0 && rep.data) {
        if(rep.data.site_id) {
          rep.data.site_ids = []
          const siteIds = rep.data.site_id.split(',')
          let firstSite = null
          let cacheSiteId = localStorage.getItem('currentSiteId')
          let cacheSite = null
          // admin用户所有站点的权限
          if(rep.data.name === 'admin') {
            this.state.siteList.forEach((site, index) => {
              const siteTemp = JSON.parse(JSON.stringify(site))
              rep.data.site_ids.push(siteTemp)
              if(index === 0) {
                // this.changeCurrentSite(siteTemp)
                firstSite = siteTemp
              }
              if(cacheSiteId && cacheSiteId == site.id) {
                cacheSite = siteTemp
              }
            })
          } else {
            siteIds.forEach((item, index) => {
              this.state.siteList.some((site) => {
                if(site.id == item) {
                  const siteTemp = JSON.parse(JSON.stringify(site))
                  if(index === 0) {
                    // this.changeCurrentSite(siteTemp)
                    firstSite = siteTemp
                  }
                  if(cacheSiteId && cacheSiteId == site.id) {
                    cacheSite = siteTemp
                  }
                  rep.data.site_ids.push(siteTemp)
                }
              })
            });
          }
          
          if(cacheSite) {
            this.changeCurrentSite(cacheSite)
          } else if(firstSite) {
            this.changeCurrentSite(firstSite)
          } else {
            message.error('请联系管理员分配站点权限');
          }
        }
        this.setState({
          userInfo: rep.data
        })
      }
    })
  }

  componentWillMount() {
    // 没有token时返回登录页
    const token = localStorage.token;
    if(!token) {
      setTimeout(() => {
        window.location.href = process.env.publicPath + '/#login'
      }, 400)
    } else {
      this.getUserInfo()
    }
  }
  
  render() {
    // const userInfo = {
    //   name: localStorage.name
    // }
    const { userInfo, currentSite } = this.state 
    return (
      <div className="layout">
        <GlobalContext.Provider
          value={{
            userInfo: this.state.userInfo,
            setUserInfo: this.setUserInfo,
            currentSite: this.state.currentSite
          }}
        >
          <Layout style={{ minHeight: '100vh' }}>
            <TopHead/>
            <Layout>
              <SideMenu/>
              {
                userInfo && currentSite && <Content>
                  <div className="main-content">
                    <BreadCrumb />
                    <MainContent />
                  </div>
                </Content>
              }
            </Layout>
          </Layout>
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default index;