import { randomCode, addOrEditForListItem } from '@/utils/helper'
import { eventData } from './utils'

export const elementData = () => {
  return {
    'imageElement': {type: 'imageElement', label: '图片', data: {
      zIndex: 1,
      imgUrl: 'http://dl.gamdream.com//website/image/202009/5f61c714103a4.png',
      style: {
        width: '',
        height: '',
        top: 10,
        left: 30,
        align: 'left'
      },
      ...eventData()
    }}, 
    'textElement': {type: 'textElement', label: '文字', data: {
      text: '请修改文字',
      zIndex: 1,
      style: {
        width: 200,
        height: '',
        top: 10,
        left: 30,
        align: 'left',
        font: {
          fontSize: 14,
          fontColor: '#000000',
          isBold: false,
          lineHeight: '',
          letterSpacing: '' // normal / length
        }
      }
    }}, 
    'bMapElement': {type: 'bMapElement', label: '百度地图', data: {
      zIndex: 1,
      markerIconUrl: '', // 定位标识图片
      position: {
        lng: 116.402544, // 精度
        lat: 39.928216 // 纬度
      }, // 经纬度
      disableDragging: false,
      disableZoom: false,
      style: {
        width: 400,
        height: 300,
        top: 10,
        left: 30,
      }
    }}
  }
} 

