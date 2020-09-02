import React, {useState, useEffect, useRef, useContext, useImperativeHandle} from "react";
import { Modal, Switch, Row, Col, Space, Button, Form, Input, message, Select, Collapse, Radio, Slider } from 'antd';
import { addPic, editPic } from '@/http/hcarousel'
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/VisContext";
import update from 'immutability-helper';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;


const Index = React.forwardRef((props, ref) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [bgType, setBgType] = useState('')
  const [styleData, setStyleData] = useState(null)
  
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    ref: ref.current,
    dataToParent: dataToParent
  }));

  useEffect(() => {
    if(props.data && props.data.data) {
      const carouselStyle = lodash.cloneDeep(props.data.data.style.carousel)
      
      form.setFieldsValue({
        carousel: carouselStyle
      })
    }
    console.log('---props.section----22233----', props.data)
  }, []);

  // 透传至父组件的数据
  const dataToParent = () => {
    return []
  }

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const onFinish = () => {

  }

  return <div  className='widgets-modal-wrapper'>
      {
        <div className='widgets-modal-inner imgnews-style-modal'>
          <Form name="nest-messages" 
            initialValues={{}}
            hideRequiredMark={true}
            ref={ref}
            form={form} onFinish={onFinish} >
            <Collapse defaultActiveKey={['1']}>
              <Panel header="板块样式" key="1">
                <div>
                  <Form.Item
                    label="导航轮播样式"
                    name={['carousel', 'nav', 'type']}
                    rules={[{ required: true, message: '请选择导航轮播样式' }]}
                  >
                    <Select>
                      <Option value="1">横线</Option>
                      <Option value="2">点</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="导航激活颜色"
                    name={['carousel', 'nav', 'color']}
                    rules={[{ required: true, message: '请选择导航激活颜色' }]}
                  >
                    <Input type='color'/>
                  </Form.Item>
                  <Form.Item
                    label="轮播时间间隔（毫秒）"
                    name={['carousel', 'delay']}
                    rules={[{ required: true, message: '请输入轮播时间间隔' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="是否自动轮播"
                    name={['carousel', 'autoPlay']}
                    valuePropName="checked"
                    rules={[{ required: true, message: '请选择是否自动轮播' }]}
                  >
                    <Switch />
                  </Form.Item>
                </div>
              </Panel>
            </Collapse>
          </Form>
        </div>
      }
    </div>
})

export default Index