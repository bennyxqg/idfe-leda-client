import React, {useState, useEffect, useRef, useCallback, useContext} from "react";
import { Modal, Button, Form, Input, message, InputNumber, Space, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DndProvider, useDrag, useDrop, createDndContext, DragSource } from 'react-dnd';
import ImgUpload from '@/components/ImgUpload'
import update from 'immutability-helper';
import { randomCode, addOrEditForListItem, getItemByKey } from '@/utils/helper'
import { cloneDeep } from 'lodash'
import VisContext from "@/views/Visualization/context/VisContext";
import RNDContext from '@/views/Visualization/context/RNDContext'
import { UnorderedListOutlined } from '@ant-design/icons';
import EditModal from './EditModal'

const type = 'DragableTableRow';

// 拖拽手柄
const DragHandle = ((props) => {
  const ref = React.useRef();
  const [, drag] = useDrag({
    item: { type, index: props.index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref)
  return (
    <div ref={ref}>
      <UnorderedListOutlined style={{ cursor: 'move', color: '#999' }} />
    </div>
  )
});

// 拖拽行
const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // drop(drag(ref));
  drop(ref);
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ ...style }}
      {...restProps}
    />
  );
};

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const Index = (props) => {
  const { pageData, sectionList, setSectionList } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [bindModalVisible, setBindModalVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [editForm, setEditForm] = useState(null)

  const [form] = Form.useForm();

  const columns = [
    {
      title: '排序',
      width: 58,
      render: (text, record, index) => <DragHandle index={index}/>
    },
    {
      title: '导航名称',
      dataIndex: 'label',
      width: 120
    },
    {
      title: '导航类型',
      width: 120,
      render: (text, record, index) => {
        let str = ''
        if(record.event.type == 1) {
          str = '外链'
        } else if(record.event.type == 2){
          str = '内页'
        } else if(record.event.type == 3){
          str = '锚点'
        } else if(record.event.type == 4){
          str = '弹窗'
        }
        return (
          <div>
            {str}
          </div>
        )
      }
    },
    {
      title: '导航地址',
      width: 250,
      textWrap: 'word-break',
      ellipsis: true,
      render: (text, record, index) => {
        let str = ''
        if(record.event.type == 1) {
          str = record.event.linkUrl
        } else if(record.event.type == 2){
          str = record.event.sitePage?record.event.sitePage.name: ''
        } else if(record.event.type == 3){
          str = record.event.sectionId + `（${getSectionItem(record.sectionId).label}）`
        } else if(record.event.type == 4){ // 弹窗
          const pageItem = getItemByKey(pageData, 'id', record.event.popupId)
          if(pageItem) {
            str = pageItem.name
          }
        }
        return (
          <div>
            {str}
          </div>
        )
      }
    },
    // {
    //   title: '锚点模块',
    //   dataIndex: 'url',
    //   width: 120,
    //   render: (text, record, index) => (
    //     <div>
    //       {
    //         getSectionItem(record.sectionId).label
    //       }
    //     </div>
    //   )
    // },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 160,
      render: (text, record, index) => (
        <div>
            <Button className='mar-r-2' size="small" onClick={() => { handleEdit('edit', record) }} type="primary">编辑</Button>
            <Button size="small" onClick={() => { handleDel(record, index) }} danger type="primary">删除</Button>
        </div>
      )
    },
  ]

  useEffect(() => {
    if(props.data && props.data.data) {
      const navList = cloneDeep(props.data.data.navList)
      navList.forEach(item => {
        item.Uid = randomCode(10)
        item = Object.assign(item, item.event)
      });
      setTableData(navList)
      // navImg
      form.setFieldsValue({
        navImg: props.data.data.navImg,
        name: props.data.data.name,
      })
    }
  }, []);

  const getSectionItem = (id) => {
    let item = {}
    if(id) {
      item = getItemByKey(sectionList, 'sectionId', id)
      if(!item) {
        item = {
          label: '模块不存在'
        }
      } else {
        if(item.data.name) {
          item = {
            label: item.data.name
          }
        }
      }

    }
    return item
  }

   	// 编辑弹窗
	const handleEditModal = (editForm = null) => {
    if(editForm) {
      console.log('-----editForm---555---', editForm)
      setEditForm(editForm)
    } else {
      setEditForm(null)
    }
    setEditModalVisible(true)
	}

  const handleEdit = (type, row) => {
    handleEditModal(row)
  }

  const handleDel = (row, index) => {
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
        const tableDataTemp = cloneDeep(tableData)
        tableDataTemp.splice(index, 1)
        setTableData(tableDataTemp)
      }
    })
  }

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    if(props.modalChange) {
      props.modalChange(false);
    }
  }

  const	successCB = (item) => {
    // 改变数据
    let tableDataTemp = cloneDeep(tableData)

    let itemTemp = cloneDeep(item)
    
    tableDataTemp = addOrEditForListItem(tableDataTemp, itemTemp, 'Uid')
    setTableData(tableDataTemp)
    setEditModalVisible(false)
  }

  const onFinish = values => {
    message.success('操作成功');
    const sendData = values
    const dataObj = cloneDeep(props.data.data)
    dataObj.navImg = sendData.navImg
    dataObj.name = sendData.name || ''
    dataObj.navList = tableData
    // dataObj.style = sendData
    props.onFinish(dataObj);
  };

  // 关闭打开栏目弹窗
  const	modalChange = (val) => {
    setEditModalVisible(val)
  }
  
  // 新增菜单
  const addMenu = () => {
    handleEditModal()
  }

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = tableData[dragIndex];
      setTableData(
        update(tableData, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [tableData],
  );

  const manager = useRef(RNDContext);

  return <Modal
    getContainer={false}
    title={'编辑数据'}
    visible={modalVisible}
    cancelText='取消'
    okText='确定'
    onOk={handleOk}
    onCancel={handleCancel}
    width='1000px'
    maskClosable={false}
  >
    <div >
    <Form
      {...layout}
      requiredMark={false}
      initialValues={{}}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
          label="模块名称"
          name="name"
        >
          <Input style={{width: '200px'}} />
      </Form.Item>
      <Form.Item
          label="网站标识"
          name="navImg"
        >
          <ImgUpload></ImgUpload>
      </Form.Item>
      <Form.Item
        label="导航菜单"
      >
        <div>
          
          <DndProvider manager={manager.current.dragDropManager}>
            <Table
              columns={columns} dataSource={tableData} rowKey="Uid" 
              rowClassName='common-drop-row'
              components={components}
              bordered="true" pagination={false} 
              onRow={(record, index) => ({
                index,
                moveRow,
              })}
              />
          </DndProvider>
          <div className='mar-t-8' style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <Button type="dashed" block onClick={addMenu}>
              + 添加导航
            </Button>
          </div>    
        </div>
      </Form.Item>
      
    </Form>
    {
      editModalVisible && (
        <EditModal
          editForm={editForm}
          modalChange={modalChange}
          successCB={successCB}
        ></EditModal>
      )
    }
    </div>
  </Modal>

}

export default Index