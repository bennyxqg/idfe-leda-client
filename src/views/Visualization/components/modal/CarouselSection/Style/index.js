import React, {useState, useEffect, useRef} from "react";
import { Modal, Collapse, Form, Select, message, InputNumber, Row, Col } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import {cloneDeep} from 'lodash'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index_whole'
import SwiperStyleForm from '@/views/Visualization/components/Common/SwiperStyleForm/index'
import {formPromise} from '@/utils/helper'

const { Option } = Select;
const { Panel } = Collapse;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const subLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const EditModal = (props) => {
  const [modalVisible] = useState(true)

  const bgFormRef = useRef();
  const swiperFormRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {

      form.setFieldsValue({
        ...props.data.data.style
      })
    }
  }, []);

  const handleOk = async (value) => {
    const commonVal = await formPromise(form)
    const bgVal = await formPromise(bgFormRef.current.ref)
    const swiperVal = await formPromise(swiperFormRef.current.ref)
    if(commonVal && bgVal && swiperVal) {
      message.success('操作成功');
      const dataObj = cloneDeep(props.data.data)
      Object.assign(dataObj.style, commonVal)
      Object.assign(dataObj.style.bg, bgVal)
      Object.assign(dataObj.style.swiper, swiperVal.swiper)
      console.log('-----swiperVal--dataObj---', dataObj)
      props.onFinish(dataObj);
    }
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  // const onFinish = values => {
  //   message.success('操作成功');
  //   const sendData = values
  //   const dataObj = cloneDeep(props.data.data)
  //   dataObj.style = sendData
  //   props.onFinish(dataObj);
  // };

  return <Modal
    maskClosable={false}
    getContainer={false}
    title={'编辑样式'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='680px'
  >
    <div >
    <Collapse defaultActiveKey={['1', '2', '3']} >
    <Panel header="基础配置" key="1">
    <Form
      {...layout}
      requiredMark={false}
      form={form}
    >
      {/* <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '请输入轮播类型' }]}
      >
        <Select>
          <Option value={1}>普通</Option>
          <Option value={2}>卡片</Option>
        </Select>
      </Form.Item> */}
      <Row className='pad-l-4'>
        <Col span={12}>
          <Form.Item
            {...subLayout}
            label="上内边距"
          >
            <Form.Item
              noStyle
              name="paddingTop"
              rules={[{ required: true, message: '请输入上内边距' }]}
            >
              <InputNumber />
            </Form.Item>
            {/* <span className='mar-l-4'>px</span> */}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...subLayout}
            label="下内边距"
          >
            <Form.Item
              noStyle
              name="paddingBottom"
              rules={[{ required: true, message: '请输入下内边距' }]}
            >
              <InputNumber />
            </Form.Item>
            {/* <span className='mar-l-4'>px</span> */}
          </Form.Item>
        </Col>
      </Row>
      <Row className='pad-l-4'>
        {/* <Col span={12}>
          <Form.Item
            {...subLayout}
            label="容器宽度"
            name="width"
          >
            <InputNumber />
          </Form.Item>
        </Col> */}
        {/* <Col span={12}>
          <Form.Item
            {...subLayout}
            label="容器高度"
            name="height"
          >
            <InputNumber />
          </Form.Item>
        </Col> */}
      </Row>
      <Row className='pad-l-4'>
        <Col span={12}>
          <Form.Item
            {...subLayout}
            label="图片宽度"
            name={["img", "width"]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...subLayout}
            label="图片高度"
            name={["img", "height"]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </Panel>
    <Panel header="背景配置" key="2">
    <BgStyleForm 
      ref={bgFormRef}
      data={props.data.data.style.bg}
    />
    </Panel>
    <Panel header="轮播参数配置" key="3">
    <SwiperStyleForm 
      ref={swiperFormRef}
      data={props.data.data.style.swiper}
    />
    </Panel>
    </Collapse>
    </div>
  </Modal>
}

export default EditModal