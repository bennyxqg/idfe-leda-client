import React from "react";

// 控件
const Index = (props) => {
  if(props.type === 'input') { // 单行文本框
    return (
      <input className='common-input widget-item' type='text' placeholder={props.placeholder} />
    )
  }
  if(props.type === 'textarea') { // 多行文本框
    return (
      <textarea className='common-textarea widget-item' rows='3' placeholder={props.placeholder} />
    )
  }
  if(props.type === 'radio') { // 单选框
    return (
      <div className='radio-group widget-item'>
        {
          props.items.map((item, index) => {
            return (
              <div key={index} className='radio-group-item'>
                <input name={props.name} type="radio" value={item.value} defaultChecked={item.checked} />
                <span>{item.label}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
  if(props.type === 'checkbox') { // 多选框
    return (
      <div className='checkbox-group widget-item'>
        {
          props.items.map((item, index) => {
            return (
              <div key={index} className='checkbox-group-item'>
                <input name={props.name} type="checkbox" value={item.value} defaultChecked={item.checked} />
                <span>{item.label}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
  if(props.type === 'select') { // 下拉框
    return (
      <div className='select-wrap'>
        <select className='widget-item'>
        {
          props.items.map((item, index) => {
            return (
              <option key={index} value={item.value} className='select-item'>
                {item.label}
              </option>
            )
          })
        }
        </select>
      </div>
    )
  }
}

export default Index