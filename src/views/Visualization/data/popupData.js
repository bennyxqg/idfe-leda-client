import {
  bgData
} from './utils'

export const popupData = () => {
  return {
    'subscribePopup': {
      type: 'subscribePopup', identifer: "yuyue", label: '预约弹窗', data: {
        // submitUrl: '',
        // platForm: ['android', 'ios'],
        style: {
          width: 614,
          height: 472,
          borderRadius: 10,
          header: {
            show: false,
            title: ''
          },
          closeBtn: {
            imgUrl: '',
          },
          ...bgData()
        }
      }
    },
    'applyPopup': {
      type: 'applyPopup', identifer: "application", label: '申请弹窗', data: {
        // submitUrl: '',
        style: {
          width: 560,
          height: 551,
          borderRadius: 0,
          header: {
            show: true,
            title: '申请试用'
          },
          closeBtn: {
            imgUrl: 'http://dl.gamdream.com//website/image/202009/5f70289cad106.png',
          },
          ...bgData()
        }
      }
    },
  }
}

