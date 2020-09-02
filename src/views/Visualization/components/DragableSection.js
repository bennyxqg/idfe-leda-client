import React, {useState, useEffect, useRef, useCallback, useContext} from "react";
import lodash from 'lodash'
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { getItemIndexByKey, swapArray } from '@/utils/helper'
import SectionBtns from './SectionBtns'
import VisContext from "../VisContext";

import {
	WhiteSection,
  ImgNews,
  SingleImg,
  CarouselSection,
  NavSection
} from "../widgets";

// const contexts = require.context('../widgets', true, /\.js$/);

// contexts.keys().forEach(component => {
//   console.log('--widgets---files-----', component)
// })

const type = 'DragableBodyRow';

const DragableSection = ({ section, index, moveRow, className, style, ...restProps }) => {
  const { chooseSection, setChooseSection, sectionList, setSectionList } = useContext(VisContext)
  const [isHover, setIsHover] = useState(false)
  
  const ref = React.useRef();
  
	const setComponent = (section) =>{
    const type = section.type
			if(type === 'WhiteSection') {
				return <WhiteSection data={section}/>;
			} else if(type === 'ImgNews') {
				return <ImgNews data={section}/>;
			} else if(type === 'SingleImg') {
				return <SingleImg data={section}/>;
			} else if(type === 'CarouselSection') {
				return <CarouselSection data={section}/>;
			} else if(type === 'NavSection') {
				return <NavSection data={section}/>;
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
      if(direction === 'up') {

      }
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
        <div ref={ref} 
          className={`vis-section-item-wrap ${isOver ? dropClassName : ''}`}
          style={{ cursor: 'move', ...style }}
          onMouseOver={(e) => {handleMouseUserOver(e, section, index)}}
          onMouseLeave={(e) => {handleMouseOut(e, section, index)}}
          onClick={() => {activeSection(section, index)}} key={section.sectionId}>
          {/* <div className="vis-section-item-mask" key={section.sectionId}></div> */}
          <div className="vis-section-item-inner" id={`section_${section.sectionId}`}>
            {setComponent(section)}
          </div>
          {
            isHover && 
            <SectionBtns 
              handleStyle={() => {handleBtns('style', section)}}
              handleData={() => {handleBtns('data', section)}}
              handleDel={() => {handleBtns('del', section)}}
              handleUp={() => {handleBtns('up', section)}}
              handleDown={() => {handleBtns('down', section)}}
              handleAdd={(direction) => {handleBtns('add', section, {
                direction
              })}}
            />
          }
        </div>
      ): null
    }
    </>
	)
};

export default DragableSection
