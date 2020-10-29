import React, {useState, useEffect, useRef} from "react";
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'
import classNames from 'classnames' 

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
    console.log('----props.data------', props.data)
		const tempData = props.data.data.style
		const result = {
		}
		result.position = 'relative'
		result.backgroundRepeat = 'no-repeat';
    result.backgroundPosition = 'center';
		result.height = tempData.height + 'px'
    result.width = tempData.width + 'px';
    result.borderRadius = tempData.borderRadius + 'px';
		if(tempData.bg) {
			if(tempData.bg.bgColor) {
				result.backgroundColor = tempData.bg.bgColor
			}
			if(tempData.bg.bgType == 2 && tempData.bg.bgImg) {
				result.backgroundImage = `url(${tempData.bg.bgImg})` 
				if(tempData.width && tempData.height) {
					result.backgroundSize = `${tempData.width}px ${tempData.height}px`
				}
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
                {
                  data.style.header && data.style.header.show && (
                    <div className='popup-box-header'>
                      <span>{data.style.header && data.style.header.title}</span>
                      <img className="icon-close" src={data.style.closeBtn.imgUrl} alt="" />
                    </div>
                  )
                }
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