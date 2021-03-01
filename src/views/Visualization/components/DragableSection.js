import React, {useState, useEffect, useRef, memo, useContext} from "react";
import {cloneDeep, isEqual} from 'lodash'
import { getItemIndexByKey, swapArray } from '@/utils/helper'
import SectionBtns from './SectionBtns'
import VisContext from "@/views/Visualization/context/VisContext";
import classNames from 'classnames'
import {copyText} from '@/views/Visualization/utils/index.js'
import {message} from 'antd'

import {
	BlankSection,
  ImgNews,
  SingleImg,
  CarouselSection,
  NavSection,
  MainSection,
  NewsDetailSection,
  SubscribePopup,
  ApplyPopup,
  Sidebar,
} from "../widgets";

// const contexts = require.context('../widgets', true, /\.js$/);

// contexts.keys().forEach(component => {
//   console.log('--widgets---files-----', component)
// })

const DragableSection = memo(({ section, index, className, style, ...restProps }) => {
  const { setChooseSection, sectionList, setSectionList, setShowAddModal } = useContext(VisContext)
  
	const setComponent = (section) =>{
    const type = section.type
			if(type === 'blankSection') {
				return <BlankSection data={section}/>;
			} else if(type === 'imgNews') {
				return <ImgNews data={section}/>;
			} else if(type === 'singleImg') {
				return <SingleImg data={section}/>;
			} else if(type === 'carouselSection') {
				return <CarouselSection data={section}/>;
			} else if(type === 'navSection') {
				return <NavSection data={section}/>;
      } else if(type === 'mainSection') {
				return <MainSection data={section}/>;
      }  else if(type === 'newsDetailSection') {
				return <NewsDetailSection data={section}/>;
      } else if(type === 'subscribePopup') {
        // return <SubscribePopup data={section}/>;
        return <ApplyPopup data={section}/>;
      } else if(type === 'applyPopup') {
				return <ApplyPopup data={section}/>;
      } else if(type === 'commonSidebar') {
				return <Sidebar data={section}/>;
      }
	}
  

  // 右上角按钮事件
  const handleBtns = (type, section, opts) =>{
    console.log('----handleBtns-----', type)
    if(type === 'style') { // 样式
      setChooseSection(section)
      restProps.showModal(type, section)
    } else if(type === 'data') { // 数据
      setChooseSection(section)
      restProps.showModal(type, section)
    } else if(type === 'del') { // 删除
      const index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      const sectionListTemp = cloneDeep(sectionList)
      sectionListTemp.splice(index, 1)
      setSectionList(sectionListTemp)
    } else if(type === 'up') { // 上移
      const index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      if(index === 0) {
        return
      }
      let sectionListTemp = cloneDeep(sectionList)
      sectionListTemp = swapArray(sectionListTemp, index, index - 1)
      setSectionList(sectionListTemp)
    } else if(type === 'down') { // 下移
      const index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      if(index === sectionList.length - 1) {
        return
      }
      let sectionListTemp = cloneDeep(sectionList)
      sectionListTemp = swapArray(sectionListTemp, index, index + 1)
      setSectionList(sectionListTemp)
    } else if(type === 'add') { // 增加模块
      const direction = opts.direction
      let index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      if(direction === 'down') {
        index++
      }
      setShowAddModal({
        show: true,
        index
      })
    } else if(type === 'element') { // 添加元素到模块中
      setChooseSection(section)
      restProps.showModal(type, section)
    } else if(type === 'getInfo') { // 复制id
      console.log('------section----', section)
      copyText('section_' + section.sectionId)
      message.success('复制id成功')
    }
  }
  
	return (
    <>{
      section? (
        <div 
          className={`vis-section-item-wrap`}
          style={{ ...style }}
          key={section.sectionId}>
          <div className="vis-section-item-inner" id={`section_${section.sectionId}`}>
            {setComponent(section)}
          </div>
          {
            <div
              className={classNames({
                'section-btns-wrap': true,
                'section-btns-bottom-pos': index === 0
              })}
            >
              <SectionBtns 
                section={section}
                handleStyle={() => {handleBtns('style', section)}}
                handleData={() => {handleBtns('data', section)}}
                handleDel={() => {handleBtns('del', section)}}
                handleUp={() => {handleBtns('up', section)}}
                handleDown={() => {handleBtns('down', section)}}
                handleElement={() => {handleBtns('element', section)}}
                handleAdd={(direction) => {handleBtns('add', section, {
                  direction
                })}}
                handleGetInfo={(direction) => {handleBtns('getInfo', section)}}
              />
            </div>
          }
        </div>
      ): null
    }
    </>
	)
}, 
// (prevProps, nextProps) => true
(prevProps, nextProps) => {
  const isSame = isEqual(prevProps.section.data, nextProps.section.data)
  console.log('----isSame-----', isSame)
  return false
}
)

export default DragableSection
