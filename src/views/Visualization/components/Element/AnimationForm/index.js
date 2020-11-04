import React, {useState, useEffect} from "react";
import { Modal, Form, Input, message, Select, Switch, Radio } from 'antd';
import {cloneDeep, merge} from 'lodash'
import { animationData } from '@/views/Visualization/data/utils';
import { animationElementList } from "@/views/Visualization/utils/cacheData";
import { initAnimate } from '@/views/Visualization/utils/animation'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = (props) => {
  const [modalVisible] = useState(true)
  const [animationType, setAnimationType] = useState('')

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      let dataTemp = {}
      if(props.data.data.animation) {
        dataTemp = cloneDeep(props.data.data.animation)
        setAnimationType(dataTemp.type)
      } else {
        dataTemp = animationData()
      }

      form.setFieldsValue(dataTemp)
    }
  }, []);

  const handleOk = () => {
    form.validateFields().then((value) => {
      message.success('操作成功');
      let elementItemTemp = cloneDeep(props.data)
      let sendData = {}
      sendData = merge(elementItemTemp.data, animationData(), {
        animation: value
      })
      // 把元素从已执行动画数组中清除
      if(animationElementList && animationElementList.length) {
        if(animationElementList.indexOf(elementItemTemp.elementId) !== -1) {
          animationElementList.splice(animationElementList.indexOf(elementItemTemp.elementId), 1)
        }
        // 执行元素动画
        setTimeout(() => {
          initAnimate()
        }, 500)
      }
      
      props.onFinish(sendData)
      
    })
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }
 
  // 改变动画类型
  const changeType = (type) => {
    setAnimationType(type)
  }

  return <Modal
    title={'配置动画'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
    maskClosable={false}
  >
    <div className="vis-element-animation-form"> 
    <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        form={form}
      >
        <Form.Item
          label="动画类型"
          name='type'
        >
          <Select onChange={(type) => {changeType(type)}}>
            <Select.Option value={'none'} >无</Select.Option>
            <Select.Option value={'fadeIn'} >淡入</Select.Option>
            <Select.Option value={'scale'} >缩放</Select.Option>
            <Select.Option value={'slide'} >滑动</Select.Option>
            <Select.Option value={'shake'} >摇晃</Select.Option>
            <Select.Option value={'bounce'} >跳动</Select.Option>
            <Select.Option value={'flash'} >闪烁</Select.Option>
            <Select.Option value={'rotate'} >旋转</Select.Option>
          </Select>
        </Form.Item>
        { 
          animationType !== 'none' && (
            <>
              <Form.Item
                label="持续"
                name='duration'
              >
                <Input addonAfter="秒" />
              </Form.Item>
              <Form.Item
                label="延迟"
                name='delay'
              >
                <Input addonAfter="秒" />
              </Form.Item>
            </>
          )
        }
        {
          (animationType === 'shake' || 
          animationType === 'bounce' || 
          animationType === 'flash'  || 
          animationType === 'rotate'  || 
          animationType === 'shake') &&   
          (
            <>
              <Form.Item
                valuePropName="checked"
                label="循环"
                name='loop'
                extra="* 循环选项仅在保存后的预览模式下生效"
              >
                <Switch  />
              </Form.Item>
            </>
          )
        }
        {
          animationType === 'slide' && (
            <Form.Item
              label="切入"
              name='direction'
            >
              <Radio.Group >
                <Radio value={'top'}>上</Radio>
                <Radio value={'bottom'}>下</Radio>
                <Radio value={'left'}>左</Radio>
                <Radio value={'right'}>右</Radio>
              </Radio.Group>
            </Form.Item>
          )
        }
        
      </Form>
    </div>
  </Modal>

}

export default Index