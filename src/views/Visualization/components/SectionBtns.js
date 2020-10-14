import React, {useContext} from "react";
import { ArrowUpOutlined, ArrowDownOutlined, 
  SettingOutlined,DeleteOutlined,
  PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
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

	return (
    <div>
      <div className={`vis-section-item-btns vis-section-item-btns-kind-${pageKind}`}>
        {
          pageItem.type === 'page' && (
            <>
              <span
                onClick={() => {handleUp()}}
              ><ArrowUpOutlined /></span>
              <span
                onClick={() => {handleDown()}}
              ><ArrowDownOutlined /></span>
            </>
          )
        }
        <span
          onClick={() => {handleStyle()}}
        ><MagicIcon /></span>
        <span
          onClick={() => {handleData()}}
        >
          <SettingOutlined />
        </span>
        <span
          onClick={() => {handleElement()}}
        >
          <AppstoreOutlined />
        </span>
        {
           pageItem.type === 'page' && (
            <span
              onClick={() => {handleDel()}}
            ><DeleteOutlined /></span>
           )
        }
      </div>
      {
        pageItem.type === 'page' && (
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