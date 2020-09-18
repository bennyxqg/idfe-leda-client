import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, List } from 'antd';
import {
	AppstoreAddOutlined
} from '@ant-design/icons';
import { sectionData } from '@/views/Visualization/data/sectionData';
import VisContext from "@/views/Visualization/context/VisContext";

const Index = (props) => {
	const { showAddModal, setShowAddModal } = useContext(VisContext)
	const [modalVisible] = useState(true)

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

	const handleOk = (value) => {
    // props.modalChange(false);
  }

  const handleCancel = () => {
		const data = {
			show: false
		}
		if(typeof showAddModal.index !== 'undefined') {
			data.index = showAddModal.index
		}
    setShowAddModal(data)
	}
	
	// 
	const addSection = (item) => {
		if(props.addSection) {
			props.addSection(item.value)
		}
		handleCancel()
	}

	return (
			<Modal
				title={'新增模块'}
				visible={modalVisible}
				onCancel={handleCancel}
				footer={null}
				width='400px'
			>
			<div className="vis-add-modal-section-list"> 
				<List
					style={{cursor: 'pointer'}}
					size="small"
					bordered
					dataSource={menuList[0].modules}
					renderItem={item => {
						return (
							<List.Item onClick={()=> {addSection(item)}}>
								<div>
									{item.label}
								</div>
							</List.Item>
						)
					}}
				/>
			</div>
		</Modal>
		
	)
}

export default Index