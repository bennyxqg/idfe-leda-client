import React, {useState, useEffect, useRef, useContext} from "react";
import ElementListModal from '@/views/Visualization/components/Element/ListModal/index'
import ImgNewsStyle from './modal/ImgNews/ImgNews_Style/index'
import ImgNewsData from './modal/ImgNews/ImgNews_Data/index'
import BlankSectionData from './modal/BlankSection/Data'
import BlankSectionStyle from './modal/BlankSection/Style'
import CarouselSectionData from './modal/CarouselSection/Data/index'
import CarouselSectionStyle from './modal/CarouselSection/Style/index'
import SingleImgData from './modal/SingleImg/Data/index'
import SingleImgStyle from './modal/SingleImg/Style/index'
import NavSectionData from './modal/NavSection/Data/index'
import NavSectionStyle from './modal/NavSection/Style/index'
import MainSectionData from './modal/MainSection/Data/index'
import MainSectionStyle from './modal/MainSection/Style/index'
import NewsDetailSectionData from './modal/NewsDetailSection/Data/index'
import NewsDetailSectionStyle from './modal/NewsDetailSection/Style/index'
import SubscribePopupData from './modal/popup/SubscribePopup/Data/index'
import SubscribePopupStyle from './modal/popup/SubscribePopup/Style/index'
import ApplyPopupData from './modal/popup/ApplyPopup/Data/index'
import ApplyPopupStyle from './modal/popup/ApplyPopup/Style/index'

import VisContext from "@/views/Visualization/context/VisContext";
import update from 'immutability-helper';

const Index = (props) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

	useEffect(() => {
  }, []);

  // 更新数据
  const onFinish = (data) => {
    setChooseSection(update(chooseSection, {$merge: {
      data
    }}))
    props.modalChange(false)
  }
  
  const showModalComp = () => {
    if(!props.section) {
      return null
    }
    const sectionType = props.section.type
    const type = props.type
    let targetComp = null
    if(type === 'element') { // 元素
      targetComp = ElementListModal
    } else { // 模块
      if(sectionType === 'blankSection') { // 空白模块
        if(type === 'data') {
          targetComp = BlankSectionData
        }
        if(type === 'style') {
          targetComp = BlankSectionStyle
        }
      } else if(sectionType === 'imgNews') { // 图文模块
        if(type === 'data') {
          targetComp = ImgNewsData
        }
        if(type === 'style') {
          targetComp = ImgNewsStyle
        }
      } else if(sectionType === 'carouselSection') { // 轮播图
        if(type === 'data') {
          targetComp = CarouselSectionData
        }
        if(type === 'style') {
          targetComp = CarouselSectionStyle
        }
      } else if(sectionType === 'singleImg') { // 单图
        if(type === 'data') {
          targetComp = SingleImgData
        }
        if(type === 'style') {
          targetComp = SingleImgStyle
        }
      } else if(sectionType === 'navSection') { // 导航栏
        if(type === 'data') {
          targetComp = NavSectionData
        }
        if(type === 'style') {
          targetComp = NavSectionStyle
        }
      } else if(sectionType === 'mainSection') { // 导航栏
        if(type === 'data') {
          targetComp = MainSectionData
        }
        if(type === 'style') {
          targetComp = MainSectionStyle
        }
      }  else if(sectionType === 'newsDetailSection') { // 新闻详情
        if(type === 'data') {
          targetComp = NewsDetailSectionData
        }
        if(type === 'style') {
          targetComp = NewsDetailSectionStyle
        }
      } else if(sectionType === 'subscribePopup') { // 预约弹窗
        if(type === 'data') {
          targetComp = SubscribePopupData
        }
        if(type === 'style') {
          targetComp = SubscribePopupStyle
        }
      } else if(sectionType === 'applyPopup') { // 预约弹窗
        if(type === 'data') {
          targetComp = ApplyPopupData
        }
        if(type === 'style') {
          targetComp = ApplyPopupStyle
        }
      }
    }
    
    if(targetComp) {
      return (
        <CommonComp 
          Component={targetComp}
          modalChange={props.modalChange}
          onFinish={onFinish}
          data={props.section}/>
      )
    }
    return null
  }
  
  const CommonComp = ({Component, ...restProps}) => {
    return <Component {...restProps}/>
  }

	return (
		<>
      <div>
        {
          showModalComp()
        }
      </div>
    </>
	)
}

export default Index