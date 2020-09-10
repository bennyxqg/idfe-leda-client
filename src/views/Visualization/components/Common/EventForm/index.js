import React, {useState, useEffect, useRef, useCallback, useContext, useImperativeHandle} from "react";
import { Modal, Button, Form, Input, Select, message, InputNumber, Radio, Table } from 'antd';
import lodash from 'lodash'
import VisContext from "@/views/Visualization/VisContext";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const Index = React.forwardRef((props, ref) => {
  const { sectionList, setSectionList } = useContext(VisContext)
  
  const [sections, setSections] = useState([])
  const [eventData, setEventData] = useState(null)

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    ref: ref.current
  }));

  useEffect(() => {
    handleSections()
    let eventTemp = {}
    if(props.data) {
      eventTemp = lodash.cloneDeep(props.data)
      console.log('----eventTemp-----', eventTemp)
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
        type: item.type
      }
    })
    console.log('-----handleSections------', list)
    setSections(list)
  }

  const changeType = (e) => {
    console.log('----changeType--', e.target.value)
    setEventData({
      ...eventData,
      ...{type: e.target.value }
    })
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
            console.log('---changedFields------', allvalues)
            validateForm([Object.keys(changedFields)[0]], allvalues)
          }}
        >
          <Form.Item
            name="type" label="交互类型:">
            <Radio.Group onChange={(e) => {changeType(e)}}>
              <Radio value={4}>弹窗</Radio>
              <Radio value={1}>外链</Radio>
              <Radio value={2}>内页</Radio>
              <Radio value={3}>锚点</Radio>
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
              <Input />
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
                      <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
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
              <Input />
            </Form.Item>
          )}
        </Form>
        </div>
    }
  </div>

})

export default Index