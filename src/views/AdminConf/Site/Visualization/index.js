import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import SiteContent from './SiteContent'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import './index.scss'
import { randomCode } from '@/utils/helper'

const Index = () => {
	const [newSectionType, setNewSectionType] = useState(null)

	const addSection = (type) => {
		console.log('---addSection-123------', type)
		setNewSectionType({
			type,
			sectionId: randomCode(10)
		})
	}

	return (
		<div className="visualization-wrap">
			<SiteContent newSection={newSectionType}  />
			<LeftMenu addSection={addSection} />
			<RightMenu  />
		</div>
	)
}

export default Index