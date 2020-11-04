import React, {useEffect} from "react";
import { SettingOutlined, DeleteOutlined, SendOutlined, DatabaseOutlined} from '@ant-design/icons';

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

  const handleAnimation = () => {
    props.handleAnimation()
  }

	return (
    <div>
      <div className="vis-section-item-btns vis-element-item-btns">
        {/* <span
          className={'rnd-handler'}>
          <DragOutlined />
        </span> */}
        <span
          title='修改元素'
          onClick={() => {handleEdit()}}>
          <SettingOutlined />
        </span>
        {
          props.type === 'formElement' && (
            <span
              title='修改配置'
              onClick={() => {handleConfig()}}>
              <DatabaseOutlined />
            </span>
          )
        }
        <span
          title='编辑动画'
          onClick={() => {handleAnimation()}}>
          <SendOutlined />
        </span>
        <span
          title='删除元素'
          onClick={() => {handleDel()}}>
          <DeleteOutlined />
        </span>
      </div>
    </div>
	)
};

export default SectionBtns