import React, {useState, useEffect, useRef, useCallback} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, 
  StarOutlined, FormOutlined, 
  SettingOutlined,DeleteOutlined,
  PlusOutlined } from '@ant-design/icons';

const SectionBtns = (props) => {

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

  const handleAdd = (type) => {
    props.handleAdd(type)
  }

	return (
    <div>
      <div className="vis-section-item-btns">
        <span
          onClick={() => {handleUp()}}
        ><ArrowUpOutlined /></span>
        <span
          onClick={() => {handleDown()}}
        ><ArrowDownOutlined /></span>
        <span
          onClick={() => {handleStyle()}}
        ><StarOutlined /></span>
        <span
          onClick={() => {handleData()}}
        ><FormOutlined /></span>
        <span><SettingOutlined /></span>
        <span><DeleteOutlined 
          onClick={() => {handleDel()}}
        /></span>
      </div>
      <div className="vis-add-section-btns">
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
    </div>
	)
};

export default SectionBtns