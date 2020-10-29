import React, {useState, useEffect, useRef, useContext} from "react";
import { Button } from 'antd';
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'
import { newsDetail } from '@/http/hnews'
import {formatTime} from '@/utils/helper.js'
import VisContext from "@/views/Visualization/context/VisContext";

import './index.scss'

const sectionName = 'newsDetailSection'

const Index = (props) => {
	const { pageKind, lastestNews } = useContext(VisContext)

	const [data, setData] = useState(null)
	const [styleData, setStyleData] = useState({})
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [newsTime, setNewsTime] = useState('')

	useEffect(() => {
		setData(props.data.data)
		initStyleData()
		if(props.data.data.bindPathParam) {
			getNewsList()
		} else {
			if(props.data.data.newsId) {
				getNewsInfo(props.data.data.newsId)
			}
			
		}
	}, [props]);

	const initStyleData = () => {
		const tempData = props.data.data.style
		const result = {
		}
		result.position = 'relative'
		result.backgroundRepeat = 'no-repeat';
    result.backgroundPosition = 'center';
		result.height = tempData.height
		// result.width = tempData.width?`${tempData.width}px`:'100%'
		if(tempData.bg) {
			if(tempData.bg.bgColor) {
				result.backgroundColor = tempData.bg.bgColor
			}
			if(tempData.bg.bgType == 2 && tempData.bg.bgImg) {
				result.backgroundImage = `url(${tempData.bg.bgImg})` 
				if(tempData.width && tempData.height) {
					result.backgroundSize = `${tempData.width}px ${tempData.height}px`
				}
			}
			if(tempData.bg.bgType == 3 && tempData.bg.bgVideo) {
				result.backgroundImage = `url(${tempData.bg.bgVideo})` 
			}
		}
		setStyleData(result)
	}

	const getNewsList = () => {
		console.log('-----lastestNews-------', lastestNews)
		if(lastestNews && lastestNews.length) {
			setContent(lastestNews[0].content)
			setTitle(lastestNews[0].title)
			setNewsTime(formatTime(lastestNews[0].created, 'YYYY-MM-DD'))
		}
	}

	// 获取详情
  const getNewsInfo = (id) => {
    if(!id) return
    newsDetail({id}).then((rep) => {
			if(rep.error_code === 0) {
				setContent(rep.data.content)
				setTitle(rep.data.title)
				if(rep.data.created) {
					setNewsTime(formatTime(rep.data.created, 'YYYY-MM-DD'))
				}
			}
    })
  }

	return (
		<div className={`${sectionName}-wrap ${sectionName}-wrap-kind-${pageKind}`}>
			<div>
				{
					data && (
						<div 
							className={`${sectionName}-wrap-inner ${sectionName}-wrap-inner-${props.data.sectionId}`} 
							style={styleData}
						>
							<div className={`news-title`} >
								{title}
							</div>
							<div className={`news-time`} >
								{newsTime}
							</div>
							<div className={`news-content`} dangerouslySetInnerHTML={{ __html: content }}></div>
							<div>
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