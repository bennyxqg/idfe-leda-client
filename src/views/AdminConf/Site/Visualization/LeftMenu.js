import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'

const Index = (props) => {
	const [menuList, setMenuList] = useState([
		{value: 'a', label: 'a', 
			modules: [{value: 'WhiteSection', label: '空白版块'}, {value: 'ImgNews', label: '图文信息'}]},
		{value: 'b', label: 'b'},
		{value: 'c', label: 'c'},
		{value: 'd', label: 'd'},
		{value: 'e', label: 'e'},
		{value: 'f', label: 'f'}
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
			setModuleList(item.modules)
		} else {
			setModuleList([])
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
						<li key={item.value} onClick={() => {chooseModule(item)}}>{item.label}</li>
					))
				}
			</ul>
			{ showModule &&
				<div className="vis-wrap-leftMenu-module">
					{
						currentMenu === 'a' &&
						<ul className="">{
							moduleList.map(item => (
								<li key={item.value} onClick={() => {addSection(item)}}>{item.label}</li>
							))
						}
						</ul>
					}
				</div>
			}
			
		</div>
	)
}

export default Index