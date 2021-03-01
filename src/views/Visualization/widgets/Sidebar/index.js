import React, {useState, useEffect, useRef} from "react";
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'
import classNames from 'classnames' 
import {handleWidth} from '@/views/Visualization/utils' 


import './index.scss'

// const sectionName = 'applyPopup'

const Index = (props) => {
  const [data, setData] = useState(null)
  const [styleData, setStyleData] = useState({})
  const [sectionName, setSectionName] = useState('')

  useEffect(() => {
    setSectionName(props.data.type)
    setData(props.data.data)
    initStyleData()
  }, [props]);
  
  const initStyleData = () => {
		const tempData = props.data.data.style
		const result = {
		}
		result.position = 'relative'
		result.backgroundRepeat = 'no-repeat';
    result.backgroundPosition = 'center';
		result.height = handleWidth(tempData.height)
    result.width = handleWidth(tempData.width)
    result.borderRadius = handleWidth(tempData.borderRadius)
		if(tempData.bg && !tempData.bg.disabled) {
			if(tempData.bg.bgType == 1 && tempData.bg.bgColor) {
				result.backgroundColor = tempData.bg.bgColor
			}
			if(tempData.bg.bgType == 2 && tempData.bg.bgImg) {
				result.backgroundImage = `url(${tempData.bg.bgImg})` 
			}
			if(tempData.bg.bgType == 3 && tempData.bg.bgVideo) {
				result.backgroundImage = `url(${tempData.bg.bgVideo})` 
			}
		}
		setStyleData(result)
	}

  return (
    <div className={`${sectionName}-wrap`}>
      <div>
        {
					data && (<div className={`${sectionName}-wrap-inner`}>
              <div className={`${sectionName}-wrap-item popup-wrap-item ${sectionName}-wrap-inner-${props.data.sectionId}`}
                style={styleData}
                >
              <div 
                // 以中心点为参照
                className='center-dot'
              >
                {
                  // 元素组件
                  data.elements && <ElementDoms 
                    list={data.elements}
                    section={props.data}
                  />
                }
              </div>
          </div>
          </div>
					)
				}
      </div>
    </div>
  )
}

export default Index