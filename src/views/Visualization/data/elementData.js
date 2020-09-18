import { randomCode, addOrEditForListItem } from '@/utils/helper'

export const elementData = () => {
  return {
    'imageElement': {type: 'imageElement', label: '图片元素', data: {
      zIndex: 1,
      imgUrl: 'http://dl.gamdream.com//website/image/202009/5f61c714103a4.png',
      style: {
        width: '',
        height: '',
        top: 0,
        left: 0,
        align: 'left'
      },
      event: { // 交互事件
        disable: false,
        type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
        linkUrl: '', // 外链
        sitePage: null, // 内页
        sectionId: '', // 锚点
        popupId: '', // 弹窗
        linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
      }
    }}, 
    'textElement': {type: 'textElement', label: '文字元素', data: {
      text: '请修改文字',
      zIndex: 1,
      style: {
        width: 200,
        height: '',
        top: 0,
        left: 0,
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
    'bMapElement': {type: 'bMapElement', label: '百度地图元素', data: {
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
        top: 0,
        left: 0,
      }
    }}
  }
} 

