import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import Swiper from "swiper"
import classNames from 'classnames' 
import {randomCode} from '@/utils/helper'
import './index.scss'

const Index = (props) => {
	const [data, setData] = useState([])
	const [swiperId, setSwiperId] = useState(randomCode(8))
	const [swiperObj, setSwiperObj] = useState(null)
	const [wrapSize, setWrapSize] = useState({})

	useEffect(() => {
		setData(props.imgList)
	}, [props]);

	useEffect(() => {
		// init()
	}, []);

	useEffect(() => {
		console.log('------props.style.type-----', props.style.type)
		init()
	}, [props.style]);

	const init = () => {
		
		const type = props.style.type
		const opts = {
      
			observer:true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents:true,//修改swiper的父元素时，自动初始化swiper 
			loop: true, // 无限循环
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

		if(props.style.height) {
			opts.height = props.style.height
		}
		if(type == 2) {
			opts.initialSlide = 1
			opts.effect = 'coverflow'
			opts.grabCursor = true
			opts.slidesPerView = 'auto'
			opts.centeredSlides = true
			
			opts.coverflowEffect = {
				rotate: 50,
				stretch: 50,
				depth: 120,
				modifier: 1,
				slideShadows:true
      }
		}
		
		
		if(swiperObj) {
			swiperObj.destroy(true, true)
			// swiperObj.update(true)
		}

		console.log('------props.style.nav----', props.style)
		const navOpt = props.style.swiper.nav
		if(navOpt && navOpt.show) {
			const dotsOpt = {}
			if (navOpt.type == 1) { // 线
				dotsOpt.className = 'line-dots'
			} else { // 点
				dotsOpt.className = 'circle-dots'
			}
			dotsOpt.color = navOpt.color
			opts.pagination = {
				el: '.swiper-pagination-' + swiperId,
				renderBullet: function (index, className) {
					return '<span class="' + className + " " + dotsOpt.className + '" style="background-color:' + dotsOpt.color + '"></span>';
				},
				clickable: true,
			}
		}
		setTimeout(() => {
			// if(swiperObj) {
			// 	swiperObj.update(true)
			// } else {
			// 	const swiper = new Swiper('.swiper-container-' + swiperId, opts);
			// 	setSwiperObj(swiper)
			// }
			const swiper = new Swiper('.swiper-container-' + swiperId, opts);
			setSwiperObj(swiper)
		}, 100);
		
	}

	return (
		<div className="swiper-container-wrap swiper-comp-wrap"
			// style={{
			// 	width: props.style.width?props.style.width + 'px': 'auto',
			// 	height: props.style.height?props.style.height + 'px': 'auto',
			// }}
			// style={{
			// 	width: '200px',
			// 	height: '100px',
			// }}
		>
			<div 
				className = {classNames({
					'swiper-container': true,
					['swiper-container-' + swiperId]: true,
					'swiper-container-card': props.style.type == 2,
					'swiper-container-common': props.style.type != 2
				})}
				style={{
					width: wrapSize.width?wrapSize.width + 'px': 'auto'
				}}
				// style={{
				// 	width: props.style.img.width?props.style.img.width + 'px': 'auto',
				// 	height: props.style.img.height?props.style.img.height + 'px': 'auto',
				// }}
				
			>
				<div className="swiper-wrapper">
					{
						data && data.list && 
						(
							data.list.map((item, index) => {
								return (
									<div key={index} className="swiper-slide"
										// style={{
										// 	width: props.style.img.width?props.style.img.width + 'px': 'auto',
										// 	height: props.style.img.height?props.style.img.height + 'px': 'auto',
										// }}
									>
										<img src={item.url} 
											style={{
												width: props.style.img.width?props.style.img.width + 'px': 'auto',
												height: props.style.img.height?props.style.img.height + 'px': 'auto',
											}}
											// style={{
											// 	width: '100px',
											// 	height: '100px',
											// }}
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
		</div>
	)
}

export default Index