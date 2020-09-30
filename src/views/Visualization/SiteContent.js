import React, {useState, useEffect, useContext} from "react";
import { randomCode } from '@/utils/helper'
import {cloneDeep} from 'lodash'
import update from 'immutability-helper';
import VisContext from "@/views/Visualization/context/VisContext";
import DragableSection from './components/DragableSection'
import CurrentModal from './components/CurrentModal'
import {popupData} from '@/views/Visualization/data/popupData'

const Index = (props) => {
	const { pageItem, chooseSection, setChooseSection, sectionList, setSectionList } = useContext(VisContext)
	const [isShowModal, setIsShowModal] = useState(false)
	const [modalType, setModalType] = useState('')
	const [modalSection, setModalSection] = useState(null)

	useEffect(() => {
		getPopupData()
    console.log('-----content------', )
	}, []);
	
	useEffect(() => {
		// 新模块加入队列中
		if(props.newSection) {
			setSectionList([...sectionList, cloneDeep(props.newSection)])
		}
	}, [props.newSection]);

	useEffect(() => {
		// 选中模块配置发生变化，更新模块数据
		if(chooseSection) {
			const index = sectionIndex(chooseSection)
			setSectionList(update(sectionList, {
				$splice: [[index, 1], [index, 0, chooseSection]]
			}))
		}
	}, [chooseSection]);

	// 获取弹窗初始数据
	const getPopupData = () => {
		if(sectionList.length) {
			return
		}
		if(pageItem.type === 'popup') {
			const popupList = popupData()
			Object.keys(popupList).some((key) => {
				if(popupList[key].identifer === pageItem.identifer) {
					const popupItem = cloneDeep(popupList[key])
					popupItem.sectionId = 'section_' + randomCode(10)
					setSectionList([popupItem])
					return true
				}
				return false
			})
		}
	}

	const sectionIndex = (section) => {
		let index = -1
		sectionList.some((item, idx) => {
			if(item.sectionId == section.sectionId) {
				index = idx
				return true
			}
			return false
		})
		return index
	}

	const activeSection = (section, index) =>{
		// 显示模块配置菜单
		setChooseSection(section)
	}
	
	// 显示操作弹窗
	const showModal = (type, section) => {
		setIsShowModal(true)
		setModalType(type)
		setModalSection(section)
	}

	const modalChange = (flag) => {
		setIsShowModal(false)
	}


	// const dropWrapper = React.useRef();
	// const [{ isOver }, drop] = useDrop({
  //   accept: 'DragableElement',
  //   collect: monitor => {
  //     const { index: dragIndex } = monitor.getItem() || {};
  //     console.log('--DragableElement--dragIndex----', dragIndex)
  //     return {
  //       isOver: monitor.isOver(),
  //     };
  //   },
  //   drop: (item, monitor) => {
	// 		const delta = monitor.getDifferenceFromInitialOffset()
  //     const left = Math.round(item.left + delta.x)
  //     const top = Math.round(item.top + delta.y)
	// 		console.log('---drop---item----', item, item.index, left, top, delta)
	// 		item.dropCB(item.index, left, top)
  //   },
	// });
	// drop(dropWrapper);

	return (
		<div>
			<div 
				// ref={dropWrapper} 
				className="vis-wrap-siteContent">
				<div >
					{
						sectionList.map((section, index) => {
							return (
								<DragableSection
									key={index}
									section={section}
									index={index}
									showModal={showModal}
								></DragableSection>
							)
						})
					}
				</div>
				{/* <div>
					<ElementComp />
				</div> */}
					{isShowModal &&
						<CurrentModal 
							type={modalType}
							section={modalSection}
							modalChange={modalChange}
						/>
					}
			</div>
		</div>
	)
}

export default Index