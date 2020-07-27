import React from 'react';
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import SiteContent from './SiteContent'
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import './index.scss'

const Index = () => {

	const addSection = (type) => {
		console.log('---addSection-123------', type)
	}

	return (
		<div className="visualization-wrap">
			<SiteContent   />
			<LeftMenu addSection={addSection} />
			<RightMenu  />
		</div>
	)
}

export default Index