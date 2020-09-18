import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Button, Form, Input, message, Select, Table, Tabs } from 'antd';
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import ImgComp from './img/index'
import NewsComp from './news/index'

const { TabPane } = Tabs;

const Index = (props) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [tabIndex, setTabIndex] = useState(1)

  const Img = useRef();
  const News = useRef();

  const handleOk = (value) => {
    let targetRef = null
    let target = ''
    if(tabIndex == 1) {
      targetRef = News.current.ref
      target = 'News'
    } else if(tabIndex == 2) {
      targetRef = Img.current.ref
      target = 'Img'
    }
    targetRef.validateFields().then((val) => {
      changeSection(target, val)
    })
  }

  // 把数据更新至全局数据中
  const changeSection = (type, value) => {
    const chooseSectionTemp = lodash.cloneDeep(chooseSection)
    let style = chooseSectionTemp.data.style
    style = Object.assign(style, value)
    chooseSectionTemp.data.style = style
    setChooseSection(chooseSectionTemp)
    handleCancel()
  }

  const handleCancel = () => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  // 切换tab
  const changeTabs = (val) => {
    console.log('----changeTabs------', val)
    setTabIndex(val)
  }

  return <Modal
    title={'轮播图&新闻模块样式管理'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    width='600px'
    onOk={handleOk}
    onCancel={handleCancel}
    maskClosable={false}
  >
    <div >
      <div>
      <Tabs type="card"
        onChange={changeTabs}
      >
        <TabPane tab="新闻管理" key="1">
          <NewsComp 
            ref={News}
            data={props.data}
          />
        </TabPane>
        <TabPane tab="轮播图管理" key="2">
          <ImgComp 
            ref={Img}
            data={props.data}
          />
        </TabPane>
      </Tabs>
			</div>
    </div>
  </Modal>

}

export default Index