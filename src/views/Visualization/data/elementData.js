import { randomCode, addOrEditForListItem } from '@/utils/helper'
import { eventData } from './utils'

export const elementData = () => {
  return {
    'imageElement': {type: 'imageElement', label: '图片', data: {
      zIndex: 1,
      imgUrl: 'http://dl.gamdream.com//website/image/202009/5f7002c2d3032.png',
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
    }},
    'formElement': {type: 'formElement', label: '表单', data: {
      zIndex: 1,
      reqUrl: '', // 提交url
      isVerification: false, // 是否校验
      itemConfig: [
        {
          itemId: 'form-item-' + randomCode(),
          type: 'input', // 单行输入框
          label: '姓名',
          placeholder: '请输入您的姓名',
          name: 'name',
          isVerification: false, // 是否校验
          regex: '', // 正则
        },
        {
          itemId: 'form-item-' + randomCode(),
          type: 'radio',
          label: '称谓',
          name: 'sex',
          isVerification: false, // 是否校验
          regex: '', // 正则
          items: [
            {
              label: '先生',
              value: 'male',
              checked: true
            },
            {
              label: '女士',
              value: 'female'
            }
          ]
        }
      ],
      style: {
        submitBtn: {
          imgUrl: 'http://dl.gamdream.com//website/image/202009/5f70337258d17.png',
          align: 'center',
          width: '',
          height: '',
        },
        width: 400,
        height: 300,
        top: 10,
        left: 30,
      }
    }},
  }
} 

