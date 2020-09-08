import { randomCode, addOrEditForListItem } from '@/utils/helper'

export const elementData = () => {
  return {
    'imageElement': {type: 'imageElement', label: '图片元素', data: {
      imgUrl: '//dl.gamdream.com//website/image/202009/5f4f8069c244b.png',
      style: {
        width: '',
        height: '',
        top: 0,
        left: 0,
      },
      event: { // 交互事件
        type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
        linkUrl: '', // 外链
        sitePageId: '', // 内页
        sectionId: '', // 锚点
        popupId: '', // 弹窗
        linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
      }
    }}, 
    'textElement': {type: 'textElement', label: '文字元素', data: {
      text: '请修改文字',
      style: {
        width: 200,
        height: '',
        top: 0,
        left: 0,
        font: {
          fontSize: 14,
          fontColor: '#000000',
          isBlod: false
        }
      }
    }}, 
  }
} 

