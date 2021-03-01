import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, message, Radio, Select } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import { cloneDeep } from 'lodash'
import { configGet, allPageList, configSave } from '@/http/hvisualization'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const Index = (props) => {
  const { pageItem, setPageItem } = useContext(VisContext)

  const [sidebars, setSidebars] = useState([])
  const [modalVisible] = useState(true)

  const [form] = Form.useForm();

  useEffect(() => {
    getSidebars()
    if (pageItem && pageItem.props) {
      form.setFieldsValue(cloneDeep(pageItem.props))
    } else {
      form.setFieldsValue({
        sidebarStatus: '0'
      })
    }
  }, []);

  // 获取列表
  const getSidebars = async () => {
    console.log('-----pageItem-----', pageItem)
    await allPageList().then((result) => {
      if (result.error_code === 0 && result.data) {

        const temp = []
        result.data.forEach((item) => {
          if (item.type == '4') {
            temp.push(item)
          }
        })
        setSidebars(temp)
      }
    })
  }

  const handleOk = (value) => {
    // props.modalChange(false);
    form.validateFields().then((value) => {
      console.log('-----handleOk------', value)
      //   reqUrl(value).then((result) => {
      //       if(result.error_code === 0) {
      //         message.success('操作成功')
      //         props.editFinish();
      //       }
      //   })
      configGet({
        id: pageItem.id
      }).then((rep) => {
        if (rep.error_code === 0) {
          let configobj = {}
          if (rep.data) {
            if (rep.data.config_json_pre) {
              configobj = JSON.parse(rep.data.config_json_pre)

            }
          }
          configobj.props = value
          const sendData = {
            id: pageItem.id,
            config_json_pre: JSON.stringify(configobj)
          }
          // 保存json数据
          configSave(sendData).then((rep) => {
            if(rep.error_code === 0) {
              message.success('操作成功');
              setPageItem(Object.assign({}, pageItem, {
                props: value
              }))
              handleCancel()
            } else {
              message.error(rep.msg);
            }
          })
        }
      })
    })
  }

  const handleCancel = (value) => {
    if (props.modalChange) {
      props.modalChange(false);
    }
  }

  const onValuesChange = (value) => {
    console.log('-----onValuesChange-----', value)
  }

  // const onFieldsChange = () => {
  //   console.log('-----onFieldsChange-----')
  // }

  return <Modal
    title={'页面属性配置'}
    maskClosable={false}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='600px'
  >
    <div>
      <Form
        {...layout}
        requiredMark={false}
        initialValues={{}}
        onValuesChange={onValuesChange}
        form={form}
      >
        <Form.Item
          label="侧边栏"
          name='sidebarStatus'
          rules={[{ required: true, message: '请选择侧边栏位置' }]}
        >
          <Radio.Group>
            <Radio value="0">关闭</Radio>
            <Radio value="1">右侧显示</Radio>
            <Radio value="2">左侧显示</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="选择侧边栏"
          name='sidebarViewId'
          rules={[{ required: true, message: '请选择侧边栏' }]}
        >
          <Select>
            {
              sidebars && sidebars.map((sidebar) => {
                return (
                  <Select.Option
                    value={sidebar.id}
                    key={sidebar.id}
                  >{sidebar.title}</Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

      </Form>
    </div>
  </Modal>

}

export default Index