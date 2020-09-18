import React, {useState, useEffect, useRef} from "react";
import ElementDoms from '@/views/Visualization/components/Element/Doms/index'
import classNames from 'classnames' 

import './index.scss'

const sectionName = 'subscribePopup'

const Index = (props) => {
  const [data, setData] = useState(null)
  const [styleData, setStyleData] = useState({})

  useEffect(() => {
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
					data && (
            <div className={`${sectionName}-wrap-inner `} 
							>
							<div className={`${sectionName}-wrap-item popup-wrap-item ${sectionName}-wrap-inner-${props.data.sectionId}`}
                style={styleData}
                >
                <div>
                  <div className={`${sectionName}-phone-select`}>
                      {
                        data.platForm.map((item, index) => {
                          return (
                            <div 
                              key={item}
                              className={classNames({
                                [`${sectionName}-${item}-select`]: true,
                                [`${sectionName}-phone-select-item`]: true,
                                active: index === 0
                              })}
                            >
                              <span>{item}</span>
                            </div>
                          )
                        })
                      }
                      {/* <div className={`${sectionName}-andriod-select ${sectionName}-phone-select-item active`}>
                        <span>Android</span>
                      </div>
                      <div className={`${sectionName}-ios-select ${sectionName}-phone-select-item`}>
                        <span>iOS</span>
                      </div> */}
                  </div>
                  <div className={`${sectionName}-phone-input`}>
                      <input className="input-text" placeholder="请输入手机号码" />
                  </div>
                  <div className={`${sectionName}-code-input`}>
                      <input className="input-text" placeholder="请输入验证码" />
                      <div className="get-code-button">获取验证码</div>
                  </div>
                  <div className={`${sectionName}-submit-button`}>
                    <img src={data.submitBtn.imgUrl} alt='' />
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
						</div>
					)
				}
      </div>
    </div>
    
  )
}

export default Index