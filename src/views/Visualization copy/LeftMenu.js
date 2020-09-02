import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Popover } from 'antd';
import { formatTime } from '@/utils/helper'
import {
	AppstoreAddOutlined,
	EnvironmentOutlined
} from '@ant-design/icons';

const Index = (props) => {
	const [menuList, setMenuList] = useState([
		{value: 'a', label: '模块', icon: <AppstoreAddOutlined />,
			modules: [
				{value: 'WhiteSection', label: '空白版块'}, 
				{value: 'ImgNews', label: '图文信息'}
			]},
		{value: 'b', label: '元素', icon: <EnvironmentOutlined />,
			modules: [
				{value: 'Button', label: '按钮'}, 
				{value: 'Text', label: '文字'}
			]
		},
	])
	const [currentMenu, setCurrentMenu] = useState('')
	const [moduleList, setModuleList] = useState([])
	const [showModule, setShowModule] = useState(false)

	const chooseModule = (item) => {
		let flag = true
		if(item.value === currentMenu) {
			flag = !showModule
		}
		setShowModule(flag)
		setCurrentMenu(item.value)
		if(flag) {
			setModuleList(item.modules || [])
		} else {
			// setModuleList([])
		}
	}

	const addSection = (item) => {
		props.addSection(item.value)
	}


	return (
		<div className="vis-wrap-leftMenu">
			<ul className="vis-wrap-leftMenu-operation">
				{
					menuList.map(item => (
						<li key={item.value} 
							className='left-bar-item'
							>
								<Popover
									content={
										<ul>
											{
												!!moduleList.length && 
												moduleList.map(item => (
													<li 
														className='vis-wrap-leftMenu-module-item'
														key={item.value} onClick={() => {addSection(item)}}>{item.label}</li>
												))
											}
										</ul>
									}
									placement="right"
									title={'添加' + item.label}
									trigger="click">
									<span onClick={() => {chooseModule(item)}} 
									style={{fontSize: '24px'}}>{item.icon}</span>
								</Popover>
						</li>
					))
				}
			</ul>
			{/* { showModule &&
				<div className="vis-wrap-leftMenu-module">
					{
						moduleList.length &&
						<ul className="">{
							moduleList.map(item => (
								<li key={item.value} onClick={() => {addSection(item)}}>{item.label}</li>
							))
						}
						</ul>
					}
					{
						moduleList.length &&
						<div>
							<ul>
								<li></li>
							</ul>
						</div>
					}
				</div>
			} */}
			
		</div>
	)
}

export default Index