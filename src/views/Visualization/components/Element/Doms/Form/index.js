import React, {useState, useEffect, useRef, useContext} from "react";
import errorImg from '@/assets/images/error-img.jpg'
import FormItemList from '@/views/Visualization/components/Common/FormElement/FormItemList/index.js'

const Index = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('----props.data.data-----', props.data.data)
		setData(props.data.data)
  }, [props]);

  const handleErrorImg = (e) => {
    console.log('-----e-----', e.target.src = errorImg)
  }

  return (
    <>
      {
        data && 
          <div style={{
            position: 'relative',
            display: 'inline-block',
            // transform: 'translate(-50%,-50%)'
            width: data.style.width?data.style.width + 'px': 'auto',
            height: data.style.height?data.style.height + 'px': 'auto',
          }}>
            <div className='el-form-wrap-outer'>
              {/* <div>
                <ul>
                  {
                    data.itemConfig.map((formItem, index) => {
                      return (
                        <li key={index}>
                          <div className='el-form-item'>
                            <div className='el-form-item-label'>
                              <span className='text'>{formItem.label}</span>
                              <span className='must'>*</span>
                            </div>
                            <div className='el-form-item-widget'>
                              {FormWidgetsComp(formItem)}
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div> */}
              <FormItemList 
                className='el-form-show-wrap'
                data={data.itemConfig}
              />
              {
                data.style.submitBtn && (
                  <div className='el-form-submit-btn'
                    style={{
                      textAlign: data.style.submitBtn.align
                    }}
                  >
                    <img 
                      style={{
                        width: data.style.submitBtn.width?data.style.submitBtn.width + 'px': 'auto',
                        height: data.style.submitBtn.height?data.style.submitBtn.height + 'px': 'auto',
                      }}
                      src={data.style.submitBtn.imgUrl} alt='' onError={handleErrorImg}/>
                  </div>
                )
              }
            </div>
          </div>
      }
    </>
  )
}

export default Index