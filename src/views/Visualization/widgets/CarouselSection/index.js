import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import SwiperComp from '@/components/SwiperComp/index'
import { handleBgStyle } from '@/utils/helper'
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'

import './index.scss'

const sectionName = 'carouselSection'

const Index = (props) => {
	const [data, setData] = useState(null)
	const [bgStyle, setBgStyle] = useState(null)

	useEffect(() => {
	}, []);

	useEffect(() => {
		setData(props.data.data)
		setBgStyle(handleBgStyle(props.data.data.style.bg))
	}, [props]);

	return (
		<div className={`${sectionName}-wrap`}>
			<div>
				{
					data && (
						<div className={`${sectionName}-wrap-inner ${sectionName}-wrap-inner-${props.data.sectionId}`} 
						>
						<div className={`${sectionName}-wrap-item`} 
							style={Object.assign(
								{paddingTop: `${data.style.paddingTop}px`, 
								paddingBottom: `${data.style.paddingBottom}px`, 
								textAlign: `${data.style.align}`
								}, bgStyle) }>
								<SwiperComp 
									imgList={data.imgs}
									style={data.style}
								/>
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
					)
				}
			</div>
		</div>
	)
}

export default Index