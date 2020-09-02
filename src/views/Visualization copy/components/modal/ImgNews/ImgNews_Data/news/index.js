import React, {useState, useEffect, useRef, useContext, useImperativeHandle, useCallback} from "react";
import { Modal, Button, Form, Input, message, Select, Table, Switch } from 'antd';
import { DndProvider, useDrag, useDrop, createDndContext, DragSource } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { addPic, editPic } from '@/http/hcarousel'
import ImgUpload from '@/components/ImgUpload'
import EditModal from './EditModal'
import BindModal from './bindModal'
import { randomCode, getItemIndexByKey } from '@/utils/helper'
import lodash from 'lodash'
import VisContext from "@/views/Visualization/VisContext";
import RNDContext from '@/views/Visualization/RNDContext'
import { UnorderedListOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

const type = 'DragableBodyRow';

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


const Index = React.forwardRef((props, ref) => {
  const { chooseSection, setChooseSection } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [bindModalVisible, setBindModalVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [editForm, setEditForm] = useState(null)

  useImperativeHandle(ref, () => ({
    ref: ref.current,
    dataToParent: dataToParent
  }));

  const columns = [
    {
      title: '排序',
      render: (text, record, index) => <DragHandle index={index}/>
    },
    {
      title: '名称',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record, index) => (
        <div>
            <Switch checked={record.state == 1} onChange={(val) => {changeState(val, record, index)}} />
        </div>
      )
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 270,
      render: (text, record, index) => (
        <div className="btns">
            <Button size="small" onClick={() => { handleBind(record, index) }} type="primary">绑定</Button>
            <Button size="small" onClick={() => { handleEdit('edit', record) }} type="primary">编辑</Button>
            <Button size="small" onClick={() => { handleDel(record, index) }} danger type="primary">删除</Button>
        </div>
      )
    },
  ]
  
  useEffect(() => {
    if(props.data && props.data.data) {
      const groups = lodash.cloneDeep(props.data.data.newsList.groups)
      groups.forEach(item => {
        item.Uid = randomCode(10)
      });
      setTableData(groups)
    }
  }, []);

  // 透传至父组件的数据
  const dataToParent = () => {
    return tableData
  }

  // 改变状态
  const changeState = (val, row, index) => {
    const tableDataTemp = lodash.cloneDeep(tableData)
    tableDataTemp[index].state = val?1:0
    setTableData(tableDataTemp)
  }

  // 绑定
  const handleBind = (row, index) => {
    setEditForm(row)
    setBindModalVisible(true)
  }

  const handleEdit = (type, row) => {
    handleEditModal(row)
  }

  const handleDel = (row, index) => {
    Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
        const tableDataTemp = lodash.cloneDeep(tableData)
        tableDataTemp.splice(index, 1)
        setTableData(tableDataTemp)
      }
    })
  }

  	// 编辑弹窗
	const handleEditModal = (editForm = null) => {
    if(editForm) {
      setEditForm(editForm)
    } else {
      setEditForm(null)
    }
    setEditModalVisible(true)
	}

  // 关闭打开栏目弹窗
  const	modalChange = (val) => {
    setEditModalVisible(val)
	}

	const	successCB = (item) => {
    // 改变数据
    const tableDataTemp = lodash.cloneDeep(tableData)
    
    let itemTemp = lodash.cloneDeep(item)
    if(item.Uid) {
      const index = getItemIndexByKey(tableDataTemp, 'Uid', item.Uid)
      itemTemp = Object.assign(tableDataTemp[index], itemTemp)
      tableDataTemp.splice(index, 1)
      tableDataTemp.splice(index, 0, itemTemp)
    } else { // 加入新的数据
      itemTemp.Uid = randomCode(10)
      tableDataTemp.push(itemTemp)
    }
    setTableData(tableDataTemp)
    setEditModalVisible(false)
  }
  

  const BindModalChange = (val) => {
    setBindModalVisible(val)
  }

  // 绑定新闻
  const	BindModalSuccessCB = (item) => {
    
    // 改变数据
    const tableDataTemp = lodash.cloneDeep(tableData)
    let itemTemp = lodash.cloneDeep(item)
    const index = getItemIndexByKey(tableDataTemp, 'Uid', item.Uid)
    tableDataTemp[index].list = itemTemp.list
    setTableData(tableDataTemp)

    setBindModalVisible(false)
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

  return <div ref={ref}>
      <div>
        <div style={{textAlign: 'right', 'marginBottom': '10px'}}>
          <Button type="primary" className={'btn'} onClick={() => handleEditModal()}>
          新增栏目
          </Button>
        </div>
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
				{
					editModalVisible && (
						<EditModal
              editForm={editForm}
							modalChange={modalChange}
							successCB={successCB}
						></EditModal>
					)
				}
        {
          (
            bindModalVisible && 
            <BindModal 
              editForm={editForm}
              modalChange={BindModalChange}
							successCB={BindModalSuccessCB}
            />
          )
        }
			</div>
    </div>
})

export default Index