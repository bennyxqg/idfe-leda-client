import React, {useState, useEffect, useRef, useContext} from "react";
import { Button } from 'antd';
import {Rnd} from 'react-rnd'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import update from 'immutability-helper';
import { getItemIndexByKey } from '@/utils/helper'
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'

import './index.scss'

const sectionName = 'mainSection'

const Index = (props) => {
	const { sectionList, setSectionList } = useContext(VisContext)

	const [data, setData] = useState(null)
	const [styleData, setStyleData] = useState({})
	const [btns, setBtns] = useState([])


	useEffect(() => {
		setData(props.data.data)
		initStyleData()
	}, [props]);

	const initStyleData = () => {
		const tempData = props.data.data.style
		const result = {
		}
		result.position = 'relative'
		result.backgroundRepeat = 'no-repeat';
    result.backgroundPosition = 'center';
		result.height = tempData.height
		// result.width = tempData.width?`${tempData.width}px`:'100%'
		if(tempData.bg) {
			if(tempData.bg.bgColor) {
				result.backgroundColor = tempData.bg.bgColor
			}
			if(tempData.bg.bgType == 2 && tempData.bg.bgImg) {
				result.backgroundImage = `url(${tempData.bg.bgImg})` 
				if(tempData.width && tempData.height) {
					result.backgroundSize = `${tempData.width}px ${tempData.height}px`
				}
			}
			if(tempData.bg.bgType == 3 && tempData.bg.bgVideo) {
				result.backgroundImage = `url(${tempData.bg.bgVideo})` 
			}
		}
		setStyleData(result)
	}

	// const moveItem = (e,d) => {
	// 	console.log('----111----')
	// 	const dataTemp = lodash.cloneDeep(data)
	// 	dataTemp.btn.style.top = d.y
	// 	dataTemp.btn.style.left = d.x
		
	// 	// 更新模块数据
	// 	const sectionId = props.data.sectionId
	// 	const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
	// 	const sectionListTemp = lodash.cloneDeep(sectionList)
	// 	sectionListTemp[sectionIndex].data = dataTemp
	// 	setSectionList(sectionListTemp)

	// }

	// 触发按钮事件
	// const triggerBtnEvent = () => {
	// 	const eventData = data.btn.event
	// 	if(eventData.type == 1) {
	// 		if(eventData.linkUrlType == 1) {
	// 			window.location.href = eventData.linkUrl
	// 		} else {
	// 			window.open(eventData.linkUrl)
	// 		}
	// 	} else {

	// 	}
	// }

	// 地址跳转

	return (
		<div className={`${sectionName}-wrap`}>
			<div>
				{
					data && (
						<div className={`${sectionName}-wrap-inner ${sectionName}-wrap-inner-${props.data.sectionId}`} 
						>
							<div className={`${sectionName}-wrap-item`} style={styleData}>
								<div 
									// 以中心点为参照
									className='center-dot'
								>
									{/* {
										data.btn.show && data.btn.imgUrl && (
											<Rnd 
												default={{
													x: data.btn.style.left,
													y: data.btn.style.top,
												}}
												bounds={`.${sectionName}-wrap-inner-${props.data.sectionId}`}
												enableResizing={false}
												onDragStop={(e,direction,ref,delta,position) => moveItem(e,direction,ref,delta,position)}
											>
												<div style={{
													position: 'relative',
													display: 'inline-block',
													transform: 'translate(-50%,-50%)'
												}}
												>
													<img 
														src={data.btn.imgUrl} alt='' />
													<div className='hover-highlight' style={{
														position: 'absolute',
														top: 0,
														left: 0,
														width: '100%',
														height: '100%',
														'zIndex': 2
													}}>
													</div>
												</div>
											</Rnd>
										)
									} */}
									{
										// 元素组件
										data.elements && <ElementDoms 
											list={data.elements}
											section={props.data}
										/>
									}
								</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Index