import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import SwiperComp from '@/components/SwiperComp/index'
import { handleBgStyle } from '@/utils/helper'

import './index.scss'

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
		<div className="carouselSection-wrap">
			<div>
				{
					data && (
						<div className="carouselSection-wrap-item"
							style={{'textAlign': `${data.style.align}`}}
						>
							<div className="carouselSection-inner"
								style={Object.assign(
									{paddingTop: `${data.style.paddingTop}px`, 
									paddingBottom: `${data.style.paddingBottom}px`, 
									}, bgStyle) }
								>
								<SwiperComp 
									imgList={data.imgs}
									type={data.type}
								/>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Index