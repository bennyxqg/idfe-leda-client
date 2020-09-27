import React, {useState, useEffect, useContext, memo} from "react";
import { Button, message, Row, Col } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import { configSave, configPublish } from '@/http/hvisualization'
import lodash from 'lodash'
import { getWebsiteAddress } from '@/http/hvisualization'
import { useHistory } from "react-router-dom";
import GlobalContext from "@/views/layout/GlobalContext";


const Index = memo((props) => {
	let history = useHistory();

	const { userInfo } = useContext(GlobalContext)
	const { pageItem, sectionList, setShowPagesModal } = useContext(VisContext)
	const [address, setAddress] = useState({})

	useEffect(() => {
		websiteAddress()
	}, []);

	// 预览
	const preview = () => {
		window.open(address.index_pre)
	}

	// 发布
	const publish = async () => {
		await toReq('save', false)
		toReq('publish')
	}	

	const showPageModal = () => {
		setShowPagesModal({
			show: true
		})
	}

	const save = () => {
		toReq('save')
	}

	const back = () => {
		history.go(-1)
	}

	const websiteAddress = () => {
		const sendData = {}
		getWebsiteAddress(sendData).then((rep) => {
			if(rep.error_code === 0) {
				setAddress(rep.data)
			} else {
				message.error(rep.msg);
			}
		})
	}

	// 发起请求
	const toReq = (type, showSuccess = true) => {
		const sectionListTemp = lodash.cloneDeep(sectionList)
		sectionListTemp.forEach(item => {
			if(item.type === 'imgNews') { // 处理图文信息的提交数据
				item.data.imgs = {
					groupId: item.data.imgs.groupId
				}
				if(item.data.newsList) {
					delete item.data.newsList
				}
			}
		});
		const sendData = {
			id: pageItem.id
		}

		let reqFunc = configSave
		if(type === 'publish') {
			reqFunc = configPublish
			sendData.config_json = JSON.stringify({
				moduleList: sectionListTemp
			})
		} else {
			sendData.config_json_pre = JSON.stringify({
				moduleList: sectionListTemp
			})
		}
		return reqFunc(sendData).then((rep) => {
			if(rep.error_code === 0) {
				if(showSuccess) {
					message.success('操作成功');
				}
			} else {
				message.error(rep.msg);
			}
		})
	}

	const getPageData = () => {
		return {
			type: (pageItem && pageItem.type === 'popup')?'弹窗':'页面',
			name: pageItem && pageItem.name
		}
	}

	return (
		<div className="vis-wrap-header">
			<Row className='vis-wrap-header-inner'>
				<Col span={8} className='header-part'>
					<Button type="primary" 
						onClick={save}
						className='mar-l-32'>保存</Button>
					<Button type="primary" 
						onClick={publish}
						className='mar-l-10'>发布</Button>
					<Button
						onClick={preview}
						className='mar-l-30'>预览</Button>
				</Col>
				<Col span={8} className='header-part header-part-center'>
					<div>
						<span>
							当前{getPageData().type}：
						</span>
						<span>
							{getPageData().name}
						</span>
						<span onClick={showPageModal} className='mar-l-30 switch-page-btn'>
							切换
						</span>
					</div>
				</Col>
				<Col span={8} className='header-part header-part-right'>
					<div className='mar-r-32'>
						<Button
							type="primary" 
							onClick={back}
							className='mar-r-20 mar-t-4'>返回</Button>
						<span>{userInfo.name}</span>
					</div>
				</Col>
			</Row>
		</div>
	)
})

export default Index

