import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import classNames from 'classnames' 
import {eventLink} from '@/views/Visualization/utils/index'

import './index.scss'

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
		result.fontWeight = tempData.isBold?'blod':'common';

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
		console.log('----initStyleData-------', result)
		setStyleData(result)
	}

	return (
		<div className="navSection-wrap">
			<div>
				{
					data && (
						<div className="navSection-wrap-inner" 
							style={styleData}
						>
							<div
								className={classNames({
									'navSection-wrap-item': true,
									'navSection-full-screen': props.data.data.style.screenType == 2,
								})}
							>
								<div className="navSection-navbar-left">
									<img src={data.navImg} alt='' />
								</div>
								<div className="navSection-navbar-right"
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
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Index