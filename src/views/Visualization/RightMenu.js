import React, {useContext} from 'react';
import { Button, Form, Input, message } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import ImgUpload from '@/components/ImgUpload'
const { TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const Index = (props) => {
	const { chooseSection } = useContext(VisContext)

	const [form] = Form.useForm();

	const handleOk = (value) => {
    // props.modalChange(false);
    form.submit()
  }


  const onFinish = values => {
		const sendData = values
		console.log('------------onFinish------------', sendData)
		props.onFinish(sendData);
    // let reqFunc = addVideo
    // if(props.editForm) {
    //   reqFunc = editVideo
    //   sendData.id = props.editForm.id
    // }
    // reqFunc(sendData).then((rep) => {
    //   if(rep.error_code === 0) {
    //     message.success('操作成功');
    //     props.successCB();
    //   } else {
    //     message.error('操作失败');
    //   }
    // })
  };

	return (
		<div className="vis-wrap-rightMenu">
			{
				chooseSection && (
					<div className="vis-rightMenu-inner">
						<p>right--{chooseSection && chooseSection.type}</p>
						<div>
							<Form
								{...layout}
								name="basic"
								initialValues={{}}
								onFinish={onFinish}
								form={form}
							>
								<Form.Item
									label="视频标题"
									name="name"
								>
									<Input />
								</Form.Item>
								<Form.Item
									label="视频链接"
									name="url"
								>
									<Input />
								</Form.Item>
								<Form.Item
										label="上传视频截图"
										name="cover"
									>
										<ImgUpload />
									</Form.Item>
								<Form.Item
									label="描述"
									name="desc"
								>
									<TextArea rows={4} />
								</Form.Item>
							</Form>
							<div>
								<Button type="primary" onClick={() => handleOk()}>
									确定
								</Button>
							</div>
						</div>
					</div>
				)
			}
			
		</div>
	)
}

export default Index