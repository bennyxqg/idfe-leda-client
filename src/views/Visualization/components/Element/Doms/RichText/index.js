import React, {useState, useEffect, useRef, useContext} from "react";
import {cloneDeep} from 'lodash'

const Index = (props) => {
  const [data, setData] = useState(null)
  const [fontStyle, setFontStyle] = useState(null)

  useEffect(() => {
    const dataTemp = cloneDeep(props.data.data)
    dataTemp.text = dataTemp.text.replace(/\n/g, '<br/>')
    setData(dataTemp)
    if(props.data.data.style.font) {
      const fontObj = props.data.data.style.font
      setFontStyle({
        fontSize: fontObj.fontSize + 'px',
        color: fontObj.fontColor,
        fontWeight: fontObj.isBold? 'bold': 'normal',
        lineHeight: fontObj.lineHeight? fontObj.lineHeight+ 'px': 'normal',
        letterSpacing: fontObj.letterSpacing? fontObj.letterSpacing+ 'px': 'normal',
      })
    }
  }, [props]);

  return (
    <>
      {
        data && 
          <div style={Object.assign({
            textAlign: data.style.align || 'left',
            position: 'relative',
            display: 'inline-block',
            width: `${data.style.width}px`,
            height: data.style.height? data.style.height+ 'px': 'auto',
          }, fontStyle?fontStyle: {})}
          >
            <div dangerouslySetInnerHTML={{
              __html: data.text
            }}></div>
          </div>
      }
    </>
  )
}

export default Index