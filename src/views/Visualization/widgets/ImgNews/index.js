import React, {useState, useEffect, useRef, useContext} from "react";
import { Table, Button, Form, Select, Input, message, Carousel } from 'antd';
import { formatTime } from '@/utils/helper'
import { newsAll } from '@/http/hnews'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/VisContext";
import './index.scss'

const Index = (props) => {
	const { allNews, setAllNews, lastestNews } = useContext(VisContext)

	const [data, setData] = useState(null)
	const [currentNews, setCurrentNews] = useState([])
	const [activeGroup, setActiveGroup] = useState(0)
	const [groups, setGroups] = useState([])

	useEffect(() => {
		const allNewsTemp = [
			{
				id: -1,
				name: '最新',
				list: lastestNews.slice(0, 5)
			},
			...lodash.cloneDeep(allNews)
		]
		console.log('----lastestNews------', allNewsTemp)
		setGroups(allNewsTemp)
		changeGroup(allNewsTemp[0], 0)
	}, []);

	useEffect(() => {
		setData(props.data.data)
	}, [props]);

	const changeGroup = (group, index) => {
		setActiveGroup(index)
		setCurrentNews(group.list || [])
	}

	const customPaging = (i) => {
		if(data.style.carousel.nav.type == 1) {
			return (
				<button
				style={{
					backgroundColor: data.style.carousel.nav.color
				}}
				>{i + 1}</button>
			)
		}
		return (<div
			className={'circle-dot'}
			style={{
				width: "10px",
				height: "10px",
				color: "blue",
				border: "1px " + data.style.carousel.nav.color + " solid",
				borderRadius: '5px',
				backgroundColor: data.style.carousel.nav.color,
				position: 'relative',
				top: '-10px'
			}}
		>
		</div>)
	}

	const appendDots = (dots) => {
		return (<div
			style={{
				// backgroundColor: "#ddd",
				// borderRadius: "10px",
				// padding: "10px"
			}}
		>
			<ul style={{ margin: "0px" }}> {dots} </ul>
		</div>)
	}


	return (
		<div className="imgNews-wrap">
			{
				data && (
					<div className="imgNews-wrap-inner">
						<div className="imgNews-wrap-inner-carousel">
							{
								data.imgs.list && 
								<Carousel autoplay={data.style.carousel.autoPlay}
								autoplaySpeed={data.style.carousel.delay}
								// appendDots={appendDots}
								customPaging={customPaging}
								// dots={{className: data.style.carousel.nav.type == 1?'': 'circle-dots'}}
								> 
								{
									data.imgs.list.map((item, index) => {
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
						<div className="imgNews-wrap-inner-news" style={{'backgroundColor': `${data.style.bg.color}`}}>
							<div className="imgNews-news-nav">
								<ul style={{'color': `${data.style.news.nav.fontColor}`, 'fontSize': `${data.style.news.nav.fontSize}px`, 'fontWeight': data.style.news.nav.isBold?'bold':'normal'}}>
									{
										groups && groups.map((item, index) => {
											if(index < 4) {
												return (
													<li className={activeGroup === index?'active':''} onClick={() => {changeGroup(item, index)}} key={item.id}>
														<span>{item.name}</span>
													</li>
												)
											}
										})
									}
								</ul>
							</div>
							
							<div className="imgNews-news-list">
								<div>
									<ul>
										{
											currentNews.map((item, index) => {
												if(index < 5) {
													return (
														<li key={index}>
															<span 
																style={{'color': `${data.style.news.list.fontColor}`, 'fontSize': `${data.style.news.list.fontSize}px`, 'fontWeight': data.style.news.list.isBold?'bold':'normal', 'letterSpacing': data.style.news.list.letterSpacing + 'px'}}
																className="imgNews-news-list-text">{item.title}</span>
															<span className="imgNews-news-list-time"
																style={{'fontSize': `${data.style.news.list.fontSize}px`}}
															>{item.time}</span>
														</li>
													)
												}
											})
										}
									</ul>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default Index