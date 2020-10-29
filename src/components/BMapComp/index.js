import React, {useState, useEffect, useRef, useContext, memo} from "react";
import { randomCode } from '@/utils/helper'


let iconJSON = { w: 21, h: 31, l: 0, t: 0, x: 6, lb: 5 }
const { BMap } = window

  //创建一个Icon
  const createIcon = (json, markerIconUrl) => {
    console.log('------props.markerIconUrl------', markerIconUrl)
    var icon = new BMap.Icon(markerIconUrl,
      new BMap.Size(json.w, json.h),
      {
        imageWidth: "100%",
        imageOffset: new BMap.Size(-json.l, -json.t),
        infoWindowOffset: new BMap.Size(json.lb + 5, 1),
        offset: new BMap.Size(json.x, json.h),
      }
    );
    return icon;
  }

const Index = memo((props) => {
  let id = `map_${randomCode(6)}`
  
  useEffect(() => {
    
    let map = new BMap.Map(id); // 创建Map实例
    let point = new BMap.Point(props.position.lng, props.position.lat);
    let markerOpts = {}
    if (props.markerIconUrl) {
      let iconImg = createIcon(iconJSON, props.markerIconUrl);
      markerOpts.icon = iconImg
    }
    let marker = new BMap.Marker(point, markerOpts);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(); //启用滚轮放大缩小
  }, []);

  return (
    <div className='map-bd'>
      <div id={id} style={{ width: props.style.width + 'px', height: props.style.height + 'px' }}></div>
    </div>
  )
})

export default Index