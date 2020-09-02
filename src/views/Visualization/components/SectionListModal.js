import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Popover, List } from 'antd';
import { formatTime } from '@/utils/helper'
import {
	AppstoreAddOutlined,
	EnvironmentOutlined
} from '@ant-design/icons';
import {sectionData} from '@/views/Visualization/sectionData'

const Index = (props) => {
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


	return (
		<div className="vis-wrap-section-list"> 
			<List
				size="small"
				header={<div>Header</div>}
				footer={<div>Footer</div>}
				bordered
				dataSource={menuList[0].modules}
				renderItem={item => <List.Item>{item.label}</List.Item>}
			/>
		</div>
	)
}

export default Index