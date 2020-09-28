import React, {useState, useEffect, useContext, useImperativeHandle} from "react";
import { Modal, Switch, Form, Input, Select, message, InputNumber, Radio } from 'antd';
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Index = React.forwardRef((props, ref) => {
  const { pageData, sectionList, setSectionList } = useContext(VisContext)
  
  const [sections, setSections] = useState([])
  const [eventData, setEventData] = useState(null)
  const [eventEnabled, setEventEnabled] = useState(false)

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    ref: ref.current
  }));

  useEffect(() => {
    console.log('-----useEffect---22---', props.data)
    handleSections()
    let eventTemp = {}
    if(props.data) {
      eventTemp = lodash.cloneDeep(props.data)
      if(!eventTemp.enabled) {
        eventTemp.enabled = false
        setEventEnabled(false)
      } else {
        setEventEnabled(true)
      }
      eventTemp.sitePageId = eventTemp.sitePage?eventTemp.sitePage.id: ''
    }

    setEventData(eventTemp || {})
    form.setFieldsValue(eventTemp)
  }, []);

  const handleSections = () => {
    const list = sectionList.map((item) => {
      // Obejct.keys(item).for
      return {
        label: item.label,
        value: item.sectionId,
        type: item.type,
        name: item.data.name
      }
    })
    
    setSections(list)
  }

  const changeType = (e) => {
    console.log('----changeType--', e.target.value)
    setEventData({
      ...eventData,
      ...{type: e.target.value }
    })
  }

  // 改变交互
  const changeEnabled = (val) => {
    setEventEnabled(val)
  }

  // 校验表单
  const validateForm = (fields = null, allvalues, defaultField) => {
    if(props.onChange) {
      props.onChange(allvalues)
    }
    
    // form.getFieldsError()
    // setTimeout(() => {
    //   console.log('----form.getFieldsError()-----', form.getFieldsError())
    // }, 0);
    
    // form.validateFields(fields).then((val) => {
    //   console.log('----val---555-', val)
    //   props.onChange(allvalues, true);
    //   if(!fields && defaultField) {
    //     form.resetFields()
    //     form.setFieldsValue(defaultField)
    //   }
    // }).catch((val) => {
    //   console.log('----val---666-', val)
    //   if(val.errorFields.length) {
        
    //   }
    //   props.onChange(allvalues, false);
    //   if(!fields && defaultField) {
    //     form.resetFields()
    //     form.setFieldsValue(defaultField)
    //   }
    // })
  }

  return <div>
    {
      eventData && <div>
        <Form
          {...layout}
          requiredMark={false}
          ref={ref}
          form={form}
          onValuesChange={(changedFields, allvalues) => {
            validateForm([Object.keys(changedFields)[0]], allvalues)
          }}
        >
          <Form.Item
            valuePropName="checked"
            name="enabled" label="开启交互:">
            <Switch onChange={changeEnabled} />
          </Form.Item>
          {
            <div style={{
              display: eventEnabled?'block':'none'
            }}>
              <Form.Item
                name="type" label="交互类型:">
                <Radio.Group onChange={(e) => {changeType(e)}}>
                  <Radio value={4}>弹窗</Radio>
                  <Radio value={1}>外链</Radio>
                  <Radio value={2}>内页</Radio>
                  <Radio value={3}>锚点</Radio>
                  <Radio value={5}>视频</Radio>
                </Radio.Group>
              </Form.Item>
              {
                eventData.type == 1 && (
                  <>
                    <Form.Item
                      label="外链地址"
                      name="linkUrl"
                      // rules={[{ required: true, message: '请输入外链地址' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                        label="打开方式"
                        name="linkUrlType"
                      >
                      <Radio.Group>
                        <Radio value={1}>原窗口</Radio>
                        <Radio value={2}>新窗口</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </>
                )
              }
              {
                eventData.type == 2 && (
                <Form.Item
                  label="选择内页"
                  name="sitePageId"
                >
                  <Select>
                    {
                      pageData.map((item) => {
                        if(item.type === 'page') {
                          return (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                          )
                        }
                        return null
                      })
                    }
                  </Select>
                </Form.Item>
              )}
              {
                eventData.type == 3 && (
                <Form.Item
                  label="选择模块"
                  name="sectionId"
                >
                  <Select>
                    {
                      sections.map((item) => {
                        return (
                          <Select.Option value={item.value} key={item.value}>{item.name || item.label}</Select.Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
              )}
              {
                eventData.type == 4 && (
                <Form.Item
                  label="选择弹窗"
                  name="popupId"
                >
                  <Select>
                    {
                      pageData.map((item) => {
                        if(item.type === 'popup') {
                          return (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                          )
                        }
                        return null
                      })
                    }
                    <Select.Option value={10000} key={10000}>{'视频弹窗'}</Select.Option>
                  </Select>
                </Form.Item>
              )}
              {
                eventData.type == 5 && (
                  <>
                    <Form.Item
                      label="视频地址"
                      name="videoUrl"
                      // rules={[{ required: true, message: '请输入外链地址' }]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                )
              }

            </div>
          }
        </Form>
        </div>
    }
  </div>

})

export default Index