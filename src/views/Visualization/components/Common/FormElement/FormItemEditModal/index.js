import React, {useState, useEffect, useRef, useImperativeHandle} from "react";
import { Switch, Button, Modal, Form, Input, message, Space, Select, Radio } from 'antd';
import {cloneDeep, merge} from 'lodash'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const rules = [
  {
    label: '不校验',
    name: 'none'
  },
  {
    label: '手机号码',
    name: 'phone'
  },
  {
    label: '邮箱',
    name: 'email'
  }
]

const Index = ((props) => {
  const [modalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.data)
  }, []);

  const handleOk = (value) => {
    form.submit()
  }

  const onFinish = values => {
    message.success('操作成功');

    let sendData = merge({}, props.data, values)
    props.onFinish(sendData);
    props.modalChange(false)
  };

  // 关闭弹窗
  const handleCancel = (value) => {
    props.modalChange(false)
  }



  return <Modal
    title={'表单项配置'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='480px'
  >
    <div>
      <>
        <Form
          {...layout}
          requiredMark={false}
          initialValues={{}}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name='label'
            rules={[{ required: true, message: '标题不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="key值"
            name='name'
            rules={[{ required: true, message: 'key值不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="提示"
            name='placeholder'
          >
            <Input />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            label="是否必填"
            name='isMust'
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="数据校验"
            name='rules'
          >
            <Select>
              {
                rules.map((item) => {
                  return (
                    <Select.Option value={item.name} key={item.name}>{item.label}</Select.Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          {
            (props.data.type === 'radio' || props.data.type === 'checkbox' || props.data.type === 'select') && (
              <Form.List name="items">
                {(fields, { add, remove }) => {
                  return (
                    <div style={{ width: '88%' }}>
                      {fields.map((field, index) => (
                        <Space key={field.key} align="start" style={{ display: 'flex' }}>
                          <Form.Item
                            {...field}
                            labelCol= {{ span: 0 }}
                            wrapperCol= {{ span: 24 }}
                            name={[field.name, 'label']}
                            fieldKey={[field.fieldKey, 'label']}
                            rules={[{ required: true, message: '名称不能为空' }]}
                          >
                            <Input placeholder="名称" />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            labelCol= {{ span: 0 }}
                            wrapperCol= {{ span: 24 }}
                            name={[field.name, 'value']}
                            fieldKey={[field.fieldKey, 'value']}
                            rules={[{ required: true, message: '表单值不能为空' }]}
                          >
                            <Input placeholder="表单值" />
                          </Form.Item>
                          <Form.Item
                            style={{
                              width: '80px'
                            }}
                            labelCol= {{ span: 12 }}
                            wrapperCol= {{ span: 12 }}
                            valuePropName="checked"
                            label="选中"
                            name={[field.name, 'checked']}
                            fieldKey={[field.fieldKey, 'checked']}
                          >
                            <Switch />
                          </Form.Item>
                          <div>
                            {
                              fields.length > 1 && (
                                <CloseOutlined
                                  style={{position: 'relative', top: '6px', fontWeight: 'bold'}}
                                  onClick={() => {
                                    remove(field.name);
                                  }}
                                />
                              )
                            }
                          </div>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={() => {
                            add();
                          }}>
                          <PlusOutlined /> 新增
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
            )
          }
          
        </Form>
      </>
    </div>
  </Modal>
})

export default Index
