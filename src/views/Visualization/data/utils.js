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

export const animationData = () => {
  return {
    animation: { // 动画信息
      type: 'none', // none: 无  scale: 缩放 slide: 滑动  shake: 摇晃 bounce: 跳动 flash:闪烁  fadeIn: 淡入
      duration: 1, // 持续
      delay: 0, // 延迟
      loop: false, // 循环
      direction: 'left', // 切入方向 slide
      // triggerType: 'scroll', // 触发类型 scroll：滚动  hover：悬停
    }
  }
}