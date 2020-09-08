import React, {useState, useEffect, useRef, useContext} from "react";

const Index = (props) => {
  const [data, setData] = useState(null)
  const [fontStyle, setFontStyle] = useState(null)

  useEffect(() => {
    setData(props.data.data)
    if(props.data.data.style.font) {
      const fontObj = props.data.data.style.font
      setFontStyle({
        fontSize: fontObj.fontSize + 'px',
        color: fontObj.fontColor,
        fontWeight: fontObj.isBlod? 'bold': 'normal'
      })
    }
  }, [props]);


  
  return (
    <>
      {
        data && 
          <div style={Object.assign({
            position: 'relative',
            display: 'inline-block',
            width: `${data.style.width}px`,
            height: `${data.style.height || 40}px`,
          }, fontStyle?fontStyle: {})}
          >
            <div>{data.text}</div>
          </div>
      }
    </>
  )
}

export default Index