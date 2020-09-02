import React, {useState, useEffect, useRef} from "react";
import { Table, Button, Form, Select, Input, message, Carousel } from 'antd';
import { formatTime } from '@/utils/helper'
import './index.scss'

const Index = (props) => {
	const [data, setData] = useState(null)
	const [currentNews, setCurrentNews] = useState([])

	useEffect(() => {
		console.log('-----props.data.data----', props.data.data)
		setData(props.data.data)
		changeGroup(props.data.data.newsList.groups[0])
	}, [props]);

	const changeGroup = (group) => {
		setCurrentNews(group.list)
	}

	return (
		<div className="imgNews-wrap">
			<div className="imgNews-wrap-inner">
				<div className="imgNews-wrap-inner-carousel">
					{
						data && data.imgs && 
						<Carousel autoplay> 
						{
							data.imgs.map((item, index) => {
								return (
									<div key={index}>
										<img src={item.url} alt={item.title} />
									</div>
								)
							})
						}
						</Carousel>
					}
				</div>
				<div className="imgNews-wrap-inner-news">
					<ul>
						{
							data && data.newsList && data.newsList.groups.map((item, index) => {
								return (
									<li onClick={changeGroup} key={index}>
										<span>{item.title}</span>
									</li>
								)
							})
						}
					</ul>
					<div>
						<ul>
							{
								currentNews.map((item, index) => {
									return (
										<li key={index}>
											<span>{item.title}</span>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index