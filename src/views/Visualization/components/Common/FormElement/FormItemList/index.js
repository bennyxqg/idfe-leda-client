import React, {useState, useEffect} from "react";
import FormWidgetsComp from '@/views/Visualization/components/Common/FormElement/FormWidgetsComp/index.js'
import '../index.scss'
import { cloneDeep } from "lodash";
import { ArrowUpOutlined, ArrowDownOutlined, 
  SettingOutlined,DeleteOutlined,
  FontSizeOutlined,LineHeightOutlined,
  AimOutlined, CloseOutlined,
  DownSquareOutlined,
  PlusOutlined, AppstoreOutlined } from '@ant-design/icons';
import { randomCode } from '@/utils/helper'

const widgetsTypeList = [
  {
    type: 'input',
    icon: <FontSizeOutlined />,
    label: '单行文本框'
  },
  {
    type: 'textarea',
    icon: <LineHeightOutlined />,
    label: '多行文本框'
  },
  {
    type: 'radio',
    icon: <AimOutlined />,
    label: '单选框'
  },
  {
    type: 'checkbox',
    icon: <AppstoreOutlined />,
    label: '多选框'
  },
  {
    type: 'select',
    icon: <DownSquareOutlined />,
    label: '下拉框'
  }
]

// 表单控件列表
const Index = (props) => {
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    console.log('-----ItemConfigModal------', props)
    if(props.data && props.data.length) {
      setItemList(cloneDeep(props.data))
    }
  }, []);

  const handleAdd = (type, index) => {
    if(type === 'down') {
      index += 1
    }
    itemList.splice(index, 0 , {
      type: 'addItem'
    })
    setItemList(cloneDeep(itemList))
  }

  // 取消控件选择
  const cancelToolbar = (index) => {
    itemList.splice(index, 1)
    setItemList(cloneDeep(itemList))
  }

  // 添加控件
  const chooseWidget = (item, index) => {
    const itemData = {}
    itemData.type = item.type
    itemData.isVerification = false
    itemData.regex = ''
    itemData.name = item.type + '_' + randomCode(10)
    itemData.placeholder = ''
    itemData.itemId = 'form-item-' + randomCode(10)
    if(item.type === 'input') {
      itemData.label = '单行文本框'
    }
    if(item.type === 'textarea') {
      itemData.label = '多行文本框'
    }
    if(item.type === 'radio') {
      itemData.label = '单选框'
      itemData.items = [
        {
          label: '选项1',
          value: 'option_1',
          checked: true
        },
        {
          label: '选项2',
          value: 'option_2',
          checked: false
        }
      ]
    }
    if(item.type === 'checkbox') {
      itemData.label = '多选框'
      itemData.items = [
        {
          label: '选项1',
          value: 'option_1',
          checked: false
        },
        {
          label: '选项2',
          value: 'option_2',
          checked: false
        }
      ]
    }
    if(item.type === 'select') {
      itemData.label = '下拉框'
      itemData.items = [
        {
          label: '选项1',
          value: 'option_1'
        },
        {
          label: '选项2',
          value: 'option_2',
        }
      ]
    }
    itemList.splice(index, 1, itemData)
    const itemListTemp = cloneDeep(itemList)
    setItemList(itemListTemp)
    if(props.onChange) {
      props.onChange(itemListTemp)
    }
  }

  return (
    <div className={props.className}>
      <ul>
        {
          itemList.map((formItem, index) => {
            return (
              <li key={index}>
              {
                formItem.type === 'addItem'? (
                  <div className='el-form-builder-toolbar-wrap'>
                    <p>请选择即将插入表单的表单项类型：</p>
                    <div>
                      <ul>
                        {
                          widgetsTypeList.map((item, i) => {
                            return (
                              <li key={i} onClick={() => {chooseWidget(item, index)}}>
                                <span className="item-type-icon">
                                  {item.icon}
                                </span>
                                <span className="item-type-label">{item.label}</span>
                              </li>
                            )
                          })
                        }
                        <li onClick={() => {cancelToolbar(index)}}>
                          <span className="item-type-icon">
                            <CloseOutlined />
                          </span>
                          <span className="item-type-label">取消</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ): (
                  <div className='el-form-item-wrap'>
                    <div className='el-form-item'>
                      <div className='el-form-item-label'>
                        <span className='text'>{formItem.label}</span>
                        <span className='must'>*</span>
                      </div>
                      <div className='el-form-item-widget'>
                        {FormWidgetsComp(formItem)}
                      </div>
                    </div>
                    
                    <div className='el-form-item-operate-btn'>

                    </div>
                    <div className='el-form-item-add-btn'>
                      <div className="el-form-item-add-btn-up"
                        onClick={() => {handleAdd('up', index)}}
                      >
                        <PlusOutlined />
                      </div>
                      <div className="el-form-item-add-btn-down"
                        onClick={() => {handleAdd('down', index)}}
                      >
                        <PlusOutlined />
                      </div>
                    </div>
                  </div>
                )
              }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Index