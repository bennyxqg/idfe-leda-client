import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';

import './index.scss'

const sectionName = 'mainSection'

const Index = (props) => {
	const [data, setData] = useState(null)
	const [btns, setBtns] = useState([])

	useEffect(() => {
		setData(props.data.data)

	}, [props]);

	// 地址跳转

	return (
		<div className={`${sectionName}-wrap`}>
			<div>
				{
					data && (
						<div className={`${sectionName}-wrap-inner`} style={{backgroundColor: data.style.bgColor}}>
							<div className={`${sectionName}-wrap-item`}>
								首屏模块
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Index