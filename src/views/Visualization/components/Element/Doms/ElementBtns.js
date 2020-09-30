import React from "react";
import { SettingOutlined, DeleteOutlined, DragOutlined, CloudServerOutlined} from '@ant-design/icons';

const SectionBtns = (props) => {

  const handleDel = () => {
    props.handleDel()
  }

  const handleEdit = () => {
    props.handleEdit()
  }

  const handleConfig = () => {
    props.handleConfig()
  }

	return (
    <div>
      <div className="vis-section-item-btns vis-element-item-btns">
        <span
          className={'rnd-handler'}>
          <DragOutlined />
        </span>
        <span
          onClick={() => {handleEdit()}}>
          <SettingOutlined />
        </span>
        <span
          onClick={() => {handleConfig()}}>
          <CloudServerOutlined />
        </span>
        <span
          onClick={() => {handleDel()}}>
          <DeleteOutlined />
        </span>
      </div>
    </div>
	)
};

export default SectionBtns