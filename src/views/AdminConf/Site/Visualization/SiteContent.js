import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import lodash from 'lodash'
import {
	WhiteSection,
  ImgNews
} from "./widgets";

const Index = (props) => {
	const [sectionList, setSectionList] = useState([])

	useEffect(() => {
    console.log('-----content------')
	}, []);
	
	useEffect(() => {
		console.log('-----props.newSection------', props.newSection)
		// 新模块加入队列中
		if(props.newSection) {
			setSectionList([...sectionList, lodash.cloneDeep(props.newSection)])
		}
	}, [props.newSection]);

	useEffect(() => {
		console.log('-----sectionList----222--', sectionList)
	}, [sectionList]);

	const setComponent = (type) =>{
		console.log('-----sectionList----444--', type, type === 'WhiteSection')
			if(type === 'WhiteSection') {
				console.log('-----sectionList----3333--', type)
				return <WhiteSection />;
			} else if(type === 'ImgNews') {
				return <ImgNews />;
			}
	}

	return (
		<div className="vis-wrap-siteContent">
			<div>
				{
					sectionList.map((section) => {
						return (
							<div className="vis-section-wrap" key={section.sectionId}>
								{setComponent(section.type)}
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Index