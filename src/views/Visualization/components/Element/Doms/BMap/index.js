import React, {useState, useEffect, useRef, useContext} from "react";
// import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import BMapComp from '@/components/BMapComp/index'

const Index = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
		setData(props.data.data)
  }, [props]);

  // 百度地图拾取坐标系统
  // http://api.map.baidu.com/lbsapi/getpoint/index.html
  return (
    <>
      {
        data && 
          <div style={{
            position: 'relative',
            display: 'inline-block',
            // transform: 'translate(-50%,-50%)'
          }}>
            <div>
              <BMapComp 
                style={{
                  width: data.style.width,
                  height: data.style.height
                }}
                position={{
                  lng: data.position.lng,
                  lat: data.position.lat
                }}
                markerIconUrl={data.markerIconUrl}
              />
              {/* <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11">
                <Marker position={{lng: 116.402544, lat: 39.928216}} />
                <NavigationControl /> 
                <InfoWindow position={{lng: 116.402544, lat: 39.928216}} text="内容" title="标题"/>
              </Map> */}
            </div>
          </div>
      }
    </>
  )
}

export default Index