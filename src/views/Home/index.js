import React, { Component } from 'react'
import { Row, Col, Button, Input, Form} from 'antd';
import InfoItem from './Comp/InfoItem'
import AddModal from './Comp/AddModal'
import { basicConfigList } from '@/http/hwebInfo'
import GlobalContext from "@/views/layout/GlobalContext";
import './home.less'

export default class index extends Component {
  static contextType = GlobalContext;
  state = {
    list: [],
    addModalVisible: false
  }

  componentWillMount() {
    // this.fetch();
    console.log('---this.context--', this.context)
    // setTimeout(() => {
    //   this.context.setUserInfo('test name')
    // }, 5000)
    this.getListData()
  }

  getListData = () => {
    basicConfigList().then((rep) => {
      if(rep.error_code === 0) {
        this.setState({
          list: rep.data
        })
      }
    })
  }
  
  handleAdd = () => {
    this.setState({addModalVisible: true})
  }

  addModalChange = (val) => {
		this.setState({addModalVisible: val})
  }
  
  addSuccess = () => {
    this.getListData()
  }
  
  render() {
    return (
      <div className="shadow-radius">
        <div style={{marginBottom: '10px', textAlign: 'right'}}>
          <Button type="primary" onClick={this.handleAdd}>
              新增
          </Button>
        </div>
        <Row gutter={16} style={{backgroundColor: '#F6F6FA'}}>
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
                <InfoItem data={el}
                  successCB = {this.addSuccess}
                ></InfoItem>
              </div>
            )
          })
        }
        {
					this.state.addModalVisible && (
						<AddModal
              modalChange={this.addModalChange}
              successCB={this.addSuccess}
						/>
					)
				}
      </div>
    )
  }
}
