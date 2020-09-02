import React, {useState, useEffect, useRef, useContext} from "react";
import ImgNewsStyle from './modal/ImgNews/ImgNews_Style/index'
import ImgNewsData from './modal/ImgNews/ImgNews_Data/index'
import WhiteSectionData from './modal/WhiteSection/WhiteSection_Data'
import CarouselSectionData from './modal/CarouselSection/Data/index'
import CarouselSectionStyle from './modal/CarouselSection/Style/index'
import SingleImgData from './modal/SingleImg/Data/index'
import SingleImgStyle from './modal/SingleImg/Style/index'
import NavSectionData from './modal/NavSection/Data/index'
import NavSectionStyle from './modal/NavSection/Style/index'
import VisContext from "../VisContext";
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
    if(sectionType === 'WhiteSection') { // 空白模块
      if(type === 'data') {
        targetComp = WhiteSectionData
      }
      if(type === 'style') {
        targetComp = ImgNewsStyle
      }
    } else if(sectionType === 'ImgNews') { // 图文模块
      if(type === 'data') {
        targetComp = ImgNewsData
      }
      if(type === 'style') {
        targetComp = ImgNewsStyle
      }
    } else if(sectionType === 'CarouselSection') { // 轮播图
      if(type === 'data') {
        targetComp = CarouselSectionData
      }
      if(type === 'style') {
        targetComp = CarouselSectionStyle
      }
    } else if(sectionType === 'SingleImg') { // 单图
      if(type === 'data') {
        targetComp = SingleImgData
      }
      if(type === 'style') {
        targetComp = SingleImgStyle
      }
    } else if(sectionType === 'NavSection') { // 导航栏
      if(type === 'data') {
        targetComp = NavSectionData
      }
      if(type === 'style') {
        targetComp = NavSectionStyle
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