import React, {useState, useEffect, useCallback} from "react";
import FormWidgetsComp from '@/views/Visualization/components/Common/FormElement/FormWidgetsComp/index.js'
import '../index.scss'
import { cloneDeep } from "lodash";
import { ArrowUpOutlined, ArrowDownOutlined, 
  FormOutlined,DeleteOutlined,
  FontSizeOutlined,LineHeightOutlined,
  AimOutlined, CloseOutlined,
  DownSquareOutlined,
  PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import { randomCode } from '@/utils/helper'
import classNames from "classnames";
import FormItemEditModal from "../FormItemEditModal/index";
import { DndProvider, useDrag, useDrop, createDndContext, DragSource } from 'react-dnd';
import update from 'immutability-helper'

const dndType = 'DragableFormItem';

const widgetsTypeList = [
  {
    type: 'input',
    icon: <FontSizeOutlined />,
    label: '单行文本框'
  },
  {
    type: 'textarea',
    icon: <LineHeightOutlined />,
    label: '多行文本框'
  },
  {
    type: 'radio',
    icon: <AimOutlined />,
    label: '单选框'
  },
  {
    type: 'checkbox',
    icon: <AppstoreOutlined />,
    label: '多选框'
  },
  {
    type: 'select',
    icon: <DownSquareOutlined />,
    label: '下拉框'
  }
]

// 表单控件列表
const Index = (props) => {
  const [itemList, setItemList] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)

  useEffect(() => {
    if(props.data && props.data.length) {
      setItemList(cloneDeep(props.data))
    }
  }, []);

  const handleAdd = (type, index) => {
    if(type === 'down') {
      index += 1
    }
    itemList.splice(index, 0 , {
      type: 'addItem'
    })
    setItemList(cloneDeep(itemList))
  }

  // 取消控件选择
  const cancelToolbar = (index) => {
    itemList.splice(index, 1)
    setItemList(cloneDeep(itemList))
  }

  // 添加控件
  const chooseWidget = (item, index) => {
    const itemData = {}
    itemData.type = item.type
    itemData.isVerification = false
    itemData.regex = ''
    itemData.name = item.type + '_' + randomCode(10)
    itemData.placeholder = ''
    itemData.itemId = 'form-item-' + randomCode(10)
    if(item.type === 'input') {
      itemData.label = '单行文本框'
    }
    if(item.type === 'textarea') {
      itemData.label = '多行文本框'
    }
    if(item.type === 'radio') {
      itemData.label = '单选框'
      itemData.items = [
        {
          label: '选项1',
          value: 'option_1',
          checked: true
        },
        {
          label: '选项2',
          value: 'option_2',
          checked: false
        }
      ]
    }
    if(item.type === 'checkbox') {
      itemData.label = '多选框'
      itemData.items = [
        {
          label: '选项1',
          value: 'option_1',
          checked: false
        },
        {
          label: '选项2',
          value: 'option_2',
          checked: false
        }
      ]
    }
    if(item.type === 'select') {
      itemData.label = '下拉框'
      itemData.items = [
        {
          label: '选项1',
          value: 'option_1'
        },
        {
          label: '选项2',
          value: 'option_2',
        }
      ]
    }
    itemList.splice(index, 1, itemData)
    const itemListTemp = cloneDeep(itemList)
    setItemList(itemListTemp)
    if(props.onChange) {
      props.onChange(itemListTemp)
    }
  }

  // 编辑
  const handleEdit = (index) => {
    setCurrentItem(cloneDeep(itemList)[index])
    setCurrentIndex(index)
    setShowEditModal(true)
  }

  // 删除
  const handleDel = (index) => {
    const itemListTemp = cloneDeep(itemList)
    itemListTemp.splice(index, 1)
    setItemList(itemListTemp)
    if(props.onChange) {
      props.onChange(itemListTemp)
    }
  }

  // 编辑弹窗
  const modalChange = () => {
    setShowEditModal(false)
  }

  // 编辑完成回调
  const editItem = (itemData) => {
    const itemListTemp = cloneDeep(itemList)
    itemListTemp[currentIndex] = itemData
    setItemList(itemListTemp)
    if(props.onChange) {
      props.onChange(itemListTemp)
    }
  }

  // 改变数据顺序
  const moveItem=useCallback((dragIndex,hoverIndex)=>{
    // return
    // 把拖拽的元素的索引和鼠标悬浮的索引交换
    const dragRow=itemList[dragIndex]
    const itemListTemp = update(itemList,{
      $splice:[
          [dragIndex,1],
          // 删除
          [hoverIndex,0,dragRow]
          // 添加
          // 好像是个链式操作
      ]
    })
    setItemList(itemListTemp)
    props.onChange(itemListTemp)
  },[itemList])

  const FormItemComp = (subProps) => {
    const dndRef = React.useRef();
    
    // 用于将当前组件用作拖动源的钩子
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: dndType,
      collect: monitor => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === subProps.index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < subProps.index ? ' drop-over-downward' : ' drop-over-upward',
        };
      },
      drop: item => {
        subProps.moveItem(item.index, subProps.index);
      },
      // 存在性能问题，待优化，暂不使用hover回调函数
      // hover: (item:DragItem,mointor:DropTargetMonitor)=>{
      //   if(!dndRef.current){
      //     return
      //   }
      //   const dragIndex=item.index
      //   const hoverIndex=subProps.index
      //   if(dragIndex===hoverIndex){
      //       return 
      //   }

      //   const hoverBoundingRect=dndRef.current?.getBoundingClientRect()
      //   if(hoverBoundingRect){
      //     const hoverMiddleY=(hoverBoundingRect.bottom-hoverBoundingRect.top)/2
      //     const clientOffSet=mointor.getClientOffset()
      //     const hoverClientY=clientOffSet.y-hoverBoundingRect.top

      //     if(dragIndex<hoverIndex&&hoverClientY<hoverMiddleY){
      //         return 
      //     }

      //     if(dragIndex>hoverIndex&&hoverClientY>hoverMiddleY){
      //         return 
      //     }
      //     subProps.moveItem(item.index, subProps.index);
      //     item.index=hoverIndex
      //   }
      // },
    });
    const [, drag] = useDrag({
      item: { type: dndType, index: subProps.index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(dndRef));
    // drag(dndRef)

    return (
      <div>
        {
          subProps.formItem.type === 'addItem'? (
            <div className='el-form-builder-toolbar-wrap'>
              <p>请选择即将插入表单的表单项类型：</p>
              <div>
                <ul>
                  {
                    widgetsTypeList.map((item, i) => {
                      return (
                        <li key={i} onClick={() => {chooseWidget(item, subProps.index)}}>
                          <span className="item-type-icon">
                            {item.icon}
                          </span>
                          <span className="item-type-label">{item.label}</span>
                        </li>
                      )
                    })
                  }
                  <li onClick={() => {cancelToolbar(subProps.index)}}>
                    <span className="item-type-icon">
                      <CloseOutlined />
                    </span>
                    <span className="item-type-label">取消</span>
                  </li>
                </ul>
              </div>
            </div>
          ): (
            <div ref={ dndRef }  className={`el-form-item-wrap ${isOver ? dropClassName : ''}`}>
              <div className='el-form-item'>
                <div className='el-form-item-label'>
                  <span className='text'>{subProps.formItem.label}</span>
                  {
                    subProps.formItem.isMust && (
                      <span className='must'>*</span>
                    )
                  }
                </div>
                <div className='el-form-item-widget'>
                  {FormWidgetsComp(subProps.formItem)}
                </div>
              </div>
              {/* 编辑、删除表单项按钮 */}
              <div className='el-form-item-operate-btn'>
                <div className="el-form-item-operate-btn-edit"
                  onClick={() => {handleEdit(subProps.index)}}
                >
                  <FormOutlined />
                </div>
                <div className="el-form-item-operate-btn-del"
                  onClick={() => {handleDel(subProps.index)}}
                >
                  <DeleteOutlined />
                </div>
              </div>
              {/* 添加表单项按钮 */}
              <div className='el-form-item-add-btn'>
                <div className="el-form-item-add-btn-up"
                  onClick={() => {handleAdd('up', subProps.index)}}
                >
                  <PlusOutlined />
                </div>
                <div className="el-form-item-add-btn-down"
                  onClick={() => {handleAdd('down', subProps.index)}}
                >
                  <PlusOutlined />
                </div>
              </div>
            </div>
          )
        }
        </div>
    )
  }


  return (
    <div 
      className={classNames({
        [`${props.className}`]: true,
        'el-form-wrap': true
      })}
    >
      <ul>
        {
          itemList.map((formItem, index) => {
            return (
              <li key={index} >
                {
                  <FormItemComp 
                    formItem = {formItem}
                    index = {index}
                    moveItem = {moveItem}
                  />
                }
              </li>
            )
          })
        }
      </ul>
      {
        showEditModal && (
          <FormItemEditModal 
            modalChange={modalChange}
            onFinish={editItem}
            data={currentItem}
          />
        )
      }
    </div>
  )
}

export default Index