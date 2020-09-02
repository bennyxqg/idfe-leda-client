import React, {useState, useEffect, useRef, useContext} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import lodash from 'lodash';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import VisContext from "@/views/Visualization/VisContext";

const type = 'DragableElement';

const Index = (props) => {
  const { elementList, setElementList } = useContext(VisContext)

  // 放置元素回调
  const moveElement = (index, left, top) => {
    const elementListTemp = lodash.cloneDeep(elementList)
    elementListTemp[index].data.left = left
    elementListTemp[index].data.top = top
    setElementList(elementListTemp)
  };

  // 用于将当前组件用作拖动源的钩子
  const ref = React.useRef();
  const [, drag] = useDrag({
    item: { type, 
      index: props.index,
      top: props.data.data.top, 
      left: props.data.data.left,
      dropCB: moveElement
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref)

	return (
    <div>
        <div className='drag-element-item' ref={ref}
          style={{
            top: props.data.data.top + 'px',
            left: props.data.data.left + 'px'
          }}
        >
          <Button>{props.data.data.text}</Button>
        </div>
    </div>
	)
}

export default Index