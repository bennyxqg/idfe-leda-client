import React, {useState, useEffect, useRef, useCallback} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, StarOutlined, FormOutlined, SettingOutlined,DeleteOutlined } from '@ant-design/icons';

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

	return (
		<div >
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
	)
};

export default SectionBtns