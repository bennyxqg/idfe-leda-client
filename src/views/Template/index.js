import React from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import './index.less'
import {
	FormOutlined,
	EyeOutlined
} from '@ant-design/icons';
import tempIcon from '@/assets/images/visualization/temp-icon.png'
import { getWebsiteAddress } from '@/http/hvisualization'

const CardComp = (props) => {
	return (
		<div>
			<div className='template-item-info'>
				<img src={tempIcon} alt='' />
				<div>
					<h3>{props.title}</h3>
					<p>{props.desc}</p>
				</div>
			</div>
			<div className='template-item-btns'> 
				<div onClick={props.editCB}><FormOutlined /><span>&nbsp;编辑</span></div>
				<div onClick={props.previewCB}><EyeOutlined /><span>&nbsp;预览</span></div>
			</div>
		</div>
	)
}

class Index extends React.Component  {
	state = {
		address: {}
	};

	componentDidMount() {
		this.websiteAddress()
	}

	// 编辑
	toEdit(type) {
		if(type === 'pc' || type === 'wap' || type === 'guide') {
			this.props.history.push({ 
				pathname : `/visualization`,
				// query:{
				// 	type
				// }
				// query : { name: ' sunny'}
				search: `?type=${type}`
			})
		} else{
			message.warning('正在开发中...');
		}
	}

	// 预览
	toPreview(type) {
		let addressStr = ''
		if(type === 'wap') {
			addressStr = '/wap' + addressStr
		}
		if(this.state.address.index) {
			addressStr = this.state.address.index + addressStr
		} else {
			message.warning('请先配置站点域名！');
		}
		
		window.open(addressStr)
	}

	websiteAddress() {
		const sendData = {}
		getWebsiteAddress(sendData).then((rep) => {
			if(rep.error_code === 0) {
				this.setState({
					address: rep.data
				})
			} else {
				message.error(rep.msg);
			}
		})
	}

	render() {
		return (
			<div className="">
				<div className="template-page">
					<div>
						<ul>
							<li className="template-item"> 
								<CardComp 
									title='电脑端官网模板'
									desc='通过可视化的模块化编辑，搭建电脑端的官网。'
									editCB={() => {this.toEdit('pc')}}
									previewCB={() => {this.toPreview('pc')}}
								/> 
							</li>
							<li className="template-item"> 
								<CardComp 
									title='手机端官网模板'
									desc='通过可视化的模块化编辑，搭建个性化的手机端官网。'
									editCB={() => {this.toEdit('wap')}}
									previewCB={() => {this.toPreview('wap')}}
								/> 
							</li>
							{/* <li className="template-item"> 
								<CardComp 
									title='落地页模板'
									desc='快速搭建搭建个性化的落地页。'
									editCB={() => {this.toEdit('guide')}}
									previewCB={() => {this.toPreview('wap')}}
								/> 
							</li> */}
						</ul>
						
						
					</div>
					
				</div>
			</div>
		)
	}
}

export default Index