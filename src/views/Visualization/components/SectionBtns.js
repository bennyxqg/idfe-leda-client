import React, {useContext} from "react";
import { ArrowUpOutlined, ArrowDownOutlined, 
  SettingOutlined,DeleteOutlined,
  PlusOutlined, AppstoreOutlined,
  InfoCircleOutlined, } from '@ant-design/icons';
import {MagicIcon} from '@/utils/icons'
import VisContext from "@/views/Visualization/context/VisContext";

const SectionBtns = (props) => {

  const { pageItem, pageKind } = useContext(VisContext)

  const handleStyle = () => {
    props.handleStyle()
  }

  const handleData = () => {
    props.handleData()
  }

  const handleDel = () => {
    props.handleDel()
  }

  // 上移
  const handleUp = () => {
    props.handleUp()
  }

  // 下移
  const handleDown = () => {
    props.handleDown()
  }

  // 添加元素
  const handleElement = () => {
    props.handleElement()
  }

  const handleAdd = (type) => {
    props.handleAdd(type)
  }

  const handleGetInfo = () => {
    props.handleGetInfo()
  }

	return (
    <div>
      <div className={`vis-section-item-btns vis-section-item-btns-kind-${pageKind}`}>
        <span
          title={'section_' + props.section.sectionId}
          onClick={() => {handleGetInfo()}}
        ><InfoCircleOutlined /></span>
        {
          (pageItem.type === 'pc' || pageItem.type === 'guide' || pageItem.type === 'wap') && (
            <>
              <span
                title='上移'
                onClick={() => {handleUp()}}
              ><ArrowUpOutlined /></span>
              <span
                title='下移'
                onClick={() => {handleDown()}}
              ><ArrowDownOutlined /></span>
            </>
          )
        }
        <span
          title='修改样式'
          onClick={() => {handleStyle()}}
        ><MagicIcon /></span>
        <span
          title='修改数据'
          onClick={() => {handleData()}}
        >
          <SettingOutlined />
        </span>
        <span
          title='添加元素'
          onClick={() => {handleElement()}}
        >
          <AppstoreOutlined />
        </span>
        {
          (pageItem.type === 'pc' || pageItem.type === 'guide' || pageItem.type === 'wap') && (
            <span
              title='删除模块'
              onClick={() => {handleDel()}}
            ><DeleteOutlined /></span>
           )
        }
      </div>
      {
        (pageItem.type === 'pc' || pageItem.type === 'guide' || pageItem.type === 'wap') && (
          <div className={`vis-add-section-btns `}>
            <div className="vis-add-section-btns-up"
              onClick={() => {handleAdd('up')}}
            >
              <PlusOutlined />
            </div>
            <div className="vis-add-section-btns-down"
              onClick={() => {handleAdd('down')}}
            >
              <PlusOutlined />
            </div>
          </div>
        )
      }
      
    </div>
	)
};

export default SectionBtns