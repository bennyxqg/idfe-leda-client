import React, {useEffect} from "react";
import { SettingOutlined, DeleteOutlined, 
  SendOutlined, DatabaseOutlined, 
  LinkOutlined, DisconnectOutlined } from '@ant-design/icons';

const SectionBtns = (props) => {

  useEffect(() => {
    
  }, []);

  let hasParent = false
  console.log('----props.parent-----', props.parent)
  if(props.parent) {
    hasParent = true
  }

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

  // 依附于轮播图上
  const handleAttach = () => {
    console.log('------props.section-------', props.section)
    props.handleAttach()
  }

	return (
    <div>
      <div className="vis-section-item-btns vis-element-item-btns">
        {/* <span
          className={'rnd-handler'}>
          <DragOutlined />
        </span> */}
        {
          props.section.type === 'carouselSection' && (
            <span
              title={hasParent?'取消依附':'依附'}
              onClick={() => {handleAttach()}}>
                {
                  hasParent? (
                    <DisconnectOutlined />
                  ):(
                    <LinkOutlined />
                  )
                }
            </span>
          )
        }
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