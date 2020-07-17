import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { menus } from '@/router/menus';

class BreadCrumb extends React.Component {
  createBreadCrumbData(location, data){
    let arrA = [];
    let arrB = [];
    let arrC = [];
    data.forEach(a => {
			if (location.pathname === a.path) {
				arrA.push(a);
			}
			if (a.child && a.child.length > 0) {
				a.child.forEach(b => {
					if (location.pathname === b.path) {
						arrB.push(b);
						arrA.push({
							path: a.path,
							name: a.name
						});
					}
					if (b.child && b.child.length > 0) {
						b.child.forEach(c => {
							if (location.pathname === c.path) {
								arrC.push(c);
								arrB.push({
									path: b.path,
									name: b.name
								});
								arrA.push({
									path: a.path,
									name: a.name
								});
							}
						});
					}
				});
			}
		});
		return [...arrA, ...arrB, ...arrC];
  }
  render(){
    const { location } = this.props
    const routes = this.createBreadCrumbData(location, menus);
    if (!routes.length) return null;
		const itemRender = (route, params, routes, paths) => {
      const last = routes.indexOf(route) === routes.length - 1;
			return last ? <Breadcrumb.Item>{route.name}</Breadcrumb.Item> : <Breadcrumb.Item separator=''><Link to={route.path}>{route.name}</Link></Breadcrumb.Item>;
		};
    return (
      <div className="breadCrumb">
        <Breadcrumb routes={routes} itemRender={itemRender}/>
      </div>
    )
  }
}

export default withRouter(BreadCrumb)