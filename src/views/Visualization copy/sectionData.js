export const sectionData = () => {
  return {
    'WhiteSection': {type: 'WhiteSection', label: '空白版块', data: {
      text: '空白版块'
    }}, 
    'ImgNews': {
      type: 'ImgNews', label: '图文信息', data: {
      imgs: [
        {
          url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-27/20191227_161637_544804.png',
          name: '测试图片',
          jump_url: 'http://www.baidu.com',
          desc: ''
        },
        {
          url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-27/20191227_161637_544804.png',
          name: '测试图片2',
          jump_url: 'http://www.baidu.com',
          desc: ''
        }
      ],
      newsList: {
        groups: [
          {
            title: '最新',
            state: 1,
            list: [
              {
                id: '1102',
                title: '通关干货 奇招获奇效',
                link: 'http://www.baidu.com',
                time: '12-30'
              },
              {
                id: '1132',
                title: '冷兵器时代的产物，《弓箭手大冒险》春节将至？',
                link: 'http://www.baidu.com',
                time: '12-30'
              },{
                id: '588',
                title: '干货在手 通关轻巧',
                link: 'http://www.baidu.com',
                time: '12-30'
              },{
                id: '352',
                title: '一款让你释放日常压力的弓箭游戏',
                link: 'http://www.baidu.com',
                time: '12-30'
              },{
                id: '156',
                title: '黑暗侵袭，《弓箭手大冒险》全军作战！',
                link: 'http://www.baidu.com',
                time: '12-30'
              }
            ]
          },
          {
            title: '新闻',
            state: 1,
            list: [
              {
                id: '156',
                title: '测试2',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }
            ]
          },
          {
            title: '攻略',
            state: 1,
            list: [
              {
                id: '156',
                title: '测试3',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }
            ]
          },
          {
            title: '活动',
            state: 1,
            list: [
              {
                id: '352',
                title: '测试4',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }
            ]
          }
        ]
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
    }}
  }
} 

