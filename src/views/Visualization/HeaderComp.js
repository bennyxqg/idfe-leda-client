import React, {useState, useEffect, useContext, memo} from "react";
import { Button, message, Row, Col } from 'antd';
import VisContext from "@/views/Visualization/context/VisContext";
import { configSave, configPublish, getWebsiteAddress } from '@/http/hvisualization'
import {cloneDeep, merge} from 'lodash'
import { useHistory } from "react-router-dom";
import GlobalContext from "@/views/layout/GlobalContext";
import { sectionData } from "@/views/Visualization/data/sectionData";
import { popupData } from "@/views/Visualization/data/popupData";
import GuidePageModal from "@/views/Visualization/components/Common/GuidePageModal/index";

const Index = memo((props) => {
	let history = useHistory();

	const { userInfo } = useContext(GlobalContext)
	const { pageItem, sectionList, setSectionList, setShowPagesModal } = useContext(VisContext)
	const [address, setAddress] = useState({})
	const [updateBtn, setUpdateBtn] = useState(false)
	const [showGuildPage, setShowGuildPage] = useState(false)

	useEffect(() => {
		websiteAddress()
	}, []);

	// 预览
	const preview = () => {
		let addressStr = ''
		// if(pageItem.identifer === 'index') {
		// 	addressStr = '/' + pageItem.identifer
		// } else {
		// 	addressStr = '/' + pageItem.identifer
		// }
		addressStr = '/' + pageItem.identifer
		if(pageItem.type === 'popup') {
			addressStr = '/index'
		}
		addressStr = '/preview/pages' + addressStr
		if(pageItem.type === 'wap') {
			addressStr = '/wap' + addressStr
		}
		addressStr = address.index + addressStr
		window.open(addressStr)
	}

	// 发布
	const publish = async () => {
		await toReq('save', false)
		toReq('publish')
	}	

	// 显示普通页面列表
	const showPageModal = () => {
		setShowPagesModal({
			show: true
		})
	}

	// 显示落地页列表
	const handleGuidePage = () => {
		setShowGuildPage(true)
	}

	const save = () => {
		toReq('save')
	}

	const back = () => {
		// history.go(-1)
		history.push('/template')
	}

	const showUpdateBtn = () => {
		if(userInfo.name === 'admin') {
			setUpdateBtn(!updateBtn)
		}
	}

	// 更新数据（后期属性增加的情况下使用）
	const updateData = () => {
		const listTemp = []
		sectionList.forEach((item) => {
			let itemTemp = null
			if(item.type.indexOf('Popup') !== -1) { // 弹窗
				itemTemp = popupData()[item.type]
			} else {
				itemTemp = sectionData()[item.type]
			}
			if(itemTemp) {
				if(itemTemp.examples) {
					delete itemTemp.examples
				}
				itemTemp = merge(itemTemp, item)
				listTemp.push(itemTemp)
				setSectionList(listTemp)
			}
		})
		message.success('更新成功');
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
		const sectionListTemp = cloneDeep(sectionList)
		sectionListTemp.forEach(item => {
			if(item.type === 'imgNews') { // 处理图文信息的提交数据
				item.data.imgs = {
					groupId: item.data.imgs.groupId
				}
				if(item.data.newsList) {
					delete item.data.newsList
				}
			}
			if(item.type === 'carouselSection') { // 处理轮播的提交数据
				if(item.data.imgs && item.data.imgs.list) {
					delete item.data.imgs.list
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

	const guideModalChange = () => {
		setShowGuildPage(false)
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
							<span onClick={showUpdateBtn}>当前</span>{getPageData().type}：
						</span>
						<span>
							{getPageData().name}
						</span>
						<span onClick={showPageModal} className='mar-l-30 switch-page-btn'>
							切换
						</span>
						{
							updateBtn && <span onClick={updateData} className='mar-l-30 switch-page-btn'>
								更新数据
							</span>
						}
					</div>
				</Col>
				<Col span={8} className='header-part header-part-right'>
					<div className='mar-r-32'>
						{/* <Button
							type="primary" 
							onClick={handleGuidePage}
							className='mar-r-40 mar-t-4'>管理落地页</Button> */}
						<Button
							type="primary" 
							onClick={back}
							className='mar-r-20 mar-t-4'>返回</Button>
						<span>{userInfo.name}</span>
					</div>
				</Col>
			</Row>
			{
				showGuildPage && (
					<GuidePageModal 
						modalChange={guideModalChange}
					/>
				)
			}
		</div>
	)
})

export default Index

