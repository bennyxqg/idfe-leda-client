import React, {useState, useEffect, useRef} from "react";
import { Button } from 'antd';
import Swiper from "swiper"
import classNames from 'classnames' 
import './index.scss'

const Index = (props) => {
	const [data, setData] = useState([])

	useEffect(() => {
		setData(props.imgList)
	}, [props]);

	useEffect(() => {
		init()
	}, []);

	const init = () => {
		const opts = {
      pagination: {
        el: '.swiper-pagination',
			},
			observer:true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents:false,//修改swiper的父元素时，自动初始化swiper 
			onSlideChangeEnd: function(swiper){ 
　　　     swiper.update();  
　　　     swiper.startAutoplay();
　　      swiper.reLoop();  
			}
		}
		if(props.type == 2) {
			opts.initialSlide = 1
			opts.effect = 'coverflow'
			opts.grabCursor = true
			opts.slidesPerView = 'auto'
			opts.centeredSlides = true
			opts.coverflowEffect = {
				rotate: 50,
				stretch: 20,
				depth: 120,
				modifier: 1,
				slideShadows:true
      }
		}

		const swiper = new Swiper('.swiper-container', opts);
	}

	return (
		<div className="swiper-container-wrap swiper-comp-wrap">
			<div 
				className = {classNames({
					'swiper-container': true,
					'swiper-container-card': props.type == 2,
					'swiper-container-common': props.type != 2
				})}
			>
				<div className="swiper-wrapper">
					{
						data && data.list && 
						(
							data.list.map((item, index) => {
								return (
									<div key={index} className="swiper-slide">
										<img src={item.url} alt={item.title} />
									</div>
								)
							})
						)
					}
				</div>
        <div className="swiper-pagination"></div>
			</div>
		</div>
	)
}

export default Index