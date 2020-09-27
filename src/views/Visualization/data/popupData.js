import {
  bgData
} from './utils'

export const popupData = () => {
  return {
    'subscribePopup': {type: 'subscribePopup', identifer: "yuyue", label: '预约弹窗', data: {
      submitUrl: '',
      platForm: ['android', 'ios'],
      submitBtn: {
        imgUrl: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-26/20191226_141845_539620.png',
        align: 'center',
        width: '',
        height: '',
      },
      successPopup: {
        show: true,
        imgUrl: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-26/20191226_141900_325042.png',
      },
      style: {
        width: 614,
        height: 472,
        borderRadius: 10,
        ...bgData()
      }
    }}, 
    'applyPopup': {type: 'applyPopup', identifer: "apply", label: '申请弹窗', data: {
      submitUrl: '',
      style: {
        width: 560,
        height: 551,
        borderRadius: 0,
        submitBtn: {
          imgUrl: 'http://dl.gamdream.com//website/image/202009/5f70337258d17.png',
          align: 'center',
          width: '',
          height: '',
        },
        closeBtn: {
          imgUrl: 'http://dl.gamdream.com//website/image/202009/5f70289cad106.png',
        },
        successPopup: {
          show: true,
          imgUrl: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-26/20191226_141900_325042.png',
        },
        ...bgData()
      }
    }}, 
  }
} 

