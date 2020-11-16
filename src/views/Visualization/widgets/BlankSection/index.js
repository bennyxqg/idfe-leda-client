import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'

import './index.scss'

const sectionName = 'blankSection'

const Index = (props) => {
	const [data, setData] = useState(null)
	const [styleData, setStyleData] = useState({})
	const [videoBg, setVideoBg] = useState('')

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
				// result.backgroundImage = `url(${tempData.bg.bgVideo})` 
				setVideoBg(tempData.bg.bgVideo)
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
							>
							<div className={`${sectionName}-wrap-item`} style={styleData}>
								{
									videoBg && (
										<div
											style={{
												textAlign: 'center',
												overflow: "hidden",
												position: 'relative',
												height: '100%'
											}}
											>
											<video 
												style={{
													position: 'absolute',
													left: '50%',
													// marginLeft: '-50%'
													transform: 'translate(-50%)'
												}}
												autoPlay loop muted src={videoBg}>
											</video>
										</div>
									)
								}
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