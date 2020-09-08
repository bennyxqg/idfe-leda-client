import React, {useState, useEffect, useRef, useCallback, useContext} from "react";
import lodash from 'lodash'
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { getItemIndexByKey, swapArray } from '@/utils/helper'
import SectionBtns from './SectionBtns'
import VisContext from "../VisContext";

import {
	BlankSection,
  ImgNews,
  SingleImg,
  CarouselSection,
  NavSection,
  MainSection
} from "../widgets";

// const contexts = require.context('../widgets', true, /\.js$/);

// contexts.keys().forEach(component => {
//   console.log('--widgets---files-----', component)
// })

const type = 'DragableBodyRow';

const DragableSection = ({ section, index, moveRow, className, style, ...restProps }) => {
  const { chooseSection, setChooseSection, sectionList, setSectionList, setShowAddModal } = useContext(VisContext)
  const [isHover, setIsHover] = useState(false)
  
  const ref = React.useRef();
  
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
      }
	}

  // 选中模块
	const activeSection = (section, index) =>{
    // restProps.activeSection(section, index)	
  }
  
  const handleMouseUserOver = (e, section, index) =>{
    setIsHover(true)
  }

  const handleMouseOut = (e, section, index) =>{
    setIsHover(false)
  }

  // 右上角按钮事件
  const handleBtns = (type, section, opts) =>{
    if(type === 'style') { // 样式
      setChooseSection(section)
      restProps.showModal(type, section)
    } else if(type === 'data') { // 数据
      setChooseSection(section)
      restProps.showModal(type, section)
    } else if(type === 'del') { // 删除
      const index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      const sectionListTemp = lodash.cloneDeep(sectionList)
      sectionListTemp.splice(index, 1)
      setSectionList(sectionListTemp)
    } else if(type === 'up') { // 上移
      const index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      if(index === 0) {
        return
      }
      let sectionListTemp = lodash.cloneDeep(sectionList)
      sectionListTemp = swapArray(sectionListTemp, index, index - 1)
      setSectionList(sectionListTemp)
    } else if(type === 'down') { // 下移
      const index = getItemIndexByKey(sectionList, 'sectionId', section.sectionId)
      if(index === sectionList.length - 1) {
        return
      }
      let sectionListTemp = lodash.cloneDeep(sectionList)
      sectionListTemp = swapArray(sectionListTemp, index, index + 1)
      setSectionList(sectionListTemp)
    } else if(type === 'add') { // 增加模块
      const direction = opts.direction
      console.log('-----direction-----', direction)
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
    }
  }
	
	// 用于将当前组件用作拖动源的钩子
	const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  
	return (
    <>{
      section? (
        <div 
          // ref={ref} 
          className={`vis-section-item-wrap ${isOver ? dropClassName : ''}`}
          style={{ ...style }}
          // onMouseOver={(e) => {handleMouseUserOver(e, section, index)}}
          // onMouseLeave={(e) => {handleMouseOut(e, section, index)}}
          onClick={() => {activeSection(section, index)}} key={section.sectionId}>
          {/* <div className="vis-section-item-mask" key={section.sectionId}></div> */}
          <div className="vis-section-item-inner" id={`section_${section.sectionId}`}>
            {setComponent(section)}
          </div>
          {/* {
            isHover && 
            <SectionBtns 
              handleStyle={() => {handleBtns('style', section)}}
              handleData={() => {handleBtns('data', section)}}
              handleDel={() => {handleBtns('del', section)}}
              handleUp={() => {handleBtns('up', section)}}
              handleDown={() => {handleBtns('down', section)}}
              handleElement={() => {handleBtns('element', section)}}
              handleAdd={(direction) => {handleBtns('add', section, {
                direction
              })}}
            />
          } */}
          {
            <div className='section-btns-wrap'>
              <SectionBtns 
                handleStyle={() => {handleBtns('style', section)}}
                handleData={() => {handleBtns('data', section)}}
                handleDel={() => {handleBtns('del', section)}}
                handleUp={() => {handleBtns('up', section)}}
                handleDown={() => {handleBtns('down', section)}}
                handleElement={() => {handleBtns('element', section)}}
                handleAdd={(direction) => {handleBtns('add', section, {
                  direction
                })}}
              />
            </div>
          }
        </div>
      ): null
    }
    </>
	)
};

export default DragableSection