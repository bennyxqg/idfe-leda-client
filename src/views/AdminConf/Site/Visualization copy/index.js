import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import SiteContent from './SiteContent'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import VisContext from "./VisContext";
import DndDemo from './DndDemo'
import './index.scss'
import { randomCode } from '@/utils/helper'
import update from 'immutability-helper';
import { sectionData } from '@/views/AdminConf/Site/Visualization/sectionData';

const Index = () => {
	const [newSectionType, setNewSectionType] = useState(null)
	// 所有模块数据
	const [sectionList, setSectionList] = useState([])
	// 当前选中的模块
	const [chooseSection, setChooseSection] = useState(null)

	useEffect(() => {
		console.log('-------chooseSection-------', chooseSection)
	}, [chooseSection]);

	const addSection = (type) => {
		console.log('---addSection-123------', type)
		
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

	return (
		<VisContext.Provider
			value={{
				sectionList,
				setSectionList,
				chooseSection,
				setChooseSection
			}}
		>
			<div className="visualization-wrap">
				{/* <DndDemo /> */}
				<SiteContent newSection={newSectionType}  />
				<LeftMenu addSection={addSection} />
				<RightMenu onFinish={rightFormFinish} />
			</div>
		</VisContext.Provider>
	)
}

export default Index