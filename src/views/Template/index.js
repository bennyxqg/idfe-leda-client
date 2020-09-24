import React from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import './index.less'
import {
	FormOutlined,
	EyeOutlined
} from '@ant-design/icons';
import tempIcon from '@/assets/images/visualization/temp-icon.png'

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
		
	};

	// 编辑
	toEdit(type) {
		if(type === 'pc') {
			this.props.history.push({ pathname: `/visualization` })
		} else {
			message.warning('正在开发中...');
		}
	}

	// 预览
	toPreview(type) {
		message.warning('正在开发中...');
		return
		if(type === 'pc') {
			this.props.history.push({ pathname: `/visualization` })
		} else {
			message.warning('功能开发中，敬请期待...');
		}
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
							<li className="template-item"> 
								<CardComp 
									title='落地页模板'
									desc='快速搭建搭建个性化的落地页。'
									editCB={() => {this.toEdit('wap')}}
									previewCB={() => {this.toPreview('wap')}}
								/> 
							</li>
						</ul>
						
						
					</div>
					
				</div>
			</div>
		)
	}
}

export default Index