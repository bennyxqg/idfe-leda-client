import React, {useState, useEffect, useRef, useContext} from "react";
import { Button, message } from 'antd';
import VisContext from "./VisContext";
import { configSave, configPublish } from '@/http/hvisualization'
import lodash from 'lodash'
import { getWebsiteAddress } from '@/http/hvisualization'

const Index = (props) => {
	const { sectionList } = useContext(VisContext)
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

	const save = () => {
		toReq('save')
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
			if(item.type === 'ImgNews') { // 处理图文信息的提交数据
				item.data.imgs = {
					groupId: item.data.imgs.groupId
				}
				if(item.data.newsList) {
					delete item.data.newsList
				}
			}
		});
		const sendData = {}

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

	return (
		<div className="vis-wrap-header">
			<Button type="primary" 
				onClick={save}
				className='mar-r-10 mar-t-4' style={{'float': 'right'}}>保存</Button>
			<Button type="primary" 
				onClick={publish}
				className='mar-r-10 mar-t-4' style={{'float': 'right'}}>发布</Button>
			<Button type="primary" 
				onClick={preview}
				className='mar-r-10 mar-t-4' style={{'float': 'right'}}>预览</Button>
		</div>
	)
}

export default Index

