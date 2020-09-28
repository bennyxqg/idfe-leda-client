export const bgData = () => {
  return {
    bg: {
      disabled: false,
      bgType: 1,
      bgColor: '#ffffff',
      bgImg: '//dl.gamdream.com//website/image/202009/5f4f7f8168692.png',
      bgVideo: ''
    }
  }
}

export const swiperData = () => {
  return {
    swiper: {
      nav: {
        show: true,
        type: '1', // 1: 横线，2: 点
        color: '#ffffff',
      },
      autoPlay: true, // 是否自动轮播
      delay: 3000, // 轮播时间间隔
      navBtn: { // 前后按钮
        show: true,
        nextBg: '', // 前进按钮图片
        prevBg: '' // 后退按钮图片
      }
    }
  }
}

export const eventData = () => {
  return {
    event: { // 交互事件
      enabled: false,
      type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗 5：视频
      linkUrl: '', // 外链
      sitePage: null, // 内页
      sectionId: '', // 锚点
      popupId: '', // 弹窗
      linkUrlType: 1, // 1：本窗口打开， 2：新窗口打开
      videoUrl: '' // 视频地址
    }
  }
}