export const sectionData = () => {
  return {
    'WhiteSection': {type: 'WhiteSection', label: '空白版块'}, 
    'ImgNews': {type: 'ImgNews', label: '图文信息', data: {
      imgs: [
        {
          url: 'http://dl.gamdream.com//website/image/202007/5f115ba23f900.png',
          title: '测试图片'
        },
        {
          url: 'http://dl.gamdream.com//website/image/202007/5f154429931f5.png',
          title: '测试图片2'
        }
      ],
      newsList: {
        groups: [
          {
            title: '资讯',
            list: [
              {
                title: '测试',
                link: 'http://www.baidu.com'
              }
            ]
          },
          {
            title: '新闻',
            list: [
              {
                title: '测试2',
                link: 'http://www.baidu.com'
              }
            ]
          }
        ]
      }
    }}
  }
} 

