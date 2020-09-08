import React, {useState, useEffect, useRef, useContext} from "react";
import ImageComp from './Image/index'
import TextComp from './Text/index'
import {Rnd} from 'react-rnd'
import lodash from 'lodash'
import { getItemIndexByKey } from '@/utils/helper'
import VisContext from "@/views/Visualization/VisContext";
import ElementBtns from './ElementBtns'
import EditForm from '@/views/Visualization/components/Element/FormList/EditForm'
import {eventLink} from '@/views/Visualization/utils/index'

const Index = (props) => {
  const { sectionList, setSectionList } = useContext(VisContext)

  const [showEditModal, setShowEditModal] = useState(false)
  const [currentElement, setCurrentElement] = useState(null)

	useEffect(() => {
    console.log('----elements--------', props)
  }, []);
  
  const showComp = (item, index) => {
    if(!props.section) {
      return null
    }
    const type = item.type
    let targetComp = null
    // 元素
    if(type === "imageElement") { // 图片
      targetComp = ImageComp
    } else if(type === "textElement") { // 文字
      targetComp = TextComp
    }
    
    if(targetComp) {
      return (
        <CommonComp 
          key={index}
          Component={targetComp}
          data={item}/>
      )
    }
    return null
  }

  const moveItem = (e,d, data) => {
		// 更新模块数据
		const sectionId = props.section.sectionId
		const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
    const sectionListTemp = lodash.cloneDeep(sectionList)
    
    const elementId = data.elementId
    const elementIndex = getItemIndexByKey(sectionListTemp[sectionIndex].data.elements, 'elementId', elementId)
    sectionListTemp[sectionIndex].data.elements[elementIndex].data.style.top = d.y
    sectionListTemp[sectionIndex].data.elements[elementIndex].data.style.left = d.x
		
		setSectionList(sectionListTemp)
  }
  
  // 右上角按钮事件
  const handleBtns = (type, data, opts) =>{
      
    if(type === 'del') { // 删除
      // 更新模块数据
      const sectionId = props.section.sectionId
      const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
      const sectionListTemp = lodash.cloneDeep(sectionList)
      
      const elementId = data.elementId
      const elementIndex = getItemIndexByKey(sectionListTemp[sectionIndex].data.elements, 'elementId', elementId)
      sectionListTemp[sectionIndex].data.elements.splice(elementIndex, 1)
      
      setSectionList(sectionListTemp)
    } else if(type === 'edit') { // 编辑
      console.log('----handleBtns------', type, data)
      setShowEditModal(true)
      setCurrentElement(lodash.cloneDeep(data))
    }
  }

  // 编辑完成
  const editFinish = (data) => {
    // 更新模块数据
    const sectionId = props.section.sectionId
    const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
    const sectionListTemp = lodash.cloneDeep(sectionList)
    
    const elementId = currentElement.elementId
    const elementIndex = getItemIndexByKey(sectionListTemp[sectionIndex].data.elements, 'elementId', elementId)
    sectionListTemp[sectionIndex].data.elements[elementIndex].data = data
    setSectionList(sectionListTemp)
    editFormModalChange()
  }

  // 关闭编辑元素弹窗
  const editFormModalChange = () => {
    setShowEditModal(false)
    setCurrentElement(null)
  }
  
  const CommonComp = ({Component, data, ...restProps}) => {
    return (
      <Rnd 
        default={{
          x: data.data.style.left,
          y: data.data.style.top,
        }}
        // style={{
        // 	position: 'absolute',
        // 	top: '50%', left: '50%'
        // }}
        bounds={`.${props.section.type}-wrap-inner-${props.section.sectionId}`}
        enableResizing={false}
        // position={{
        // 	x: data.btn.style.left,
        // 	y: data.btn.style.top,
        // }}
        className='vis-element-drag-item'
        onDragStop={(e,d) => moveItem(e,d, data)}
        dragHandleClassName="rnd-handler"
      >
        <Component data={data} {...restProps}/>
        <div className='hover-highlight'
          onClick={() => {eventLink(data.data)}}
          // onClick={() => {console.log('--data.data----', data.data, eventLink)}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            'zIndex': 2
          }}
        >
        </div>
        <div className={'element-btns-wrap'}>
          <ElementBtns 
            handleDel={() => {handleBtns('del', data)}}
            handleEdit={() => {handleBtns('edit', data)}}
          />
        </div>
      </Rnd>)
  }

	return (
		<>
      <div>
        {
          props.list && (
            props.list.map((item, index) => {
              return (
                showComp(item, index)
              )
            })
          )
        }
        {
          showEditModal && currentElement &&
          <EditForm 
            data={currentElement}
            onFinish={editFinish}
            modalChange={editFormModalChange}
          />
        }
      </div>
    </>
	)
}

export default Index