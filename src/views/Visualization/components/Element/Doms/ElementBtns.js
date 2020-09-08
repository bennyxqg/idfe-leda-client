import React, {useState, useEffect, useRef, useCallback} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { SettingOutlined, DeleteOutlined, DragOutlined} from '@ant-design/icons';

const SectionBtns = (props) => {

  const handleDel = () => {
    props.handleDel()
  }

  const handleEdit = () => {
    props.handleEdit()
  }

	return (
    <div>
      <div className="vis-section-item-btns">
        <span
          className={'rnd-handler'}
        >
          <DragOutlined />
        </span>
        <span
          onClick={() => {handleEdit()}}
        >
          <SettingOutlined />
        </span>
        <span
          onClick={() => {handleDel()}}
        ><DeleteOutlined /></span>
      </div>
    </div>
	)
};

export default SectionBtns