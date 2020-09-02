import React, {useState, useEffect, useRef, useContext} from "react";
import { Button } from 'antd';
import VisContext from "./VisContext";
import { configSave } from '@/http/hvisualization'
import lodash from 'lodash'

const Index = (props) => {
	const { sectionList } = useContext(VisContext)

	// 发布
	const publish = () => {
		const sectionListTemp = lodash.cloneDeep(sectionList)
		sectionListTemp[0].data.imgs = {
			groupId: '3'
		}
		delete sectionListTemp[0].data.newsList
		console.log('------publish-----', sectionListTemp )
		const sendData = {
			'config_json': JSON.stringify({
				moduleList: sectionListTemp
			})
		}
		configSave(sendData).then((rep) => {

		})
	}

	return (
		<div className="vis-wrap-header">
			<Button type="primary" 
			onClick={publish}
			className='mar-r-10 mar-t-4' style={{'float': 'right'}}>发布</Button>
		</div>
	)
}

export default Index

