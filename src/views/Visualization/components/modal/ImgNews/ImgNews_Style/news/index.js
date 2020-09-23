import React, {useState, useEffect, useRef, useContext, useImperativeHandle} from "react";
import { Modal, Checkbox, Row, Col, Space, Button, Form, Input, message, Select, Collapse, Radio, Slider } from 'antd';
import { addPic, editPic } from '@/http/hcarousel'
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import update from 'immutability-helper';
import BgStyleForm from '@/views/Visualization/components/Common/BgStyleForm/index_whole'


const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const radioStyle = {
  display: 'block',
  height: '36px',
  lineHeight: '36px',
};


const Index = React.forwardRef((props, ref) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [styleData, setStyleData] = useState(null)

  const bgFormRef = useRef();
  useImperativeHandle(ref, () => ({
    ref: ref.current,
    dataToParent: dataToParent,
    bgFormRef: bgFormRef
  }));
  
  // const bgFormRef = useRef();
  const formRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if(props.data && props.data.data) {
      setStyleData(lodash.cloneDeep(props.data.data.style))
      form.setFieldsValue(lodash.cloneDeep(props.data.data.style))
    }
  }, []);


  // 透传至父组件的数据
  const dataToParent = () => {
    return []
  }

  const onFinish = values => {
    const sendData = values
    console.log('------onFinish------', sendData)
    // setChooseSection(update(chooseSection, {$merge:{
    //   data: {
    //     style: sendData
    //   }
    // }}))
    const chooseSectionTemp = lodash.cloneDeep(chooseSection)
    chooseSectionTemp.data.style = sendData
    setChooseSection(chooseSectionTemp)
    console.log('------onFinish--2----', chooseSectionTemp)
    props.modalChange(false);

  };

  return <div className='widgets-modal-wrapper'>
      {
        styleData && (
          <div className='widgets-modal-inner imgnews-style-modal'>
              <Collapse defaultActiveKey={['1', '2']}>
                <Panel header="背景设置" key="1">
                  <div>
                    <BgStyleForm 
                      ref={bgFormRef}
                      data={props.data.data.style.news.bg}
                    />
                  </div>
                </Panel>
                <Panel header="列表样式" key="2">
                  <div>
                    <p className='form-title'>导航样式</p>
                    <Form name="nest-messages" 
                      initialValues={{}}
                      ref={ref}
                      form={form} onFinish={onFinish} >
                    <Row>
                      <Col span={8}>
                        <span>字体颜色：</span>
                        <Form.Item className='form-item-inline' name={['news', 'nav', 'fontColor']} label="">
                          <Input type='color'/>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <Col span={10}>
                            <span>字体大小：</span>
                          </Col>
                          <Col span={14}>
                            <Form.Item className='form-item-inline width-p100' name={['news', 'nav', 'fontSize']} label="">
                              <Slider
                                marks={{12: '12', 26: '26'}}
                                tooltipVisible
                                min={12}
                                max={26}
                                step={0.5}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <span>是否加粗：</span>
                        <Form.Item className='form-item-inline' name={['news', 'nav', 'isBold']} label="" valuePropName="checked">
                          <Checkbox ></Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <p className='form-title' style={{'marginTop': '20px'}}>列表样式</p>
                    <Row>
                      <Col span={8}>
                        <span>字体颜色：</span>
                        <Form.Item className='form-item-inline' name={['news', 'list', 'fontColor']} label="" >
                          <Input type='color' />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <Col span={10}>
                            <span>字体大小：</span>
                          </Col>
                          <Col span={14}>
                            <Form.Item className='form-item-inline width-p100' name={['news', 'list', 'fontSize']} label="" >
                              <Slider
                                tooltipVisible
                                marks={{12: '12', 26: '26'}}
                                min={12}
                                max={26}
                                step={0.5}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <span>是否加粗：</span>
                        <Form.Item className='form-item-inline' name={['news', 'list', 'isBold']} label="" valuePropName="checked">
                          <Checkbox checked={styleData.news.list.isBold}></Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Row>
                          <Col span={10}>
                            <span>字符间距：</span>
                          </Col>
                          <Col span={14}>
                            <Form.Item className='form-item-inline width-p100' name={['news', 'list', 'letterSpacing']} label="" >
                              <Slider
                                tooltipVisible
                                marks={{0: '0', 100: '100'}}
                                min={0}
                                max={100}
                                step={1}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8}>
                        <Row>
                          <Col span={6}>
                            <span>行高：</span>
                          </Col>
                          <Col span={18}>
                            <Form.Item className='form-item-inline width-p100' name={['news', 'list', 'lineHeight']} label="" >
                              <Slider
                                tooltipVisible
                                marks={{0: '0', 100: '100'}}
                                min={0}
                                max={100}
                                step={1}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    </Form>
                  </div>
                </Panel>
              </Collapse>
          </div>
        )
      }
      
    </div>
})

export default Index