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
import update from 'immutability-helper';
import { sectionData } from '@/views/Visualization/data/sectionData';
import RNDContext from '@/views/Visualization/context/RNDContext'
import { configGet, getPageList, getPopupList } from '@/http/hvisualization'
import { getAllNewsByGroup, getAllCarouselByGroup, getAllNews } from '@/utils/data'
import lodash from 'lodash'
import { useHistory } from "react-router-dom";

const Index = () => {
	let history = useHistory();

	const [pageData, setPageData] = useState([])

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
		console.log('-------chooseSection-------', chooseSection)
	}, [chooseSection]);

	useEffect(() => {
		history.listen(route => {
			if(route.pathname === '/visualization') {
				window.location.reload()
			}
		})
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
		const popupRep = await getPopupList()
		const pageRep = await getPageList()
		let indexId = getQueryVariable('id', history.location.search)
		const pageDataTemp = []
		if(pageRep.error_code === 0) {
			pageDataTemp.push(...(pageRep.data.map(item=> {
				return {
					id: item.id,
					name: item.name,
					identifer: item.identifer,
					type: 'page'
				}
			})))
		}
		if(popupRep.error_code === 0) {
			pageDataTemp.push(...(popupRep.data.map(item=> {
				return {
					id: item.id,
					name: item.name,
					identifer: item.identifer,
					type: 'popup'
				}
			})))
			// pageDataTemp.push({
			// 	id: '4',
			// 	name: '申请弹窗',
			// 	identifer: 'apply',
			// 	type: 'popup'
			// })
		}
		let currentPage = null
		pageDataTemp.forEach((page) => {
			if(indexId) {
				if(page.id == indexId) {
					// setPageType(page.type == 1?'page':'popup')
					currentPage = page
					setPageItem(page)
				}
			} else {
				if(page.identifer === 'index') {
					currentPage = page
					indexId = page.id
					setPageItem(page)
				}
			}
		})
		if(!currentPage) {
			setPageItem({})
		}
		setPageData(pageDataTemp)
		console.log('----556----', currentPage)
		// if(indexId == 4) { // 测试数据
		// 	setInit(true)
		// 	buildModuleData(imgList, [])
		// 	setSectionList([])
		// 	return
		// }
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
	const addSection = (item) => {
		const type = item.value
		const uniqueData = item.data || {}
		// setNewSectionType(Object.assign((sectionData())[type], {
		// 	sectionId: randomCode(10)
		// }))
		const newItem = Object.assign((sectionData())[type], {
			sectionId: randomCode(10)
		})
		lodash.merge(newItem.data, uniqueData)
		console.log('-----newItem-----', newItem)
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
					<div className="visualization-wrap">
						{/* <DndDemo /> */}
						<HeaderComp />
						<DndProvider manager={manager.current.dragDropManager}>
							<SiteContent newSection={newSectionType}  />
						</DndProvider>
						{
							pageItem && pageItem.type === 'page' && (
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