import React, {useState, useEffect, useRef, useCallback, useContext} from "react";
import { Table, Button, Form, Select, Input, message, Modal } from 'antd';
import { formatTime } from '@/utils/helper'
import lodash from 'lodash'
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper';
import VisContext from "./VisContext";
import DragableSection from './components/DragableSection'

const RNDContext = createDndContext(HTML5Backend);

const Index = (props) => {
	const { chooseSection, setChooseSection, sectionList, setSectionList } = useContext(VisContext)

	useEffect(() => {
    console.log('-----content------', )
	}, []);


	
	useEffect(() => {
		console.log('-----props.newSection------', props.newSection)
		// 新模块加入队列中
		if(props.newSection) {
			setSectionList([...sectionList, lodash.cloneDeep(props.newSection)])
		}
	}, [props.newSection]);

	useEffect(() => {
		console.log('-----chooseSection--------', chooseSection)
		// 选中模块配置发生变化，更新模块数据
		if(chooseSection) {
			const index = sectionIndex(chooseSection)
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
		console.log('------activeSection------', section, index)	
		// 显示模块配置菜单
		setChooseSection(section)
	}

	const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
			console.log('----moveRow--------', dragIndex, hoverIndex)
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

	const manager = useRef(RNDContext);

	return (
		<DndProvider manager={manager.current.dragDropManager}>
			<div className="vis-wrap-siteContent">
				<div>
					{
						sectionList.map((section, index) => {
							return (
								<DragableSection
									key={section.sectionId}
									section={section}
									index={index}
									moveRow={moveRow}
									activeSection={activeSection}
								></DragableSection>
							)
						})
					}
				</div>
			</div>
		</DndProvider>
	)
}

export default Index