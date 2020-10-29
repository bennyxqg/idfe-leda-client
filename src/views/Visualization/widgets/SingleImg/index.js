import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'

import './index.scss'

const sectionName = 'singleImg'

const Index = (props) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		setData(props.data.data)
	}, [props]);



	return (
		<div className={`${sectionName}-wrap`}>
			<div>
				{
					data && (
						<div className={`${sectionName}-wrap-inner ${sectionName}-wrap-inner-${props.data.sectionId}`} 
						>
							<div className="singleImg-wrap-item"
								style={{'textAlign': `${data.style.align}`}}
							>
								<img 
									style={{'width': `${data.style.widthType == 1?'auto': data.style.width + 'px'}`, 
									'height': `${data.style.heightType == 1?'auto': data.style.height + 'px'}`, 
									'top': `${data.style.top}px`, 
									'left': `${data.style.left}px`}}
									src={data.url} alt={data.title} />
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