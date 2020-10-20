import React, {useState, useEffect, useRef} from "react";
import { DndProvider } from 'react-dnd';
import SiteContent from './SiteContent'
import LeftMenu from './LeftMenu'
import SectionListModal from '@/views/Visualization/components/SectionListModal'
import PagesModal from '@/views/Visualization/components/Common/PagesModal/index'
import HeaderComp from './HeaderComp'
import VisContext from "@/views/Visualization/context/VisContext";
import './index.scss'
import { randomCode, getQueryVariable } from '@/utils/helper'
import { sectionData } from '@/views/Visualization/data/sectionData';
import RNDContext from '@/views/Visualization/context/RNDContext'
import { configGet, getPageList, getPopupList, allPageList } from '@/http/hvisualization'
import { getAllNewsByGroup, getAllCarouselByGroup, getAllNews } from '@/utils/data'
import {cloneDeep, merge} from 'lodash'
import { useHistory } from "react-router-dom";

const Index = () => {
	let history = useHistory();

	const [pageData, setPageData] = useState([])

	// pc、wap
	const [pageKind, setPageKind] = useState('pc')

	const [pageItem, setPageItem] = useState(null)

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
	// 添加模块弹窗
	const [showAddModal, setShowAddModal] = useState({
		show: false
	})
	// 切换页面弹窗
	const [showPagesModal, setShowPagesModal] = useState({
		show: false
	})

	// 切换页面弹窗
	const [init, setInit] = useState(false)

	useEffect(() => {
		// 切换页面时刷新
		history.listen(route => {
			if(route.pathname === '/visualization') {
				window.location.reload()
			}
		})

		let pathType = getQueryVariable('type', history.location.search)
		if(pathType) {
			if(pathType === 'guide' || pathType === 'wap') {
				setPageKind('wap')
			} else {
				setPageKind(pathType)
			}
		} else {
			setPageKind('pc')
		}

		const initStart = async () => {
			const newsList = await getAllNews()
			setLastestNews(newsList)
			const cateList = await getAllNewsByGroup(newsList)
			setAllNews(cateList)
			const imgList = await getAllCarouselByGroup()
			setAllPic(imgList)
			getJSONData(imgList)
		}
		initStart()
	}, []);

	// 获取数据库数据
	const getJSONData = async (imgList) => {
		const allPageRep = await allPageList()
		let indexId = getQueryVariable('id', history.location.search)
		let pageType = getQueryVariable('type', history.location.search)
		const pageDataTemp = allPageRep.data.map(item=> {
			let typeStr = ''
			if(item.type == 0) {
				typeStr = 'pc'
			} else if(item.type == 1) {
				typeStr = 'popup'
			} else if(item.type == 2) {
				typeStr = 'guide'
			} else if(item.type == 3) {
				typeStr = 'wap'
			}
			return {
				id: item.id,
				name: item.name,
				identifer: item.identifer,
				type: typeStr
			}
		})
		let currentPage = null
		pageDataTemp.some((page) => {
			if(indexId) {
				if(page.id == indexId) {
					// setPageType(page.type == 1?'page':'popup')
					currentPage = page
					setPageItem(page)
					return true
				}
			} else if(pageType && page.type === pageType) {
				currentPage = page
				indexId = page.id
				setPageItem(page)
				return true
			} 
			return false
		})
		if(!currentPage) {
			pageDataTemp.some((page) => {
				if(page.identifer === 'index') {
					currentPage = page
					indexId = page.id
					setPageItem(page)
					return true
				}
			})
			return false
		}


		if(!currentPage) {
			setPageItem({})
		}
		setPageData(pageDataTemp)

		configGet({ 
			id: indexId
		}).then((rep) => {
			if(rep.error_code === 0) {
				if(rep.data) {
					if(rep.data.config_json_pre) {
						const configobj = JSON.parse(rep.data.config_json_pre) 
						buildModuleData(imgList, configobj.moduleList)
						setSectionList(configobj.moduleList)
					}
					// 设置好section后再挂载dom，init必须放最后
					setInit(true)
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
							item.data.imgs.list = cloneDeep(img.list) 
							return true
						}
						return false
					})
				}
				
			}
		})
	}
	
	// 新增模块
	const addSection = (item) => {
		const type = item.value
		const uniqueData = item.data || {}
		// setNewSectionType(Object.assign((sectionData())[type], {
		// 	sectionId: randomCode(10)
		// }))
		const sectionTemp = (sectionData())[type]
		if(sectionTemp.examples) {
			delete sectionTemp.examples
		}
		const newItem = Object.assign(sectionTemp, {
			sectionId: randomCode(10)
		})
		merge(newItem.data, uniqueData)
		const sectionListTemp = cloneDeep(sectionList)
		if(typeof showAddModal.index !== 'undefined') {
			sectionListTemp.splice(showAddModal.index, 0, newItem);
		} else {
			sectionListTemp.push(newItem)
		}
		setSectionList(sectionListTemp)
	}

	// const rightFormFinish = (data) => {
	// 	setChooseSection(update(chooseSection, {$merge:{
	// 		imgs: [data.cover]
	// 	}}))
	// }

	// const getImgList = (...props) => {
	// 	console.log('-----getImgList-------', props)
	// }

	// 拖拽上下文
	const manager = useRef(RNDContext);

	return (
		<VisContext.Provider
			value={{
				pageKind,
				pageItem,
				pageData,
				setPageData,
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
				setShowAddModal,
				setShowPagesModal
			}}
		>
			{
				init && (
					<div className={`visualization-wrap visualization-wrap-kind-${pageKind}`}>
						{/* <DndDemo /> */}
						<HeaderComp />
						<DndProvider manager={manager.current.dragDropManager}>
							<SiteContent newSection={newSectionType}  />
						</DndProvider>
						{
							pageItem && (pageItem.type === 'pc' || pageItem.type === 'guide' || pageItem.type === 'wap') && (
								<LeftMenu 
									// addSection={addSection} 
								/>
							)
						}
						{/* <RightMenu onFinish={rightFormFinish} /> */}
						{
							// 显示添加模块的弹窗
							showAddModal && showAddModal.show &&
							<SectionListModal 
								addSection={addSection}
								index={showAddModal.index}
							/>
						}
						{
							// 显示添加模块的弹窗
							showPagesModal && showPagesModal.show &&
							<PagesModal 
							/>
						}
					</div>
				)
			}
		</VisContext.Provider>
	)
}

export default Index