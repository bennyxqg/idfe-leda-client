import React, {useState, useEffect, useRef, useContext} from "react";
import { Table, Button, Form, Select, Input, message, Popover } from 'antd';
import { formatTime } from '@/utils/helper'
import {
	AppstoreAddOutlined,
	EnvironmentOutlined
} from '@ant-design/icons';
import {sectionData} from '@/views/Visualization/sectionData'
import VisContext from "@views/Visualization/VisContext";

const Index = (props) => {
	const { chooseSection, setChooseSection, sectionList, setSectionList, setShowAddModal } = useContext(VisContext)

	const [menuList, setMenuList] = useState([
		{value: 'a', label: '模块', icon: <AppstoreAddOutlined />,
			modules: Object.keys(sectionData()).map(key => {
				return {
					value: key,
					label: (sectionData())[key].label
				}
			})},
		// {value: 'b', label: '元素', icon: <EnvironmentOutlined />,
		// 	modules: [
		// 		{value: 'Button', label: '按钮'}, 
		// 		{value: 'Text', label: '文字'}
		// 	]
		// },
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
								{/* <Popover
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
								</Popover> */}
								<span onClick={() => {chooseModule(item)}} 
									style={{fontSize: '24px'}}>{item.icon}</span>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default Index