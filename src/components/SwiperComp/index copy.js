import React from 'react';
import { Button } from 'antd';
import Swiper from "swiper"

class SwiperComp extends React.Component {

	componentDidMount() {
		new Swiper ('.swiper-container', {
			// direction: 'vertical', // 垂直切换选项
			loop: true, // 循环模式选项
	
			// 如果需要分页器
			// pagination: {
			// 	el: '.swiper-pagination',
			// },
	
			// // 如果需要前进后退按钮
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// },
	
			// // 如果需要滚动条
			// scrollbar: {
			// 	el: '.swiper-scrollbar',
			// },
		})
	}

	render() {
		return (
			<div className="swiper-container-wrap">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<img src='http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-30/20191230_145747_624977.jpg' alt='' />
						</div>
						<div className="swiper-slide">
							<img src='http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-30/20191230_145819_168342.jpg' alt='' />
						</div>
						<div className="swiper-slide">
							<img src='http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-30/20191230_145810_837739.jpg' alt='' />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SwiperComp