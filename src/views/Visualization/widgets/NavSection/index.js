import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';

import './index.scss'

const Index = (props) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		setData(props.data.data)

	}, [props]);

	// 地址跳转
	const linkTo = (nav) => {
		console.log('---linkTo-----', nav)
		if(nav.linkType == 1 && nav.sectionId) {
			const target = document.getElementById("section_" + nav.sectionId)
			if(target) {
				target.scrollIntoView();
			}
		} else if(nav.linkType == 2 && nav.sectionId && nav.url){
			window.location.href = nav.url
		} else if(nav.linkType == 3 && nav.sectionId && nav.url){
			window.location.open = nav.url
		}
	}

	return (
		<div className="navSection-wrap">
			<div>
				{
					data && (
						<div className="navSection-wrap-inner" style={{backgroundColor: data.style.bgColor}}>
							<div className="navSection-wrap-item">
								<div className="navSection-navbar-left">
									<img src={data.navImg} alt='' />
								</div>
								<div className="navSection-navbar-right">
									<ul>
										{
											data.navList.map((nav, index) => {
												return (
													<li key={index}>
														<span 
															onClick={() => {linkTo(nav)}}
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