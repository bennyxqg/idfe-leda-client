import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { formatTime } from '@/utils/helper'
import SiteContent from './SiteContent'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import SectionListModal from '@/views/Visualization/components/SectionListModal'
import HeaderComp from './HeaderComp'
import VisContext from "./VisContext";
import './index.scss'
import { randomCode } from '@/utils/helper'
import update from 'immutability-helper';
import { sectionData } from './sectionData';
import RNDContext from '@/views/Visualization/RNDContext'
import { configGet } from '@/http/hvisualization'
import { getAllNewsByGroup, getAllCarouselByGroup, getAllNews } from '@/utils/data'
import lodash from 'lodash'

const Index = () => {
	const [newSectionType, setNewSectionType] = useState(null)
	// 所有模块数据
	const [sectionList, setSectionList] = useState([])
	// 当前选中的模块
	const [chooseSection, setChooseSection] = useState(null)
	// 所有元素数据
	const [elementList, setElementList] = useState([
		// {
		// 	type: 'button',
		// 	data: {
		// 		top: 20,
		// 		left: 0,
		// 		text: 'test1'
		// 	}
		// }
	])
	// 所有新闻数据
	const [allNews, setAllNews] = useState([])
	// 所有新闻数据
	const [lastestNews, setLastestNews] = useState([])
	// 所有图片数据
	const [allPic, setAllPic] = useState([])
	// 所有图片数据
	const [showAddModal, setShowAddModal] = useState({
		show: false
	})

	useEffect(() => {
		console.log('-------chooseSection-------', chooseSection)
	}, [chooseSection]);

	useEffect(() => {
		const init = async () => {
			const newsList = await getAllNews()
			setLastestNews(newsList)
			const cateList = await getAllNewsByGroup(newsList)
			setAllNews(cateList)
			const imgList = await getAllCarouselByGroup()
			setAllPic(imgList)
			getJSONData(imgList)
		}
		init()
	}, []);

	// 获取数据库数据
	const getJSONData = (imgList) => {
		configGet().then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data && rep.data.moduleList) {
					const list = buildModuleData(imgList, rep.data.moduleList)
					setSectionList(rep.data.moduleList)
				}
			}
		})
	}

	// 构造数据
	const buildModuleData = (imgList, list) => {
		list.forEach((item) => {
			if(item.type === 'imgNews' || item.type === 'carouselSection') {
				const groupId = item.data.imgs.groupId
				if(groupId) {
					imgList.some((img) => {
						if(img.id == groupId) {
							item.data.imgs.list = lodash.cloneDeep(img.list) 
							return true
						}
						return false
					})
				}
				
			}
		})
	}
	
	// 新增模块
	const addSection = (type) => {
		// setNewSectionType(Object.assign((sectionData())[type], {
		// 	sectionId: randomCode(10)
		// }))
		const newItem = Object.assign((sectionData())[type], {
			sectionId: randomCode(10)
		})
		const sectionListTemp = lodash.cloneDeep(sectionList)
		if(typeof showAddModal.index !== 'undefined') {
			sectionListTemp.splice(showAddModal.index, 0, newItem);
		} else {
			sectionListTemp.push(newItem)
		}
		setSectionList(sectionListTemp)
	}

	const rightFormFinish = (data) => {
		setChooseSection(update(chooseSection, {$merge:{
			imgs: [data.cover]
		}}))
	}

	const getImgList = (...props) => {
		console.log('-----getImgList-------', props)
	}

	// 拖拽上下文
	const manager = useRef(RNDContext);

	return (
		<VisContext.Provider
			value={{
				sectionList,
				setSectionList,
				chooseSection,
				setChooseSection,
				elementList,
				setElementList,
				lastestNews,
				allNews,
				setAllNews,
				allPic,
				setAllPic,
				showAddModal,
				setShowAddModal
			}}
		>
			<div className="visualization-wrap">
				{/* <DndDemo /> */}
				<HeaderComp />
				<DndProvider manager={manager.current.dragDropManager}>
					<SiteContent newSection={newSectionType}  />
				</DndProvider>
				<LeftMenu addSection={addSection} />
				{/* <RightMenu onFinish={rightFormFinish} /> */}
				{
						// 显示添加模块的弹窗
					showAddModal && showAddModal.show &&
					<SectionListModal 
						addSection={addSection}
						index={showAddModal.index}
					/>
				}
			</div>
		</VisContext.Provider>
	)
}

export default Index