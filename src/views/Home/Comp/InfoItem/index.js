import React, {useState, useEffect, useRef} from "react";
import { Row, Col, Button, Input, Form, message, Modal} from 'antd';
import { editBasicConfig, delBasicConfig } from '@/http/hwebInfo'
import lodash from 'lodash'

const { TextArea } = Input;

const InfoItem = (props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [formInfoData, setFormInfoData] = useState({})

  const formRef = useRef();

  const el = props.data || {}

  const saveData = () => {
    formRef.current.validateFields().then(() => {
      // 保存数据
      const formInfo = formRef.current.getFieldsValue()
      const sendData = lodash.cloneDeep(el)
      sendData.content = formInfo.configVal
      editBasicConfig(sendData).then((rep) => {
        if(rep.error_code === 0) {
          setFormInfoData(Object.assign({}, formInfoData, {content: formInfo.configVal}))
          setIsEdit(false)
        }
      })
    })
  }

  const saveOrEdit = () => {
    if(!isEdit) {
      setIsEdit(true)
    } else {
      saveData(isEdit)
    }
  }

  const delItem = () => {
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
				delBasicConfig({
          id: el.id
        }).then((rep) => {
          if(rep.error_code === 0) {
            props.successCB();
            message.success('操作成功');
          }
        })
      }
    })
  }

  useEffect(() => {
    setFormInfoData(lodash.cloneDeep(el))
	}, [el.id]);

  return <Form
    ref={formRef}
    initialValues={{
      configVal: el.content
    }}
  >
    <Row gutter={16}>
      <Col className="gutter-row" span={5}>
        <div className="item">{formInfoData.title}</div>
      </Col>
      <Col className="gutter-row" span={5}>
        <div className="item">{formInfoData.Abbr}</div>
      </Col>
      <Col className="gutter-row" span={9}>
        <div className="item">
          {
            isEdit && (
              <Form.Item
                style={{'textAlign': 'left', width: '100%'}}
                label=""
                name="configVal"
                rules={[{ required: true, message: '请输入配置值' }]}
              >
                <TextArea rows={2} />
              </Form.Item>
            )
          }
          {
            !isEdit && (
              <div className="item">{formInfoData.content}</div>
            )
          }
        </div>
      </Col>
      <Col className="gutter-row" span={5}>
        <div className="item">
          <Button size='small' style={{marginRight: '4px'}} type='primary' onClick={saveOrEdit} className='button'>{isEdit?'保存':'编辑'}</Button>
          <Button size='small' onClick={delItem} className='button'>删除</Button>
        </div>
      </Col>
    </Row>
  </Form>
}

export default InfoItem