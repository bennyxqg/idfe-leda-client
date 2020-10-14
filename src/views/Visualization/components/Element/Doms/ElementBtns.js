import React, {useEffect} from "react";
import { SettingOutlined, DeleteOutlined, DragOutlined, DatabaseOutlined} from '@ant-design/icons';

const SectionBtns = (props) => {

  useEffect(() => {
    
  }, []);

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
        {/* <span
          className={'rnd-handler'}>
          <DragOutlined />
        </span> */}
        <span
          onClick={() => {handleEdit()}}>
          <SettingOutlined />
        </span>
        {
          props.type === 'formElement' && (
            <span
              onClick={() => {handleConfig()}}>
              <DatabaseOutlined />
            </span>
          )
        }
        <span
          onClick={() => {handleDel()}}>
          <DeleteOutlined />
        </span>
      </div>
    </div>
	)
};

export default SectionBtns