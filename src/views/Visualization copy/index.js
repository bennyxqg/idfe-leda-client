import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { formatTime } from '@/utils/helper'
import SiteContent from './SiteContent'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import HeaderComp from './HeaderComp'
import VisContext from "./VisContext";
import DndDemo from './DndDemo'
import './index.scss'
import { randomCode } from '@/utils/helper'
import update from 'immutability-helper';
import { sectionData } from './sectionData';
import PicturesWall from '@/components/PicturesWall'
import RNDContext from '@/views/Visualization/RNDContext'
import { configGet } from '@/http/hvisualization'

const Index = () => {
	const [newSectionType, setNewSectionType] = useState(null)
	// 所有模块数据
	const [sectionList, setSectionList] = useState([])
	// 当前选中的模块
	const [chooseSection, setChooseSection] = useState(null)
	// 所有元素数据
	const [elementList, setElementList] = useState([{
    type: 'button',
    data: {
      top: 20,
      left: 200,
      text: 'test1'
    }
	}])
	// 所有新闻数据
	const [allNews, setAllNews] = useState([])

	useEffect(() => {
		console.log('-------chooseSection-------', chooseSection)
	}, [chooseSection]);

	useEffect(() => {
		getJSONData()
	}, []);

	// 获取数据库数据
	const getJSONData = () => {
		configGet().then((rep) => {
			console.log('----configGet------', rep.data.moduleList)
			if(rep.error_code === 0) {
				setSectionList(rep.data.moduleList)
			}
		})
	}

	const addSection = (type) => {
		setNewSectionType(Object.assign((sectionData())[type], {
			sectionId: randomCode(10)
		}))
	}

	const rightFormFinish = (data) => {
		console.log('-------rightFormFinish------', data)
		// setChooseSection(Object.assign(chooseSection, {
		// 	imgs: [data.cover]
		// }))
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
				allNews,
				setAllNews
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
			</div>
		</VisContext.Provider>
	)
}

export default Index