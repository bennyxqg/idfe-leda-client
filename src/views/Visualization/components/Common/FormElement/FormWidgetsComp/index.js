import React from "react";

// 控件
const Index = (props) => {
  if(props.type === 'input') {
    return (
      <input className='common-input' type='text' />
    )
  }
  if(props.type === 'radio') {
    return (
      <div className='radio-group'>
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
}

export default Index