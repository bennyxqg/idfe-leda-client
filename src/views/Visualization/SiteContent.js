import React, {useState, useEffect, useRef, useCallback, useContext} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import lodash from 'lodash'
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import update from 'immutability-helper';
import VisContext from "./VisContext";
import DragableSection from './components/DragableSection'
import ElementComp from './components/Element'
import CurrentModal from './components/CurrentModal'
import RNDContext from '@/views/Visualization/RNDContext'

const Index = (props) => {
	const { chooseSection, setChooseSection, sectionList, setSectionList } = useContext(VisContext)
	const [isShowModal, setIsShowModal] = useState(false)
	const [modalType, setModalType] = useState('')
	const [modalSection, setModalSection] = useState(null)

	useEffect(() => {
    console.log('-----content------', )
	}, []);
	
	useEffect(() => {
		// 新模块加入队列中
		if(props.newSection) {
			console.log('----props.newSection-----', props.newSection)
			setSectionList([...sectionList, lodash.cloneDeep(props.newSection)])
		}
	}, [props.newSection]);

	useEffect(() => {
		// 选中模块配置发生变化，更新模块数据
		console.log('------chooseSection---change----')
		if(chooseSection) {
			const index = sectionIndex(chooseSection)
			console.log('------chooseSection---change-index---', index)
			setSectionList(update(sectionList, {
				$splice: [[index, 1], [index, 0, chooseSection]]
			}))
		}
		
	}, [chooseSection]);

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

	const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
			const dragRow = sectionList[dragIndex];
			setSectionList(
        update(sectionList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [sectionList],
	);
	
	// 显示操作弹窗
	const showModal = (type, section) => {
		setIsShowModal(true)
		setModalType(type)
		setModalSection(section)
	}

	const modalChange = (flag) => {
		setIsShowModal(false)
	}

	const manager = useRef(RNDContext);

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
									moveRow={moveRow}
									activeSection={activeSection}
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