import React, { Component } from 'react'
import { Row, Col, Button, Input, Form} from 'antd';
import InfoItem from './Comp/InfoItem'
import { basicConfigList } from '@/http/hwebInfo'
import './home.less'

export default class index extends Component {
  state = {
    list: []
  }

  componentWillMount() {
		// this.fetch();
		basicConfigList().then((rep) => {
      if(rep.error_code === 0) {
        this.setState({
          list: rep.data
        })
      }
    })
	}
  
  render() {
    return (
      <div className="shadow-radius">
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <div className="item">名称</div>
          </Col>
          <Col className="gutter-row" span={5}>
            <div className="item">字段</div>
          </Col>
          <Col className="gutter-row" span={9}>
            <div className="item">配置值</div>
          </Col>
          <Col className="gutter-row" span={5}>
            <div className="item">操作</div>
          </Col>
        </Row>
        {
          this.state.list.map(el => {
            return (
              <div key={el.id}>
                {/* <Form
                  key={el.name}
                  onFinish={(value) => this.onFinish(value, el.value)}
                >
                  <Row gutter={16}>
                    <Col className="gutter-row" span={5}>
                      <div className="item">{el.name}</div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                      <div className="item">{el.value}</div>
                    </Col>
                    <Col className="gutter-row" span={9}>
                      <div className="item">
                      <Form.Item
                        label=""
                        name={el.value}
                      >
                        <Input />
                      </Form.Item>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                      <div className="item">
                        <Button type='primary' htmlType="submit" className='button'>保存</Button>
                      </div>
                    </Col>
                  </Row>
                </Form> */}
                <InfoItem data={el}></InfoItem>
              </div>
            )
          })
        }
      </div>
    )
  }
}
