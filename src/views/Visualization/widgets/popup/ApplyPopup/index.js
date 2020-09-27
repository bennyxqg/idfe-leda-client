import React, {useState, useEffect, useRef} from "react";
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'
import classNames from 'classnames' 

import './index.scss'

const sectionName = 'applyPopup'

const Index = (props) => {
  const [data, setData] = useState(null)
  const [styleData, setStyleData] = useState({})

  useEffect(() => {
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
              <div className='popup-box-header'>
                <span>申请试用</span>
                <img className="icon-close" src={data.style.closeBtn.imgUrl} alt="" />
              </div>
            
              <div className='popup-box-content'>
                  <div className="form-item">
                      <div className="label">
                          <span className="text">姓名</span>
                          <span className="must">*</span></div>
                          <div className="form-item-input">
                          <input name="name" placeholder="请输入您的姓名" type="text" />
                          <div className="err-tips" ></div>
                      </div>
                  </div>
                  <div className="form-item">
                      <div className="label">
                          <span>称谓</span>
                          <span className="must">*</span>
                      </div>
                      <div className="radio-group">
                          <div className="radio-group-item">
                              <input name="sex" type="radio" value="male" checked readOnly/><span>先生</span>
                          </div>
                          <div className="radio-group-item">
                              <input name="sex" type="radio" value="female" readOnly/><span>女士</span>
                          </div>
                      </div>
                  </div>
                  <div className="form-item">
                      <div className="label">
                          <span className="text">联系电话</span>
                          <span className="must">*</span>
                      </div>
                      <div className="form-item-input">
                          <input name="phone" placeholder="请留下您的联系电话" type="text" />
                          <div className="err-tips" ></div>
                      </div>

                  </div>
                  <div className="form-item">
                      <div className="label">
                          <span className="text">邮箱</span>
                          <span className="must">*</span></div>
                      <div className="form-item-input">
                          <input name="email" placeholder="请留下您的邮箱" type="text" />
                          <div className="err-tips" ></div>
                      </div>
                  </div>
                  <div className="form-item">
                      <div className="label">
                          <span className="text">企业名称</span>
                          <span className="must">*</span></div>
                      <div className="form-item-input">
                          <input name="company" placeholder="请留下您的团队或公司名称" type="text" />
                          <div className="err-tips"></div>
                      </div>
                  </div>
                  <div className='submit-button' >
                      <img src={data.style.submitBtn.imgUrl} alt='' />
                  </div>
              </div>
              </div>
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
					)
				}
      </div>
    </div>
    
  )
}

export default Index