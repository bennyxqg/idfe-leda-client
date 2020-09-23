import React, {useState, useEffect, useRef, useContext, useImperativeHandle} from "react";
import { Modal, Switch, Row, Col, Space, Button, Form, Input, message, Select, Collapse, Radio, Slider } from 'antd';
import { addPic, editPic } from '@/http/hcarousel'
import ImgUpload from '@/components/ImgUpload'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import update from 'immutability-helper';
import SwiperStyleForm from '@/views/Visualization/components/Common/SwiperStyleForm/index'


const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;


const Index = React.forwardRef((props, ref) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [bgType, setBgType] = useState('')
  const [styleData, setStyleData] = useState(null)
  
  const [form] = Form.useForm();
  // const swiperFormRef = useRef();

  useImperativeHandle(ref, () => ({
    ref: ref.current,
    dataToParent: dataToParent
  }));

  useEffect(() => {
    if(props.data && props.data.data) {

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
          <Collapse defaultActiveKey={['1']}>
            <Panel header="模块样式" key="1">
              <div>
                <SwiperStyleForm 
                  ref={ref}
                  data={props.data.data.style.swiper}
                />
              </div>
            </Panel>
          </Collapse>
        </div>
      }
    </div>
})

export default Index