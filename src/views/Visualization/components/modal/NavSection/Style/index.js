import React, {useState, useEffect, useRef} from "react";
import { Modal, Button, Switch, Checkbox, Form, Input, message, InputNumber, Select, Radio, Row, Col, Collapse } from 'antd';
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index'

const { Panel } = Collapse;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const EditModal = (props) => {
  const [modalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data) {
      console.log('---props.data.data.style-------', props.data.data.style)
      form.setFieldsValue({
        ...props.data.data.style
      })
    }
  }, []);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const onFinish = values => {
    message.success('操作成功');
    const sendData = values
    console.log('--sendData----666---', sendData)
    const dataObj = lodash.cloneDeep(props.data.data)
    dataObj.style = sendData
    props.onFinish(dataObj);
  };

  return <Modal
    getContainer={false}
    title={'编辑样式'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
    maskClosable={false}
  >
    <div >
    <Form
      {...layout}
      requiredMark={false}
      initialValues={{}}
      onFinish={onFinish}
      form={form}
    >
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="背景设置" key="1">
          <BgStyleForm 
            defaultType={props.data.data.style.bg.bgType}
          />
          <Row className='pad-l-4'>
            {/* <Col span={8}>
              <Form.Item
                labelCol={{span: 8}}
                wrapperCol={{span: 10}}
                name='width' label="宽度:">
                <InputNumber />
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item
                labelCol={{span: 8}}
                wrapperCol={{span: 10}}
                name='height' label="高度:">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
        <Panel header="导航样式" key="2">
          <Form.Item
            name={['screenType']} label="显示模式:">
            <Radio.Group>
              <Radio value={1}>普通</Radio>
              <Radio value={2}>宽屏</Radio>
            </Radio.Group>
          </Form.Item>
          <Row className='pad-l-4'>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 8}}
                wrapperCol={{span: 10}}
                name='fontColor' label="字体颜色:">
                <Input type='color' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 8}}
                wrapperCol={{span: 10}}
                name='fontSize' label="字体大小:">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            valuePropName="checked"
            name={['isBold' ]} label="是否加粗:">
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item
            name={['align' ]} label="导航位置:">
            <Radio.Group>
              <Radio value={'left'}>居左</Radio>
              <Radio value={'center'}>居中</Radio>
              <Radio value={'right'}>居右</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={['navType' ]} label="导航类型:">
            <Radio.Group>
              <Radio value={'default'}>默认</Radio>
              <Radio value={'fixed'}>滚动时固定</Radio>
            </Radio.Group>
          </Form.Item>
          <Row className='pad-l-6'>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 9}}
                wrapperCol={{span: 12}}
                name={['menuMargin', 'left']} label="菜单左边距:">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 9}}
                wrapperCol={{span: 12}}
                name={['menuMargin',  'right']} label="菜单右边距:">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row className='pad-l-18'>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 9}}
                wrapperCol={{span: 12}}
                name={['selectFont', 'color' ]} label="选中字体颜色:">
                <Input type='color' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 9}}
                wrapperCol={{span: 12}}
                valuePropName="checked"
                name={['selectLine',  'show']} label="显示选中横线:">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row className='pad-l-18'>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 9}}
                wrapperCol={{span: 10}}
                name={['selectLine',  'color']} label="选中横线颜色:">
                <Input type='color' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{span: 9}}
                wrapperCol={{span: 10}}
                name={['selectLine',  'height']} label="选中横线高度:">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Form>
    </div>
  </Modal>

}

export default EditModal