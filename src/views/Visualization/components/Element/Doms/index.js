import React, {useState, useEffect, useRef, useContext} from "react";
import ImageComp from './Image/index'
import VideoComp from './Video/index'
import TextComp from './Text/index'
import BMapComp from './BMap/index'
import FormComp from './Form/index'
import RichTextComp from './RichText/index'
import {Rnd} from 'react-rnd'
import {cloneDeep, merge} from 'lodash'
import { getItemIndexByKey } from '@/utils/helper'
import VisContext from "@/views/Visualization/context/VisContext";
import ElementBtns from './ElementBtns'
import EditForm from '@/views/Visualization/components/Element/ListModal/index'
import ElementContext from "@/views/Visualization/context/ElementContext";
import FormConfModal from '@/views/Visualization/components/Element/FormList/Form/config/index'
import classNames from 'classnames'

const Index = (props) => {
  const { sectionList, setSectionList, pageKind } = useContext(VisContext)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentElement, setCurrentElement] = useState(null)
  const [currentType, setCurrentType] = useState('')
  const [selectId, setSelectId] = useState('')
  const [maxZIndex, setMaxZIndex] = useState(10)
  const [resizeId, setResizeId] = useState('')

	useEffect(() => {
    let zIndexTemp = 1
    props.list.forEach((item) => {
      if(item.data.zIndex) {
        if(item.data.zIndex > zIndexTemp) {
          zIndexTemp = item.data.zIndex
        }
      }
    })
    if(maxZIndex <= zIndexTemp) {
      setMaxZIndex(zIndexTemp + 1)
    }
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
    } else if(type === "bMapElement") { // 百度地图
      targetComp = BMapComp
    } else if(type === "formElement") { // 表单
      targetComp = FormComp
    } else if(type === "videoElement") { // 视频
      targetComp = VideoComp
    } else if(type === "richTextElement") { // 富文本
      targetComp = RichTextComp
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
    console.log('-----moveItem------', e,d, data)
    // 位置不变时
    if(data.data.style.left === d.x && data.data.style.top === d.y) {
      return
    }
    
    let position_y = 0
    let position_x = 0
    
    if(d.y && d.x) {
      position_y = Math.round(d.y * 100) / 100
      position_x = Math.round(d.x * 100) / 100
    } else {
      return
    }
    
    updateSectiondata(data.elementId, {
      style: {
        top: position_y,
        left: position_x
      }
    })
  }

  // 更新模块数据
  const updateSectiondata = (elementId, dataObj) => {
    // 更新模块数据
		const sectionId = props.section.sectionId
		const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
    const sectionListTemp = cloneDeep(sectionList)

    const elementIndex = getItemIndexByKey(sectionListTemp[sectionIndex].data.elements, 'elementId', elementId)
    // sectionListTemp[sectionIndex].data.elements[elementIndex].data.style.top = position_y
    // sectionListTemp[sectionIndex].data.elements[elementIndex].data.style.left = position_x

    merge(sectionListTemp[sectionIndex].data.elements[elementIndex].data, dataObj)

		setSectionList(sectionListTemp)
  }
  
  // 右上角按钮事件
  const handleBtns = (type, data, opts) =>{
    if(type === 'del') { // 删除
      // 更新模块数据
      const sectionId = props.section.sectionId
      const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
      const sectionListTemp = cloneDeep(sectionList)
      
      const elementId = data.elementId
      const elementIndex = getItemIndexByKey(sectionListTemp[sectionIndex].data.elements, 'elementId', elementId)
      sectionListTemp[sectionIndex].data.elements.splice(elementIndex, 1)
      
      setSectionList(sectionListTemp)
    } else {
      if(type === 'edit') { // 编辑
        
      } else if(type === 'config') { // 配置
      }
      setCurrentElement(cloneDeep(data))
      setCurrentType(type)
      setShowEditModal(true)
    }
  }

  // 显示配置弹窗
  const activeModalComp = (params) => {
    if(params) {
      if(params.type === 'edit') {
        return <EditForm 
          {...params}
        />
      }
      if(params.type === 'config') {
        if(params.data.type === "formElement") {
          return <FormConfModal 
          {...params}
          />
        }
      }
    }
    return null
  }

  // 编辑完成
  const editFinish = (data) => {
    // 更新模块数据
    const sectionId = props.section.sectionId
    const sectionIndex = getItemIndexByKey(sectionList, 'sectionId', sectionId)
    const sectionListTemp = cloneDeep(sectionList)
    
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

  // 缩放停止
  const handleResizeStop = (e,d,dom,size, position,data) => {
    console.log('-----handleResizeStop---e-2 1 --', e,d,dom,size, position,data)
    // console.log('-----handleResizeStop---d---', d, data)
    // setResizeId('')
    // return
    const directionStr = d.toLowerCase()
    
    const styleObj = {}
    if(directionStr.indexOf('left') !==0 || directionStr.indexOf('top') !==0) {
      // 绝对定位位置发生改变
      styleObj.top = position.y
      styleObj.left = position.x

    } else{
      // 绝对定位位置不发生改变
    }

    const domWidth = dom.getBoundingClientRect().width
    const domHeight = dom.getBoundingClientRect().height

    styleObj.width = domWidth
    styleObj.height = domHeight - 1
    updateSectiondata(data.elementId, {
      style: styleObj
    })
  }

  // 缩放开始
  const handleResizeStart = (e,d, data) => {
    console.log('-----handleResizeStart------', e,d, data)
    //setResizeId(data.elementId)
    
  }
  
  
  const CommonComp = ({Component, data, ...restProps}) => {
    const selectItem = (data) => {
      // if(selectId && selectId === data.elementId) {
      //   setSelectId('')
      // } else {
      //   setSelectId(data.elementId)
      // }
      setSelectId(data.elementId)
      
    }

    // 拖拽开始
    const dragStart = (e,d, data) => {
      setSelectId(data.elementId)
    }

    

    return (
        <Rnd 
          default={{
            x: data.data.style.left,
            y: data.data.style.top,
          }}
          style={{
            // zIndex: selectId === data.elementId?2:1
            // zIndex: selectId === data.elementId?maxZIndex:(data.data.zIndex?data.data.zIndex:1)
          }}
          bounds={pageKind === 'pc'?`.${props.section.type}-wrap-inner-${props.section.sectionId}`: '.visualization-wrap'}
          // enableResizing={false}
          // position={{
          // 	x: data.data.style.left,
          // 	y: data.data.style.top,
          // }}
          className='vis-element-drag-item'
          onDragStop={(e,d) => moveItem(e,d, data)}
          // onDragStart={(e,d) => dragStart(e,d, data)}
          // dragHandleClassName="rnd-handler"
          // onClick={() => {selectItem(data)}}
          onResizeStop={(e,d,g,h, p) => handleResizeStop(e,d,g,h, p,data)}
          onResizeStart={(e,d) => handleResizeStart(e,d, data)}
        >
          <Component data={data} {...restProps}/>
          <div
            className={classNames({
              'hover-highlight': true,
              // 'hover': data.elementId === resizeId,
            })}
            // onClick={() => {eventLink(data.data)}}
            // onClick={() => {selectItem(data)}}
            // onClick={() => {console.log('--data.data----', data.data, eventLink)}}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            {
              // selectId === data.elementId && (
              //   <div className={'element-btns-wrap'}>
              //     <ElementBtns 
              //       type={data.type}
              //       handleDel={() => {handleBtns('del', data)}}
              //       handleEdit={() => {handleBtns('edit', data)}}
              //       handleConfig={() => {handleBtns('config', data)}}
              //     />
              //   </div>
              // )
              <div className={'element-btns-wrap'}>
                <ElementBtns 
                  type={data.type}
                  handleDel={() => {handleBtns('del', data)}}
                  handleEdit={() => {handleBtns('edit', data)}}
                  handleConfig={() => {handleBtns('config', data)}}
                />
              </div>
            }
          </div>
        </Rnd>
    )
  }

	return (
		<ElementContext.Provider
      value={{

      }}
    >
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
          // <EditForm 
          //   type='edit'
          //   data={currentElement}
          //   onFinish={editFinish}
          //   modalChange={editFormModalChange}
          // />
          activeModalComp(
            {
              type: currentType,
              data: currentElement,
              onFinish: editFinish,
              modalChange: editFormModalChange,
              sectionId: props.section.sectionId
            }
          )
        }
      </div>
    </ElementContext.Provider>
	)
}

export default Index