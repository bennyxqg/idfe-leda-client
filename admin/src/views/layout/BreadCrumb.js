import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb} from 'antd';
import { menus } from '@src/router/menus';

class BreadCrumb extends React.Component {
  render(){
    const { location } = this.props
    const list = menus.filter(key => key.path === location.pathname)
    const name = list.length ? list[0].name : ''
    return (
      <div className="breadCrumb">
          <Breadcrumb>
            <Breadcrumb.Item>{name}</Breadcrumb.Item>
          </Breadcrumb>
      </div>
    )
  }
}

export default withRouter(BreadCrumb)