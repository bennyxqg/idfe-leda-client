import React, {useState, useEffect, useRef, useContext} from "react";
import { Carousel } from 'antd';
import { handleBgStyle } from '@/utils/helper'
import {cloneDeep} from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import './index.scss'
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'


const sectionName = 'imgNews'

const Index = (props) => {
	const { allNews, pageKind, lastestNews } = useContext(VisContext)

	const [data, setData] = useState(null)
	const [currentNews, setCurrentNews] = useState([])
	const [activeGroup, setActiveGroup] = useState(0)
	const [groups, setGroups] = useState([])
	const [baseStyle, setBaseStyle] = useState({})
	const [newsBgStyle, setNewsBgStyle] = useState({})

	useEffect(() => {
		const allNewsTemp = [
			{
				id: -1,
				name: '最新',
				list: lastestNews.slice(0, 5)
			},
			...cloneDeep(allNews)
		]
		setGroups(allNewsTemp)
		changeGroup(allNewsTemp[0], 0)
	}, []);

	useEffect(() => {
		setData(props.data.data)
		handleBaseStyle()
		setNewsBgStyle(handleBgStyle(props.data.data.style.news.bg))
	}, [props]);

	const handleBaseStyle = () => {
		const baseData = handleBgStyle(props.data.data.style.base.bg)
		baseData['paddingTop'] = `${props.data.data.style.base.paddingTop}px`
		baseData['paddingBottom'] = `${props.data.data.style.base.paddingBottom}px`
		baseData['height'] = props.data.data.style.base.height?`${props.data.data.style.base.height}px`:'auto'
		setBaseStyle(baseData)
	}

	const changeGroup = (group, index) => {
		setActiveGroup(index)
		setCurrentNews(group.list || [])
	}

	const customPaging = (i) => {
		if(data.style.swiper.nav.type == 1) {
			return (
				<button
				style={{
					backgroundColor: data.style.swiper.nav.color
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
				border: "1px " + data.style.swiper.nav.color + " solid",
				borderRadius: '5px',
				backgroundColor: data.style.swiper.nav.color,
				position: 'relative',
				top: '-10px'
			}}
		>
		</div>)
	}


	return (
		<div className={`${sectionName}-wrap ${sectionName}-wrap-kind-${pageKind}`} style={baseStyle}>
			{
				data && (
					<div className={`${sectionName}-wrap-inner ${sectionName}-wrap-inner-${props.data.sectionId}`}> 
						<div className={`${sectionName}-wrap-item`} >
							{
								pageKind === 'pc' && (
									<div className="imgNews-wrap-inner-carousel">
										{
											data.imgs.list && 
											<Carousel 
											// autoplay={data.style.swiper.autoPlay}
											autoplaySpeed={data.style.swiper.delay}
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
								)
							}
							
							<div className="imgNews-wrap-inner-news" style={newsBgStyle}>
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
	)
}

export default Index