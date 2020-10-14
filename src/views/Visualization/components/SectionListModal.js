import React, {useState, useEffect, useContext} from "react";
import { Modal } from 'antd';
import {
	AppstoreAddOutlined
} from '@ant-design/icons';
import { sectionData } from '@/views/Visualization/data/sectionData';
import VisContext from "@/views/Visualization/context/VisContext";
import classNames from 'classnames'
import {cloneDeep, merge} from "lodash";

const Index = (props) => {
	const { pageKind, showAddModal, setShowAddModal } = useContext(VisContext)
	const [modalVisible] = useState(true)
	const [activeIndex, setActiveIndex] = useState()
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

	useEffect(() => {
		if(menuList[0].modules.length) {
			chooseItem(menuList[0].modules[0], 0)
		}
		
  }, []);

  const handleCancel = () => {
		const data = {
			show: false
		}
		if(typeof showAddModal.index !== 'undefined') {
			data.index = showAddModal.index
		}
    setShowAddModal(data)
	}
	
	const addSection = (item) => {
		const tempItem = cloneDeep(item)
		// 合并wap的数据
		if(pageKind === 'wap') {
			if(tempItem && tempItem.wapData) {
				merge(tempItem.data, tempItem.wapData.data)
			}
		}
		if(props.addSection) {
			props.addSection(tempItem)
		}
		handleCancel()
	}

	// 选择模块类型
	const chooseItem = (item, index) => {
		if(index !== activeIndex) {
			setActiveIndex(index)
			let examplesTemp = []
			if(item.examples) {
				examplesTemp = cloneDeep(item.examples)
				examplesTemp.forEach(e => {
					e.value = item.value
				});
			}
			setExamples(examplesTemp)
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
												<li key={index} onClick={()=> {addSection(item)}}>
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