import React, {useState, useEffect, useRef, useContext} from "react";
import { Modal, Table, Button, Form, Input, message, Popconfirm } from 'antd';
import { groupPage, delGroup, addGroup, editGroup } from '@/http/hcarousel'
import VisContext from "@/views/Visualization/VisContext";
import lodash from 'lodash'
import { getAllCarouselByGroup } from '@/utils/data'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入${title}`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



const EditModal = (props) => {
  const { allPic, setAllPic } = useContext(VisContext)

  const [modalVisible, setModalVisible] = useState(true)
  const [tableData, setTableData] = useState([])
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.id === editingKey;

  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const sendData = row
      sendData.id = editingKey
      saveData(sendData)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const saveData = (sendData) => {
    sendData.status = 1
    let reqFunc = addGroup
    if(sendData.id) {
      reqFunc = editGroup
    }
    return reqFunc(sendData).then(async (rep) => {
      if(rep.error_code === 0) {
        message.success('操作成功');
        setEditingKey('')
        const imgList = await getAllCarouselByGroup()
        setAllPic(imgList)
      } else {
        message.error('操作失败');
      }
    })
  }


  const cancelEdit = () => {
    setEditingKey('');
  };

  const columns = [
    {
      title: '分组名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '分组标识',
      dataIndex: 'identifer',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 120,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <span
              onClick={() => save(record.id)}
              className='mar-r-8'
            >
              保存
            </span>
            <Popconfirm title="Sure to cancel?" onConfirm={cancelEdit}>
              <span>取消</span>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <span disabled={editingKey !== ''} 
              className='mar-r-8'
              onClick={() => edit(record)}>
              编辑
            </span>
            <span disabled={editingKey !== ''} onClick={() => handleDel(record)}>
              删除
            </span>
          </div>
        );
      },
    },
  ]

  useEffect(() => {
    if(allPic && allPic.length) {
      setTableData(lodash.cloneDeep(allPic))
    }
  }, [allPic]);

  const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }

  const handleCancel = (value) => {
    props.modalChange(false);
  }

  const handleDel = (row) => {
		Modal.confirm({
      content: '确认删除吗？',
      onOk: () => {
				const sendData = {
					id: row.id
				}
        delGroup(sendData).then(async (rep) => {
					if(rep.error_code === 0) {
						message.success('操作成功');
            const imgList = await getAllCarouselByGroup()
            setAllPic(imgList)
					} else {
						message.error(rep.msg);
					}
				})
      }
    })
	};

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onAddFinish = async values => {
    await saveData(values)
    addForm.resetFields()
  };

  return <Modal
    title={'分组管理'}
    visible={modalVisible}
    footer={null}
    onCancel={handleCancel}
    width='600px'
  >
    <div >
      <div className="mar-b-8">
        <Form form={addForm} layout="inline" onFinish={onAddFinish} >
          <Form.Item
            name="name"
            rules={[{ required: true, message: '请输入名称!' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item
            name="identifer"
            rules={[{ required: true, message: '请输入标识!' }]}
          >
            <Input
              placeholder="请输入标识"
            />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !addForm.isFieldsTouched(true) ||
                  addForm.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                添加
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={mergedColumns}
          dataSource={tableData} rowKey="id" bordered="true" pagination={false} />
      </Form>
    </div>
  </Modal>

}

export default EditModal