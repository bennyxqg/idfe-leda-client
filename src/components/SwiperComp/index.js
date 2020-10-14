import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import Swiper from "swiper"
import classNames from 'classnames' 
import {randomCode} from '@/utils/helper'
import {isEqual} from "lodash";
import './index.scss'

const Index = (props) => {
	const [data, setData] = useState([])
	const [swiperId, setSwiperId] = useState(randomCode(8))
	const [swiperObj, setSwiperObj] = useState(null)
	const [wrapSize, setWrapSize] = useState({})
	const [navBtnData, setNavBtnData] = useState({})
	const [loadDom, setLoadDom] = useState(false) // 重新挂载dom
	const [prevStyleData, setPrevStyleData] = useState(null)
	// 设备：pc || wap
	const [pageKind, setPageKind] = useState('pc')

	// let prevStyleData = null

	useEffect(() => {
		setData(props.imgList)
	}, [props]);

	useEffect(() => {
		// init()
		if(props.pageKind) {
			console.log('-------props.pageKind------', props.pageKind)
			setPageKind(props.pageKind)
		}
	}, []);

	// useEffect(() => {
	// 	init(false)
	// }, [props.style]);

	useEffect(() => {
		let isChange = false
		if(prevStyleData) {
			isChange = !(isEqual(prevStyleData, props))
		} else {
			setPrevStyleData(props)
			// prevStyleData = props.style
			isChange = true
		}
		if(isChange) {
			setLoadDom(false)
			setTimeout(() => {
				setLoadDom(true)
			}, 0);
		}
		
	}, [props]);

	useEffect(() => {
		if(loadDom) {
			init(true)
		}
	}, [loadDom]);

	// useEffect(() => {
	// 	init()
	// }, [props.style]);

	const init = (domChange) => {
		// 1:普通， 2：卡片
		const type = props.style.type
		const opts = {
      loop: true, // 无限循环
			observer:true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents:true,//修改swiper的父元素时，自动初始化swiper 
			observeSlideChildren:true,
			onSlideChangeEnd: function(swiper){ 
				swiper.update();  
				swiper.startAutoplay();
				swiper.reLoop();  
			}
		}
		if(type == 2) {
			if(props.style.img.width) {
				setWrapSize({
					width: props.style.img.width * 1.53
				})
			}
		} else if(type == 1) {
			if(props.style.img.width) {
				setWrapSize({
					width: props.style.img.width
				})
			}
		}

		// if(props.style.height) {
		// 	opts.height = props.style.height
		// }
		if(type == 2) {
			// opts.initialSlide = 1
			
			opts.effect = 'coverflow'
			opts.grabCursor = false
			// opts.slidesPerView = 2
			opts.slidesPerView = 'auto'
			opts.centeredSlides = true
			
			opts.coverflow = {
				rotate: 50,
				stretch: 20,
				depth: 120,
				modifier: 1,
				slideShadows:true
      }
		}
		
		const navOpt = props.style.swiper.nav
		if(navOpt) {
			const dotsOpt = {}
			if (navOpt.type == 1) { // 线
				dotsOpt.className = 'line-dots'
				dotsOpt.className_rm = 'circle-dots'
			} else { // 点
				dotsOpt.className = 'circle-dots'
				dotsOpt.className_rm = 'line-dots'
			}
			dotsOpt.color = navOpt.color
			if(!navOpt.show) {
				dotsOpt.hideClassName = 'hidden'
			}
			opts.pagination = {
				el: '.swiper-pagination-' + swiperId,
				renderBullet: function (index, className) {
					return '<span class="' + className + " " + dotsOpt.className + " " + dotsOpt.hideClassName + '" style="background-color:' + dotsOpt.color + '"></span>';
				},
				clickable: true,
			}
			if(swiperObj && swiperObj.pagination && swiperObj.pagination.bullets) { // 更新指示器样式
				for(let i=0;i<swiperObj.pagination.bullets.length;i++){
					swiperObj.pagination.bullets[i].classList.add(dotsOpt.className)
					swiperObj.pagination.bullets[i].classList.remove(dotsOpt.className_rm)
					swiperObj.pagination.bullets[i].style.backgroundColor = dotsOpt.color
					if(!navOpt.show) {
						swiperObj.pagination.bullets[i].classList.add('hidden')
					} else {
						swiperObj.pagination.bullets[i].classList.remove('hidden')
					}
				}
			}
		}

		// 前进后台按钮
		const navBtnOpt = props.style.swiper.navBtn
		if(navBtnOpt) {
			opts.navigation = {
				nextEl: '.swiper-button-next-'  + swiperId,
				prevEl: '.swiper-button-prev-'  + swiperId,
			}
			const tempData = {}
			tempData.show = navBtnOpt.show
			if(navBtnOpt.show) {
				tempData.nextBg = navBtnOpt.nextBg
				tempData.prevBg = navBtnOpt.prevBg
				
			}
			setNavBtnData(tempData)
		}

		if(domChange) {
			if(swiperObj) {
				swiperObj.destroy(true, true)
				// swiperObj.update(true)
			}
		}
		
		setTimeout(() => {
			// if(swiperObj) {
			// 	swiperObj.pagination.update()
			// 	swiperObj.update(true) // coverflow模式使用update才能生效
			// } else {
			// 	const swiper = new Swiper('.swiper-container-' + swiperId, opts);
			// 	setSwiperObj(swiper)
			// }
			const swiper = new Swiper('.swiper-container-' + swiperId, opts);
			setSwiperObj(swiper)
		}, 100);
	}

	return (
		<>
				<div className="swiper-container-wrap swiper-comp-wrap"
				style={{
					height: props.style.height?props.style.height + 'px': 'auto',
				}}
			>
				{loadDom && 
				<div
					className={classNames({
						'swiper-container-outer': true,
						'swiper-container-outer-card': props.style.type == 2,
						'swiper-container-outer-common': props.style.type != 2
					})}
					style={{
						width: wrapSize.width?wrapSize.width + (props.style.type == 2?(pageKind === 'pc'?200:0):0) + 'px': 'auto',
					}}
					// style={{
					// 	width: '200px',
					// 	height: '150px',
					// }}
				>
					
						<div 
							className = {classNames({
								'swiper-container': true,
								['swiper-container-' + swiperId]: true
							})}
							style={{
								width: wrapSize.width?wrapSize.width + 'px': 'auto'
							}}
							// style={{
							// 	width: props.style.img.width?props.style.img.width + 'px': 'auto',
							// 	height: props.style.img.height?props.style.img.height + 'px': 'auto',
							// }}
							// style={{
							// 	overflow: 'hidden',
							// 	width: '1007px',
							// 	height: '370px',
							// 	position: 'relative'
							// }}
							
						>
							<div className="swiper-wrapper"
								// 必须设置宽度，否则coverflow有问题
								style={{
									width: props.style.img.width?props.style.img.width + 'px': 'auto',
									height: props.style.img.height?props.style.img.height + 'px': 'auto',
								}}
							>
								{
									data && data.list && 
									(
										data.list.map((item, index) => {
											return (
												<div key={index} className="swiper-slide"
												>
													<img src={item.url} 
														style={{
															width: props.style.img.width?props.style.img.width + 'px': 'auto',
															height: props.style.img.height?props.style.img.height + 'px': 'auto',
														}}
													alt={item.title} />
												</div>
											)
										})
									)
								}
							</div>
							<div className = {classNames({
									'swiper-pagination': true,
									['swiper-pagination-' + swiperId]: true,
								})}
							></div>
							
						</div>
					{
						navBtnData.show && (
							<div
								className = {classNames({
									'swiper-buttons': true,
									
								})}
							>
								<div
									className = {classNames({
										'swiper-button': true,
										'swiper-button-prev': true,
										['swiper-button-prev-' + swiperId]: true,
										'swiper-button-bg': !!navBtnData.prevBg,
									})}
									style={{
										backgroundImage: navBtnData.prevBg?`url(${navBtnData.prevBg})`:''
									}}
								></div>
								<div
									className = {classNames({
										'swiper-button': true,
										'swiper-button-next': true,
										['swiper-button-next-' + swiperId]: true,
										'swiper-button-bg': !!navBtnData.nextBg,
									})}
									style={{
										backgroundImage: navBtnData.nextBg?`url(${navBtnData.nextBg})`:''
									}}
								></div>	
							</div>
						)
					}
				</div>
				}
			</div>
		</>
	)
}

export default Index