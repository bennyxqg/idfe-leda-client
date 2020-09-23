import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, List } from 'antd';
import {
	AppstoreAddOutlined
} from '@ant-design/icons';
import { sectionData } from '@/views/Visualization/data/sectionData';
import VisContext from "@/views/Visualization/context/VisContext";
import classNames from 'classnames'

const Index = (props) => {
	const { showAddModal, setShowAddModal } = useContext(VisContext)
	const [modalVisible] = useState(true)
	const [activeIndex, setActiveIndex] = useState(0)
	const [examples, setExamples] = useState([])

	const [menuList, setMenuList] = useState([
		{value: 'a', label: '模块', icon: <AppstoreAddOutlined />,
			modules: Object.keys(sectionData()).map(key => {
				return {
					value: key,
					label: (sectionData())[key].label,
					examples: (sectionData())[key].examples || []
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

	// 选择模块类型
	const chooseItem = (item, index) => {
		console.log('---chooseItem---', item, index)
		if(index !== activeIndex) {
			setActiveIndex(index)
			setExamples(item.examples || [])
		}
	}

	return (
			<Modal
				title={'新增模块'}
				visible={modalVisible}
				onCancel={handleCancel}
				footer={null}
				wrapClassName='vis-add-section-modal'
				width='800px'
			>
			<div className="vis-add-modal-section-list"> 
				{/* <List
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
				/> */}
				<div className='vis-add-modal-section-list-inner'>
					<div className='section-list'>
						<ul>
							{
								menuList[0].modules.map((item, index) => {
									return <li key={index} 
										className={classNames({
											active: activeIndex === index
										})}
										onClick={() => {chooseItem(item, index)}}>
										<span>{item.label}</span>
										</li>
								})
							}
						</ul>
					</div>
					<div className='section-preview'>
							<div className='section-preview-header'>添加模块</div>
							<div className='section-preview-example'>
								<ul>
									{
										examples.map((item, index) => {
											return (
												<li key={index} >
													<span>
														<img src={item.img} alt='' />
													</span>
												</li>
											)
										})
									}
								</ul>
							</div>
					</div>
				</div>
				
			</div>
		</Modal>
		
	)
}

export default Index