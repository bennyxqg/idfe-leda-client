export const sectionData = () => {
  return {
    'WhiteSection': {
      type: 'WhiteSection',
      label: '空白版块',
      data: {
        text: '空白版块'
      }
    },
    'ImgNews': {
      type: 'ImgNews',
      label: '图文信息',
      data: {
        imgs: {
          groupId: 3
        },
        style: { // 样式
          bg: { // 背景
            type: 1,
            color: '#ffffff',
            imgSrc: 'http://www.baidu.com',
            videoSrc: 'http://www.baidu2.com'
          },
          news: { // 新闻
            nav: {
              fontColor: '#666',
              fontSize: 18,
              isBold: false
            },
            list: {
              fontColor: '#666',
              fontSize: 12,
              isBold: false,
              lineHeight: 47,
              letterSpacing: 0
            }
          },
          carousel: {
            nav: {
              type: '1', // 1: 横线，2: 点
              color: '#ffffff',
            },
            autoPlay: true, // 是否自动轮播
            delay: 3000 // 轮播时间间隔
          }
        }
      }
    }
  }
}