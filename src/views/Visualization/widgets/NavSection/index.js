import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import classNames from 'classnames' 
import {eventLink} from '@/views/Visualization/utils/index'
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'

import './index.scss'

const sectionName = 'navSection'

const Index = (props) => {
	const [data, setData] = useState(null)
	const [styleData, setStyleData] = useState({})

	useEffect(() => {
		setData(props.data.data)
		initStyleData()
	}, [props]);

	const initStyleData = () => {
		const tempData = props.data.data.style
		const result = {
		}
		result.backgroundRepeat = 'no-repeat';
		result.backgroundPosition = 'center';
		result.color = tempData.fontColor;
		result.fontSize = tempData.fontSize + 'px';
		result.fontWeight = tempData.isBold?'bold':'common';

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

	return (
		<div className={`${sectionName}-wrap`}>
			<div>
				{
					data && (
						<div className={`${sectionName}-wrap-inner ${sectionName}-wrap-inner-${props.data.sectionId}`}
							style={styleData}
						>
							<div
								className={classNames({
									[`${sectionName}-wrap-item`]: true,
									[`${sectionName}-full-screen`]: props.data.data.style.screenType == 2,
								})}
							>
								<div className={`${sectionName}-navbar-left`}>
									<img src={data.navImg} alt='' />
								</div>
								<div className={`${sectionName}-navbar-right`}
									style={{
										'textAlign': props.data.data.style.align
									}}
								>
									<ul>
										{
											data.navList.map((nav, index) => {
												return (
													<li key={index}>
														<span 
															className={classNames({
																'active': index === 0
															})}
															onClick={() => {eventLink(nav)}}
															style={{color: (data.style.navLabel && data.style.navLabel.color)
														}}>
															{nav.label}
														</span>
													</li>
												)
											})
										}
									</ul>
								</div>
								<div 
									// 以中心点为参照
									className='center-dot'
								>
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