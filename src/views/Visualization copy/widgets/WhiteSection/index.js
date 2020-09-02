import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';

import './index.scss'

const Index = (props) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		
		setData(props.data.data)
	}, [props]);

	return (
		<div className="whiteSection-wrap">
			<div className="free-content-wrap">
				{
					data && (
						<>
							{data.text}
						</>
					)
				}
			</div>
		</div>
	)
}

export default Index