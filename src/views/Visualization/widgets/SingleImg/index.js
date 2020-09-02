import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';

import './index.scss'

const Index = (props) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		setData(props.data.data)

	}, [props]);



	return (
		<div className="singleImg-wrap">
			<div>
				{
					data && (
						<div className="singleImg-wrap-item"
							style={{'textAlign': `${data.style.align}`}}
						>
							<img 
								style={{'width': `${data.style.widthType == 1?'auto': data.style.width + 'px'}`, 
								'height': `${data.style.heightType == 1?'auto': data.style.height + 'px'}`, 
								'top': `${data.style.top}px`, 
								'left': `${data.style.left}px`}}
								src={data.url} alt={data.title} />
						</div>
					)
				}
			</div>
		</div>
	)
}

export default Index