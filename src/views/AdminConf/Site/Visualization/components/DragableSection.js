import React, {useState, useEffect, useRef, useCallback} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import lodash from 'lodash'
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import {
	WhiteSection,
  ImgNews
} from "../widgets";

const type = 'DragableBodyRow';

const DragableSection = ({ section, index, moveRow, className, style, ...restProps }) => {
	const ref = React.useRef();
	
	const setComponent = (section) =>{
    const type = section.type
			if(type === 'WhiteSection') {
				return <WhiteSection data={section}/>;
			} else if(type === 'ImgNews') {
				return <ImgNews data={section}/>;
			}
	}

  // 选中模块
	const activeSection = (section, index) =>{
    restProps.activeSection(section, index)	
	}
	
	
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
		<div ref={ref} 
			className={`vis-section-item-wrap ${isOver ? dropClassName : ''}`}
			style={{ cursor: 'move', ...style }}
			onClick={() => {activeSection(section, index)}} key={section.sectionId}>
			<div className="vis-section-item-mask" key={section.sectionId}></div>
			<div className="vis-section-item-inner">
				{setComponent(section)}
			</div>
		</div>
	)
};

export default DragableSection